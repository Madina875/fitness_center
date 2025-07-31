import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassBookingService } from './class_booking.service';
import { CreateClassBookingDto } from './dto/create-class_booking.dto';
import { UpdateClassBookingDto } from './dto/update-class_booking.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('📅 Class Bookings')
@Controller('class-booking')
export class ClassBookingController {
  constructor(private readonly classBookingService: ClassBookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a class booking' })
  @ApiBody({ type: CreateClassBookingDto })
  @ApiCreatedResponse({
    description: 'Class booking created successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid class booking data.' })
  create(@Body() createClassBookingDto: CreateClassBookingDto) {
    return this.classBookingService.create(createClassBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all class bookings' })
  @ApiOkResponse({
    description: 'All class bookings retrieved successfully.',
  })
  findAll() {
    return this.classBookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a class booking by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Class Booking ID' })
  @ApiOkResponse({
    description: 'Class booking retrieved successfully.',
  })
  @ApiNotFoundResponse({ description: 'Class booking not found.' })
  findOne(@Param('id') id: string) {
    return this.classBookingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a class booking by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Class Booking ID' })
  @ApiBody({ type: UpdateClassBookingDto })
  @ApiOkResponse({
    description: 'Class booking updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'Class booking not found.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  update(
    @Param('id') id: string,
    @Body() updateClassBookingDto: UpdateClassBookingDto,
  ) {
    return this.classBookingService.update(+id, updateClassBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class booking by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Class Booking ID' })
  @ApiOkResponse({
    description: 'Class booking deleted successfully.',
  })
  @ApiNotFoundResponse({ description: 'Class booking not found.' })
  remove(@Param('id') id: string) {
    return this.classBookingService.remove(+id);
  }
}
