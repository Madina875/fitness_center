import { Module } from '@nestjs/common';
import { FitnessCenterService } from './fitness_center.service';
import { FitnessCenterController } from './fitness_center.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [FitnessCenterController],
  providers: [FitnessCenterService, JwtService],
})
export class FitnessCenterModule {}
