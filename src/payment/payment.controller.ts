import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
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
import { RoleGuard } from '../common/guards/role.guard';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('💳 Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiCreatedResponse({ description: 'Payment created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid payment data.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Get()
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiOkResponse({ description: 'List of payments.' })
  findAll() {
    return this.paymentService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiOkResponse({ description: 'Payment found.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiOkResponse({ description: 'Payment updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin', 'user']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiOkResponse({ description: 'Payment deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
