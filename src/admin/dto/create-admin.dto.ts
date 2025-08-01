import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsString()
  confirm_password?: string;

  @ApiProperty({ default: false, required: false })
  @IsBoolean()
  is_active?: boolean;

  is_owner?: boolean;
}
