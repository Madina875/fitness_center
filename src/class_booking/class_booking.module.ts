import { Module } from '@nestjs/common';
import { ClassBookingService } from './class_booking.service';
import { ClassBookingController } from './class_booking.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [ClassBookingController],
  providers: [ClassBookingService, JwtService],
})
export class ClassBookingModule {}
