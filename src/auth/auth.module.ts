import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import {
  AccessTokenAdminStrategy,
  AccessTokenStrategy,
  RefreshTokenAdminStrategy,
  RefreshTokenStrategyCookie,
} from '../common/strategies';
import { MailModule } from '../mail/mail.module';
import { UserRoleModule } from '../user_role/user_role.module';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenAdminGuard } from '../common/guards';

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
    AccessTokenAdminStrategy,
    RefreshTokenAdminGuard,
    RefreshTokenAdminStrategy,
  ],
})
export class AuthModule {}
