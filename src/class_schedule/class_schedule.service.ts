import { Injectable } from '@nestjs/common';
import { CreateClassScheduleDto } from './dto/create-class_schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class_schedule.dto';

@Injectable()
export class ClassScheduleService {
  create(createClassScheduleDto: CreateClassScheduleDto) {
    return 'This action adds a new classSchedule';
  }

  findAll() {
    return `This action returns all classSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classSchedule`;
  }

  update(id: number, updateClassScheduleDto: UpdateClassScheduleDto) {
    return `This action updates a #${id} classSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} classSchedule`;
  }
}
