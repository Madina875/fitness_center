import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';
import { DistrictModule } from './district/district.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), RegionModule, PrismaModule, DistrictModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
