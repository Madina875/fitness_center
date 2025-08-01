import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PasswordAdminDto } from './dto/password-admin.dto';
import { Response } from 'express';
import { ResetPasswordAdminDto } from './dto/reset-password-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { full_name, email, phone, password, confirm_password, is_owner } =
      createAdminDto;

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

    if (password !== confirm_password) {
      throw new BadRequestException('parollar mos emas');
    }

    const hashedPassword = await bcrypt.hash(password!, 7);

    return this.prismaService.admin.create({
      data: {
        full_name,
        email,
        phone,
        hashedPassword: hashedPassword,
        is_owner,
      },
    });
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  findOne(id: number) {
    return this.prismaService.admin.findUnique({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.prismaService.admin.findUnique({
      where: { id },
    });
    if (!existingAdmin) {
      throw new NotFoundException('id not found');
    }

    if (updateAdminDto.is_owner === true) {
      const otherOwner = await this.prismaService.admin.findFirst({
        where: {
          is_owner: true,
          NOT: { id }, //“Find records where the id is not equal to the given id.”
        },
      });

      if (otherOwner) {
        throw new BadRequestException(
          'Bitta egadan ortiq bo‘lishi mumkin emas',
        );
      }
    }

    const updated = await this.prismaService.admin.update({
      where: { id },
      data: updateAdminDto,
    });

    return {
      message: 'Admin updated successfully',
      data: updated,
    };
  }

  async remove(id: number) {
    const existingAdmin = await this.prismaService.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    await this.prismaService.admin.delete({ where: { id } });

    return {
      message: 'Admin removed successfully',
      deletedId: id,
    };
  }

  async forgetPassword(
    adminId: number,
    res: Response,
    passwordAdminDto: PasswordAdminDto,
  ) {
    const { password, confirm_password } = passwordAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const admin = await this.prismaService.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const oldPassword = admin.hashedPassword;
    const hashedPassword = await bcrypt.hash(password, 7);

    await this.prismaService.admin.update({
      where: { id: adminId },
      data: { hashedPassword },
    });

    return res.status(200).json({
      message: 'Parol muvaffaqiyatli yangilandi',
      oldHashedPassword: oldPassword,
      newHashedPassword: hashedPassword,
    });
  }

  async resetPassword(
    adminId: number,
    res: Response,
    dto: ResetPasswordAdminDto,
  ) {
    const { email, current_password, new_password, confirm_password } = dto;

    const admin = await this.prismaService.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) throw new NotFoundException('Admin not found');

    if (email !== admin.email) {
      throw new BadRequestException('Current email is incorrect');
    }

    const isMatch = await bcrypt.compare(
      current_password,
      admin.hashedPassword,
    );
    if (!isMatch)
      throw new BadRequestException('Current password is incorrect');

    if (new_password !== confirm_password)
      throw new BadRequestException('New passwords do not match');

    const hashed = await bcrypt.hash(new_password, 7);
    await this.prismaService.admin.update({
      where: { id: adminId },
      data: { hashedPassword: hashed },
    });

    return res.status(200).json({
      message: 'Password successfully changed',
      entered: {
        current_password,
        new_password,
      },
    });
  }
}
