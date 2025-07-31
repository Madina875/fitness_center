import { Module } from '@nestjs/common';
import { UserCenterService } from './user_center.service';
import { UserCenterController } from './user_center.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserCenterController],
  providers: [UserCenterService],
})
export class UserCenterModule {}
