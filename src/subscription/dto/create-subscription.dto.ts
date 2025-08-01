import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { SubscriptionStatus } from '../../../generated/prisma';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  centerId: number;

  @ApiProperty()
  @IsString()
  planName: string;

  startAt?: string;
  endAt?: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ enum: SubscriptionStatus, required: false })
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;
}
