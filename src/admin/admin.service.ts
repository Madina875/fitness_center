import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { full_name, email, phone, password, confirm_password, is_owner } =
      createAdminDto;
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

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prismaService.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.admin.delete({ where: { id } });
    return 'removed successfully';
  }
}
