import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsString()
  confirm_password?: string;

  @ApiProperty({ default: false, required: false })
  @IsBoolean()
  is_active?: boolean;

  activation_link?: string;
}
