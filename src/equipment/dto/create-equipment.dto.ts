import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  centerId: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  available?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  maintenanceAt?: string;
}
