import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ required: false })
  is_main?: boolean;

  @ApiProperty()
  centerId: number;
}

