import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordAdminDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  current_password: string;
  @ApiProperty()
  new_password: string;
  @ApiProperty()
  confirm_password: string;
}
