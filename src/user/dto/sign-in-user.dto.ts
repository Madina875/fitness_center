import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
