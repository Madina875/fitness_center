import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreateClassBookingDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  classId: number;

  @ApiProperty()
  @IsDateString()
  bookedAt: string;

  @ApiProperty()
  @IsBoolean()
  attended: boolean;
}
