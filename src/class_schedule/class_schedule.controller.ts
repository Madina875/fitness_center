import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassScheduleService } from './class_schedule.service';
import { CreateClassScheduleDto } from './dto/create-class_schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class_schedule.dto';
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

@ApiTags('📆 Class Schedules')
@Controller('class-schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a class schedule' })
  @ApiBody({ type: CreateClassScheduleDto })
  @ApiCreatedResponse({
    description: 'Class schedule created successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid class schedule data.' })
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classScheduleService.create(createClassScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all class schedules' })
  @ApiOkResponse({
    description: 'All class schedules retrieved successfully.',
  })
  findAll() {
    return this.classScheduleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a class schedule by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Class Schedule ID' })
  @ApiOkResponse({
    description: 'Class schedule retrieved successfully.',
  })
  @ApiNotFoundResponse({ description: 'Class schedule not found.' })
  findOne(@Param('id') id: string) {
    return this.classScheduleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a class schedule by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Class Schedule ID' })
  @ApiBody({ type: UpdateClassScheduleDto })
  @ApiOkResponse({
    description: 'Class schedule updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'Class schedule not found.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  update(
    @Param('id') id: string,
    @Body() updateClassScheduleDto: UpdateClassScheduleDto,
  ) {
    return this.classScheduleService.update(+id, updateClassScheduleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a class schedule by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Class Schedule ID' })
  @ApiOkResponse({
    description: 'Class schedule deleted successfully.',
  })
  @ApiNotFoundResponse({ description: 'Class schedule not found.' })
  remove(@Param('id') id: string) {
    return this.classScheduleService.remove(+id);
  }
}
