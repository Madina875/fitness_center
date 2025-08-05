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
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
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
@ApiTags('🏋️‍♂️ Equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Post()
  @ApiOperation({ summary: 'Create a new equipment item' })
  @ApiBody({ type: CreateEquipmentDto })
  @ApiCreatedResponse({ description: 'Equipment created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid equipment data.' })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all equipment' })
  @ApiOkResponse({ description: 'All equipment retrieved successfully.' })
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get equipment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Equipment ID' })
  @ApiOkResponse({ description: 'Equipment retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Equipment not found.' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update equipment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Equipment ID' })
  @ApiBody({ type: UpdateEquipmentDto })
  @ApiOkResponse({ description: 'Equipment updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Equipment not found.' })
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete equipment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Equipment ID' })
  @ApiOkResponse({ description: 'Equipment deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Equipment not found.' })
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }
}
