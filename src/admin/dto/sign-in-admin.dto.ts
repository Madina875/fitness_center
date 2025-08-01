import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInAdminDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
