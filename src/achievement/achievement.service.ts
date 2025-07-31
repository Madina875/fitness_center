import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAchievementDto: CreateAchievementDto) {
    return this.prismaService.achievement.create({
      data: createAchievementDto,
    });
  }

  findAll() {
    return this.prismaService.achievement.findMany();
  }

  findOne(id: number) {
    return this.prismaService.achievement.findUnique({ where: { id } });
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto) {
    const existing = await this.prismaService.achievement.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Car history with ID ${id} not found`);
    }

    return this.prismaService.achievement.update({
      where: { id },
      data: updateAchievementDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.achievement.delete({ where: { id } });
    return 'removed successfully!!!';
  }
}
