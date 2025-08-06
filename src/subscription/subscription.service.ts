import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserSubscriptions(userId: number, refreshToken: any, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('user not exists in the db');
    }

    return this.prismaService.subscription.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        center: true,
      },
    });
  }

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prismaService.subscription.create({
      data: createSubscriptionDto,
    });
  }

  findAll() {
    return this.prismaService.subscription.findMany({
      include: { user: true, center: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.subscription.findUnique({ where: { id } });
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const existing = await this.prismaService.subscription.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return this.prismaService.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prismaService.subscription.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return this.prismaService.subscription.delete({
      where: { id },
    });
  }
}
