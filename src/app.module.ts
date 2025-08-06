import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';
import { DistrictModule } from './district/district.module';
import { FitnessCenterModule } from './fitness_center/fitness_center.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user_role/user_role.module';
import { UserCenterModule } from './user_center/user_center.module';
import { ImageModule } from './image/image.module';
import { PaymentModule } from './payment/payment.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ClassScheduleModule } from './class_schedule/class_schedule.module';
import { ClassBookingModule } from './class_booking/class_booking.module';
import { GoalModule } from './goal/goal.module';
import { GoalProgressLogModule } from './goal_progress_log/goal_progress_log.module';
import { AchievementModule } from './achievement/achievement.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    RegionModule,
    PrismaModule,
    DistrictModule,
    FitnessCenterModule,
    UserModule,
    AdminModule,
    RoleModule,
    UserRoleModule,
    UserCenterModule,
    ImageModule,
    PaymentModule,
    SubscriptionModule,
    EquipmentModule,
    ClassScheduleModule,
    ClassBookingModule,
    GoalModule,
    GoalProgressLogModule,
    AchievementModule,
    AuthModule,
    AppModule,
    ReviewModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
