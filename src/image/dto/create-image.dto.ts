import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsBoolean()
  is_main: boolean;

  @ApiProperty()
  @IsNumber()
  centerId: number;
}
