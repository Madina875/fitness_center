import { PartialType } from '@nestjs/swagger';
import { CreateClassScheduleDto } from './create-class_schedule.dto';

export class UpdateClassScheduleDto extends PartialType(CreateClassScheduleDto) {}
