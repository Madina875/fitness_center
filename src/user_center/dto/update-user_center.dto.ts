import { PartialType } from '@nestjs/swagger';
import { CreateUserCenterDto } from './create-user_center.dto';

export class UpdateUserCenterDto extends PartialType(CreateUserCenterDto) {}
