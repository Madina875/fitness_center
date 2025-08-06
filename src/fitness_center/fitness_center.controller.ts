import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FitnessCenterService } from './fitness_center.service';
import { CreateFitnessCenterDto } from './dto/create-fitness_center.dto';
import { UpdateFitnessCenterDto } from './dto/update-fitness_center.dto';
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
@ApiTags('🧘‍♂️ Fitness Centers')
@Controller('fitness-center')
export class FitnessCenterController {
  constructor(private readonly fitnessCenterService: FitnessCenterService) {}

  @Get('equipments/:id')
  getCenter(@Param('id', ParseIntPipe) centerId: string) {
    return this.fitnessCenterService.getById(+centerId);
  }
  @Get('search/by-name')
  searchByName(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('Name query parameter is required');
    }
    return this.fitnessCenterService.findByName(name);
  }

  @Get('image/:id')
  getImage(@Param('id', ParseIntPipe) centerId: string) {
    return this.fitnessCenterService.getByIdImage(+centerId);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Post()
  @ApiOperation({ summary: 'Create a fitness center' })
  @ApiBody({ type: CreateFitnessCenterDto })
  @ApiCreatedResponse({
    description: 'Fitness center created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid fitness center data.',
  })
  create(@Body() createFitnessCenterDto: CreateFitnessCenterDto) {
    return this.fitnessCenterService.create(createFitnessCenterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fitness centers' })
  @ApiOkResponse({
    description: 'All fitness centers retrieved successfully.',
  })
  findAll() {
    return this.fitnessCenterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a fitness center by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Fitness Center ID',
  })
  @ApiOkResponse({
    description: 'Fitness center retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Fitness center not found.',
  })
  findOne(@Param('id') id: string) {
    return this.fitnessCenterService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a fitness center by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Fitness Center ID',
  })
  @ApiBody({ type: UpdateFitnessCenterDto })
  @ApiOkResponse({
    description: 'Fitness center updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid update data.',
  })
  @ApiNotFoundResponse({
    description: 'Fitness center not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateFitnessCenterDto: UpdateFitnessCenterDto,
  ) {
    return this.fitnessCenterService.update(+id, updateFitnessCenterDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a fitness center by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Fitness Center ID',
  })
  @ApiOkResponse({
    description: 'Fitness center deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Fitness center not found.',
  })
  remove(@Param('id') id: string) {
    return this.fitnessCenterService.remove(+id);
  }
}
