import { Injectable } from '@nestjs/common';
import { CreateUserCenterDto } from './dto/create-user_center.dto';
import { UpdateUserCenterDto } from './dto/update-user_center.dto';

@Injectable()
export class UserCenterService {
  create(createUserCenterDto: CreateUserCenterDto) {
    return 'This action adds a new userCenter';
  }

  findAll() {
    return `This action returns all userCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCenter`;
  }

  update(id: number, updateUserCenterDto: UpdateUserCenterDto) {
    return `This action updates a #${id} userCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCenter`;
  }
}
