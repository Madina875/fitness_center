import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Admin, User } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.serivce';
import {
  JwtPayload,
  JwtPayloadAdmin,
  ResponceFieldsAdmin,
  ResponceFieldsUser,
  Tokens,
} from '../common/types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInUserDto } from '../user/dto/sign-in-user.dto';
import { SignInAdminDto } from '../admin/dto/sign-in-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  private async generateTokens(user: User): Promise<Tokens> {
    const jwtConfigByRole = {
      user: {
        accessSecret: process.env.OWNER_ACCESS_TOKEN_KEY,
        accessExpire: process.env.OWNER_ACCESS_TOKEN_TIME,
        refreshSecret: process.env.OWNER_REFRESH_TOKEN_KEY,
        refreshExpire: process.env.OWNER_REFRESH_TOKEN_TIME,
      },
      instructor: {
        accessSecret: process.env.CLIENT_ACCESS_TOKEN_KEY,
        accessExpire: process.env.CLIENT_ACCESS_TOKEN_TIME,
        refreshSecret: process.env.CLIENT_REFRESH_TOKEN_KEY,
        refreshExpire: process.env.CLIENT_REFRESH_TOKEN_TIME,
      },
      manager: {
        accessSecret: process.env.WORKER_ACCESS_TOKEN_KEY,
        accessExpire: process.env.WORKER_ACCESS_TOKEN_TIME,
        refreshSecret: process.env.WORKER_REFRESH_TOKEN_KEY,
        refreshExpire: process.env.WORKER_REFRESH_TOKEN_TIME,
      },
    };
    const role = user.role!;
    const jwtConfig = jwtConfigByRole[role];

    if (!jwtConfig) {
      throw new Error(`JWT config not found for role: ${role}`);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConfig.accessSecret,
        expiresIn: jwtConfig.accessExpire,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConfig.refreshSecret,
        expiresIn: jwtConfig.refreshExpire,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateTokensAdmin(admin: Admin): Promise<Tokens> {
    const payload: JwtPayloadAdmin = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_owner: admin.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ADMIN_ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.ADMIN_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const { full_name, email, role, phone, password, confirm_password } =
      createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException('parollar mos emas');
    }
    const hashedPassword = await bcrypt.hash(password!, 7);

    const candidate = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (candidate) {
      throw new ConflictException('already exists');
    }

    const activation_link = uuidv4();

    const newUser = await this.prismaService.user.create({
      data: {
        full_name,
        email,
        role,
        phone,
        hashedPassword,
        activation_link: activation_link,
      },
    });

    const role_creating = await this.prismaService.role.create({
      data: { name: role },
    });
    console.log('role created.');
    const user_role = await this.prismaService.userRole.create({
      data: { userId: newUser.id, roleId: role_creating.id },
    });
    await this.prismaService.user.update({
      where: { id: newUser.id },
      data: { role: role_creating.name },
    });
    console.log(newUser);
    try {
      await this.mailService.sendUserActivationLink(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Email error occurred');
    }
    return {
      message: "Ro'yhatdan o'tdingiz. Email orqali akkauntni faollashtiring.",
      userId: newUser.id,
    };
  }

  async signupAdmin(createAdminDto: CreateAdminDto) {
    const { full_name, email, phone, password, is_owner, confirm_password } =
      createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException('parollar mos emas');
    }
    const hashedPassword = await bcrypt.hash(password!, 7);

    const candidate = await this.prismaService.admin.findUnique({
      where: { email },
    });

    if (candidate) {
      throw new ConflictException('already exists');
    }
    if (is_owner) {
      const ownerExists = await this.prismaService.admin.findFirst({
        where: { is_owner: true },
      });

      if (ownerExists) {
        throw new BadRequestException(
          "Bitta egadan ortiq bo'lishi mumkin emas",
        );
      }
    }

    const activation_link = uuidv4();

    const newAdmin = await this.prismaService.admin.create({
      data: {
        full_name,
        email,
        phone,
        hashedPassword,
        is_owner,
        activation_link: activation_link,
      },
    });

    try {
      await this.mailService.sendAdminActivationLink(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Email error occurred');
    }

    return {
      id: newAdmin.id,
      message: "Ro'yhatdan o'tdingiz. Email orqali akkauntni faollashtiring.",
    };
  }

  async signin(
    signInUserDto: SignInUserDto,
    res: Response,
  ): Promise<ResponceFieldsUser> {
    const { email, password } = signInUserDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('email or password incorrect');
    }

    const isValidpassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isValidpassword) {
      throw new NotFoundException('email or password incorrect');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: 'foydalanuvchi tizimga kirdi',
      userId: user.id,
      accessToken,
    };
  }

  async signinAdmin(
    signInAdminDto: SignInAdminDto,
    res: Response,
  ): Promise<ResponceFieldsAdmin> {
    const { email, password } = signInAdminDto;
    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new NotFoundException('email or password incorrect 1');
    }

    const isValidpassword = await bcrypt.compare(
      password!,
      admin!.hashedPassword,
    );

    if (!isValidpassword) {
      throw new NotFoundException('email or password incorrect');
    }

    console.log('admin.is_owner =', admin.is_owner);

    if (admin.is_owner === true) {
      const payload: JwtPayloadAdmin = {
        id: admin.id,
        email: admin.email,
        is_active: admin.is_active,
        is_owner: admin.is_owner,
      };

      console.log(payload);

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.SUPERADMIN_ACCESS_TOKEN_KEY,
          expiresIn: process.env.SUPERADMIN_ACCESS_TOKEN_TIME,
        }),

        this.jwtService.signAsync(payload, {
          secret: process.env.SUPERADMIN_REFRESH_TOKEN_KEY,
          expiresIn: process.env.SUPERADMIN_REFRESH_TOKEN_TIME,
        }),
      ]);

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
      await this.prismaService.admin.update({
        where: { id: admin!.id },
        data: { hashedRefreshToken },
      });
      res.cookie('refreshToken', refreshToken, {
        maxAge: +process.env.COOKIE_TIME!,
        httpOnly: true,
      });
      return {
        message: 'foydalanuvchi tizimga kirdi',
        adminId: admin.id,
        accessToken,
      };
    }
    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.admin.update({
      where: { id: admin!.id },
      data: { hashedRefreshToken },
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      message: 'foydalanuvchi tizimga kirdi',
      adminId: admin.id,
      accessToken,
    };
  }

  async activate(activationLink: string) {
    const user = await this.prismaService.user.findFirst({
      where: { activation_link: activationLink },
    });

    if (!user) throw new NotFoundException('Activation link invalid');

    if (user.is_active)
      throw new ConflictException('Account already activated');
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });

    return { message: 'Account activated!' };
  }

  async activateAdmin(activationLink: string) {
    const admin = await this.prismaService.admin.findFirst({
      where: { activation_link: activationLink },
    });

    if (!admin) throw new NotFoundException('Activation link invalid');

    if (admin.is_active)
      throw new ConflictException('Account already activated');
    await this.prismaService.admin.update({
      where: { id: admin.id },
      data: { is_active: true },
    });

    return { message: 'Account activated!' };
  }

  async signout(userId: number, res: Response) {
    const result = await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: { hashedRefreshToken: null },
    });

    if (result.count === 0) {
      throw new ForbiddenException('Access Denied');
    }

    res.clearCookie('refreshToken');
    return true;
  }

  async signoutAdmin(id: number, res: Response) {
    const result = await this.prismaService.admin.updateMany({
      where: {
        id: id,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: { hashedRefreshToken: null },
    });

    if (result.count === 0) {
      throw new ForbiddenException('Access Denied');
    }
    res.clearCookie('refreshToken');
    return 'signed out successfully!!!';
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<ResponceFieldsUser> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRefreshToken) {
      throw new NotFoundException('User or token not found');
    }

    try {
      const jwtConfigByRole = {
        user: process.env.OWNER_REFRESH_TOKEN_KEY,
        instructor: process.env.CLIENT_REFRESH_TOKEN_KEY,
        manager: process.env.WORKER_REFRESH_TOKEN_KEY,
      };

      const role = user.role!;
      const secret = jwtConfigByRole[role];

      if (!secret) {
        throw new BadRequestException(`JWT config not found for role: ${role}`);
      }

      const decoded = this.jwtService.verify(refreshToken, { secret });

      if (decoded.id !== userId) {
        throw new BadRequestException('Token does not belong to this user');
      }
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }

    const tokens: Tokens = await this.generateTokens(user);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken },
    });

    // Set new refresh token in cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: 'refreshed',
      userId: user.id,
      accessToken: tokens.accessToken,
    };
  }

  async updateRefreshTokenAdmin(
    req: Request,
    res: Response,
  ): Promise<ResponceFieldsAdmin> {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token is missing');
    }

    let decoded: any;
    try {
      decoded = this.jwtService.decode(refreshToken) as { id: number };
      if (!decoded?.id) {
        throw new BadRequestException('Invalid token payload');
      }
    } catch (err) {
      throw new BadRequestException('Cannot decode token');
    }

    const adminId = decoded.id;

    const admin = await this.prismaService.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin || !admin.hashedRefreshToken) {
      throw new NotFoundException('Admin or token not found');
    }

    const isMatch = await bcrypt.compare(
      refreshToken,
      admin.hashedRefreshToken,
    );
    if (!isMatch) {
      throw new ForbiddenException('Refresh token mismatch');
    }

    const secret = admin.is_owner
      ? process.env.SUPERADMIN_REFRESH_TOKEN_KEY
      : process.env.ADMIN_REFRESH_TOKEN_KEY;

    try {
      const verified = this.jwtService.verify(refreshToken, { secret });
      if (verified.id !== adminId) {
        throw new BadRequestException('Token does not belong to this admin');
      }
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }

    const tokens = await this.generateTokensAdmin(admin);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    await this.prismaService.admin.update({
      where: { id: admin.id },
      data: { hashedRefreshToken },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: 'refreshed',
      adminId: admin.id,
      accessToken: tokens.accessToken,
    };
  }
}
