import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFitnessCenterDto } from './dto/create-fitness_center.dto';
import { UpdateFitnessCenterDto } from './dto/update-fitness_center.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FitnessCenterService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(centerId: number) {
    return this.prismaService.equipment.findMany({
      where: {
        centerId: centerId,
      },
    });
  }
  async findByName(name: string) {
    return this.prismaService.fitnessCenter.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async getByIdImage(centerId: number) {
    return this.prismaService.image.findMany({
      where: {
        centerId: centerId,
      },
    });
  }

  create(createFitnessCenterDto: CreateFitnessCenterDto) {
    return this.prismaService.fitnessCenter.create({
      data: createFitnessCenterDto,
    });
  }

  findAll() {
    return this.prismaService.fitnessCenter.findMany({
      include: {
        users: { include: { user: true } },
        images: true,
        payments: true,
        subscriptions: true,
        equipment: true,
        schedules: true,
        achievements: true,
        reviews: true,
      },
    });
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
