import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
} from '@nestjs/swagger';

@ApiTags('💳 Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiCreatedResponse({ description: 'Payment created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid payment data.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiOkResponse({ description: 'List of payments.' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiOkResponse({ description: 'Payment found.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiOkResponse({ description: 'Payment deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Payment not found.' })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
