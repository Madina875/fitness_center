import { Injectable } from '@nestjs/common';
import { CreateGoalProgressLogDto } from './dto/create-goal_progress_log.dto';
import { UpdateGoalProgressLogDto } from './dto/update-goal_progress_log.dto';

@Injectable()
export class GoalProgressLogService {
  create(createGoalProgressLogDto: CreateGoalProgressLogDto) {
    return 'This action adds a new goalProgressLog';
  }

  findAll() {
    return `This action returns all goalProgressLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goalProgressLog`;
  }

  update(id: number, updateGoalProgressLogDto: UpdateGoalProgressLogDto) {
    return `This action updates a #${id} goalProgressLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} goalProgressLog`;
  }
}
