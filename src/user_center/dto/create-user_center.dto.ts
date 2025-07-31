import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateUserCenterDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  centerId: number;

  @ApiProperty()
  @IsBoolean()
  isAccepted: boolean;
}
