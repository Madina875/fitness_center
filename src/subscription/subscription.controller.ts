import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { RefreshTokenGuard } from '../common/guards';
import { GetCurrentUserId, GetCurrrentUser } from '../common/decorators';
import { Response } from 'express';

@ApiBearerAuth('access-token')
@ApiTags('🔔 Subscriptions')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('me')
  @UseGuards(RefreshTokenGuard)
  getMySubscriptions(
    @GetCurrentUserId() userId: number,
    @GetCurrrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.subscriptionService.getUserSubscriptions(
      userId,
      refreshToken,
      res,
    );
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Post()
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiBody({ type: CreateSubscriptionDto })
  @ApiCreatedResponse({ description: 'Subscription created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid subscription data.' })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Get()
  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiOkResponse({ description: 'List of subscriptions.' })
  findAll() {
    return this.subscriptionService.findAll();
  }
  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Get(':id')
  @ApiOperation({ summary: 'Get subscription by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Subscription ID' })
  @ApiOkResponse({ description: 'Subscription found.' })
  @ApiNotFoundResponse({ description: 'Subscription not found.' })
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update subscription by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Subscription ID' })
  @ApiBody({ type: UpdateSubscriptionDto })
  @ApiOkResponse({ description: 'Subscription updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Subscription not found.' })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete subscription by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Subscription ID' })
  @ApiOkResponse({ description: 'Subscription deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Subscription not found.' })
  remove(@Param('id') id: string) {
    return this.subscriptionService.remove(+id);
  }
}
