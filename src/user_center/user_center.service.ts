import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserCenterDto } from './dto/create-user_center.dto';
import { UpdateUserCenterDto } from './dto/update-user_center.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserCenterService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserCenterDto: CreateUserCenterDto) {
    return this.prismaService.userCenter.create({
      data: createUserCenterDto,
    });
  }

  findAll() {
    return this.prismaService.userCenter.findMany({
      include: { user: true, center: true },
    });
  }

  async findOne(id: number) {
    const user_center = await this.prismaService.userCenter.findUnique({
      where: { id },
      include: { user: true, center: true },
    });

    if (!user_center) {
      throw new NotFoundException(`Car history with ID ${id} not found`);
    }

    return user_center;
  }

  async update(id: number, updateUserCenterDto: UpdateUserCenterDto) {
    const existing = await this.prismaService.userCenter.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`user center with ID ${id} not found`);
    }

    return this.prismaService.userCenter.update({
      where: { id },
      data: updateUserCenterDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.userCenter.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`user center with ID ${id} not found`);
    }

    return this.prismaService.userCenter.delete({
      where: { id },
    });
  }
}
