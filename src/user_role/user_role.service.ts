import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    return this.prismaService.userRole.create({
      data: createUserRoleDto,
    });
  }

  findAll() {
    return this.prismaService.userRole.findMany({
      include: { user: true, role: true },
    });
  }

  async findOne(id: number) {
    const role = await this.prismaService.userRole.findUnique({
      where: { id },
      include: { user: true, role: true },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const existing = await this.prismaService.userRole.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`user's role with ID ${id} not found`);
    }

    return this.prismaService.userRole.update({
      where: { id },
      data: updateUserRoleDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.userRole.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`user's role with ID ${id} not found`);
    }

    return this.prismaService.userRole.delete({
      where: { id },
    });
  }
}
