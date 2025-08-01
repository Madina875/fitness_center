import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAchievementDto: CreateAchievementDto) {
    return await this.prismaService.achievement.create({
      data: createAchievementDto,
    });
  }

  async findAll() {
    return await this.prismaService.achievement.findMany({
      include: { user: true, goal: true, center: true },
    });
  }

  async findOne(id: number) {
    const achievement = await this.prismaService.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }

    return achievement;
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto) {
    const existing = await this.prismaService.achievement.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }

    return await this.prismaService.achievement.update({
      where: { id },
      data: updateAchievementDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.achievement.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }

    await this.prismaService.achievement.delete({
      where: { id },
    });

    return { message: 'Achievement removed successfully!' };
  }
}
