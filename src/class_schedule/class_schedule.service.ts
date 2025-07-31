import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassScheduleDto } from './dto/create-class_schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class_schedule.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createClassScheduleDto: CreateClassScheduleDto) {
    return this.prismaService.classSchedule.create({
      data: createClassScheduleDto,
    });
  }

  findAll() {
    return this.prismaService.classSchedule.findMany();
  }

  findOne(id: number) {
    return this.prismaService.classSchedule.findUnique({ where: { id } });
  }

  async update(id: number, updateClassScheduleDto: UpdateClassScheduleDto) {
    const existing = await this.prismaService.classSchedule.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Scheduled with ID ${id} not found`);
    }

    return this.prismaService.classSchedule.update({
      where: { id },
      data: updateClassScheduleDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.classSchedule.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Class scheduled with ID ${id} not found`);
    }

    return this.prismaService.classSchedule.delete({
      where: { id },
    });
  }
}
