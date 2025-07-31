import { PartialType } from '@nestjs/swagger';
import { CreateGoalProgressLogDto } from './create-goal_progress_log.dto';

export class UpdateGoalProgressLogDto extends PartialType(CreateGoalProgressLogDto) {}
