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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
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
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { AdminSelfGuard } from '../common/guards/admin-self.guard';

@ApiTags('🌍 Regions')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new region' })
  @ApiBody({ type: CreateRegionDto })
  @ApiCreatedResponse({ description: 'Region created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid region data.' })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  @ApiOkResponse({ description: 'List of all regions.' })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get region by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Region ID' })
  @ApiOkResponse({ description: 'Region found.' })
  @ApiNotFoundResponse({ description: 'Region not found.' })
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update region by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Region ID' })
  @ApiBody({ type: UpdateRegionDto })
  @ApiOkResponse({ description: 'Region updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Region not found.' })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete region by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Region ID' })
  @ApiOkResponse({ description: 'Region deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Region not found.' })
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
