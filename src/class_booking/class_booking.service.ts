import { Injectable } from '@nestjs/common';
import { CreateClassBookingDto } from './dto/create-class_booking.dto';
import { UpdateClassBookingDto } from './dto/update-class_booking.dto';

@Injectable()
export class ClassBookingService {
  create(createClassBookingDto: CreateClassBookingDto) {
    return 'This action adds a new classBooking';
  }

  findAll() {
    return `This action returns all classBooking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classBooking`;
  }

  update(id: number, updateClassBookingDto: UpdateClassBookingDto) {
    return `This action updates a #${id} classBooking`;
  }

  remove(id: number) {
    return `This action removes a #${id} classBooking`;
  }
}
