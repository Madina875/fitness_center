import { Module } from '@nestjs/common';
import { GoalProgressLogService } from './goal_progress_log.service';
import { GoalProgressLogController } from './goal_progress_log.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [GoalProgressLogController],
  providers: [GoalProgressLogService, JwtService],
})
export class GoalProgressLogModule {}
