import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createGoalDto: CreateGoalDto) {
    return this.prismaService.goal.create({
      data: createGoalDto,
    });
  }

  findAll() {
    return this.prismaService.goal.findMany({
      include: { user: true, logs: true, achievements: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.goal.findUnique({ where: { id } });
  }

  async update(id: number, updateGoalDto: UpdateGoalDto) {
    const existing = await this.prismaService.goal.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }

    return this.prismaService.goal.update({
      where: { id },
      data: updateGoalDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.goal.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }

    return this.prismaService.goal.delete({
      where: { id },
    });
  }
}
