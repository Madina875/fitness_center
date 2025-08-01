import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalProgressLogDto } from './dto/create-goal_progress_log.dto';
import { UpdateGoalProgressLogDto } from './dto/update-goal_progress_log.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalProgressLogService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createGoalProgressLogDto: CreateGoalProgressLogDto) {
    return this.prismaService.goalProgressLog.create({
      data: createGoalProgressLogDto,
    });
  }

  findAll() {
    return this.prismaService.goalProgressLog.findMany({
      include: { goal: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.goalProgressLog.findUnique({ where: { id } });
  }

  async update(id: number, updateGoalProgressLogDto: UpdateGoalProgressLogDto) {
    const existing = await this.prismaService.goalProgressLog.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }

    return this.prismaService.goalProgressLog.update({
      where: { id },
      data: updateGoalProgressLogDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.goalProgressLog.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }

    return this.prismaService.goalProgressLog.delete({
      where: { id },
    });
  }
}
