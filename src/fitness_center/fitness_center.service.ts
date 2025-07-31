import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFitnessCenterDto } from './dto/create-fitness_center.dto';
import { UpdateFitnessCenterDto } from './dto/update-fitness_center.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FitnessCenterService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createFitnessCenterDto: CreateFitnessCenterDto) {
    return this.prismaService.fitnessCenter.create({
      data: createFitnessCenterDto,
    });
  }

  findAll() {
    return this.prismaService.fitnessCenter.findMany();
  }

  findOne(id: number) {
    return this.prismaService.fitnessCenter.findUnique({ where: { id } });
  }

  async update(id: number, updateFitnessCenterDto: UpdateFitnessCenterDto) {
    const existing = await this.prismaService.fitnessCenter.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Center with ID ${id} not found`);
    }

    return this.prismaService.fitnessCenter.update({
      where: { id },
      data: updateFitnessCenterDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.fitnessCenter.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Fitness Center with ID ${id} not found`);
    }

    return this.prismaService.fitnessCenter.delete({
      where: { id },
    });
  }
}
