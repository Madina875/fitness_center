import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateGoalProgressLogDto {
  @ApiProperty()
  @IsNumber()
  goalId: number;

  @ApiProperty()
  @IsString()
  progress: string;

  @ApiProperty({ required: false })
  @IsString()
  note?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  loggedAt?: string;
}
