import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreateClassBookingDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  classId: number;

  @ApiProperty({ required: false })
  @IsDateString()
  bookedAt?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  attended?: boolean;
}
