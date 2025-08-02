import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  AccessTokenStrategy,
  RefreshTokenStrategyCookie,
} from '../common/strategies';
import { MailModule } from '../mail/mail.module';
import { UserRoleModule } from '../user_role/user_role.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    UserModule,
    MailModule,
    AdminModule,
    UserRoleModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategyCookie,
    JwtService,
  ],
})
export class AuthModule {}
