import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassBookingDto } from './dto/create-class_booking.dto';
import { UpdateClassBookingDto } from './dto/update-class_booking.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassBookingService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createClassBookingDto: CreateClassBookingDto) {
    return this.prismaService.classBooking.create({
      data: createClassBookingDto,
    });
  }

  findAll() {
    return this.prismaService.classBooking.findMany();
  }

  findOne(id: number) {
    return this.prismaService.classBooking.findUnique({ where: { id } });
  }

  async update(id: number, updateClassBookingDto: UpdateClassBookingDto) {
    const existing = await this.prismaService.classBooking.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Class booked with ID ${id} not found`);
    }

    return this.prismaService.classBooking.update({
      where: { id },
      data: updateClassBookingDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.classBooking.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return this.prismaService.classBooking.delete({
      where: { id },
    });
  }
}
