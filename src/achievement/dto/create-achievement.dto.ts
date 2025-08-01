import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateAchievementDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  goalId: number;

  @ApiProperty()
  @IsString()
  title: string;

  achivedAt: string;

  @ApiProperty()
  @IsNumber()
  centerId: number;
}
