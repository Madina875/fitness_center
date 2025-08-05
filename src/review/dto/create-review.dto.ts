import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  @IsInt()
  rating: number;

  @ApiProperty({ example: 'Great gym and friendly staff!' })
  @IsString()
  comment: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the user submitting the review',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the fitness center being reviewed',
  })
  @IsInt()
  centerId: number;

  @ApiProperty({
    example: '2025-08-05T15:00:00.000Z',
    required: false,
    description: 'Optional custom review creation date (ISO 8601 format)',
  })
  @IsOptional()
  createdAt?: Date;
}
