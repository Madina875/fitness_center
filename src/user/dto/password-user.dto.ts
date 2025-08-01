import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordUserDto {
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirm_password: string;
}
