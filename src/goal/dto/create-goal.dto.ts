import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateGoalDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  target: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsDateString()
  deadline: string;
}
