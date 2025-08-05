import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { full_name, email, phone, password, confirm_password } =
      createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException('parollar mos emas');
    }
    const hashedPassword = await bcrypt.hash(password!, 7);

    return this.prismaService.user.create({
      data: {
        full_name,
        email,
        phone,
        hashedPassword: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      include: {
        roles: { include: { role: true } },
        centers: { include: { center: true } },
        goals: true,
        payments: true,
        subscriptions: true,
        notifications: true,
        bookings: true,
        reviews: true,
        achievements: true,
        fitness_centers: true,
        scheduled_classes: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prismaService.user.delete({ where: { id } });
    return { message: 'User deleted successfully!' };
  }

  async forgetPassword(
    userId: number,
    res: Response,
    passworduserDto: PasswordUserDto,
  ) {
    const { password, confirm_password } = passworduserDto;

    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const oldPassword = user.hashedPassword;
    const hashedPassword = await bcrypt.hash(password, 7);

    await this.prismaService.user.update({
      where: { id: userId },
      data: { hashedPassword },
    });

    return res.status(200).json({
      message: 'Parol muvaffaqiyatli yangilandi',
      oldHashedPassword: oldPassword,
      newHashedPassword: hashedPassword,
    });
  }

  async resetPassword(
    userId: number,
    res: Response,
    dto: ResetPasswordUserDto,
  ) {
    const { email, current_password, new_password, confirm_password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('user not found');

    if (email !== user.email) {
      throw new BadRequestException('Current email is incorrect');
    }

    const isMatch = await bcrypt.compare(current_password, user.hashedPassword);
    if (!isMatch)
      throw new BadRequestException('Current password is incorrect');

    if (new_password !== confirm_password)
      throw new BadRequestException('New passwords do not match');

    const hashed = await bcrypt.hash(new_password, 7);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { hashedPassword: hashed },
    });

    return res.status(200).json({
      message: 'Password successfully changed',
      entered: {
        currentpassword: user.hashedPassword,
        newpassword: hashed,
      },
    });
  }
}
