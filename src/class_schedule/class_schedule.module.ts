import { Module } from '@nestjs/common';
import { ClassScheduleService } from './class_schedule.service';
import { ClassScheduleController } from './class_schedule.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [ClassScheduleController],
  providers: [ClassScheduleService, JwtService],
})
export class ClassScheduleModule {}
