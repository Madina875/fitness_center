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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RoleGuard } from '../common/guards/role.guard';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('🏙️ Districts')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @UseGuards(AuthGuard, RoleGuard(['admin', 'superadmin']))
  @Post()
  @ApiOperation({ summary: 'Create a district' })
  @ApiBody({ type: CreateDistrictDto })
  @ApiCreatedResponse({ description: 'District created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid district data.' })
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all districts' })
  @ApiOkResponse({ description: 'All districts retrieved successfully.' })
  findAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a district by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'District ID' })
  @ApiOkResponse({ description: 'District retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'District not found.' })
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['admin', 'superadmin']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a district by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'District ID' })
  @ApiBody({ type: UpdateDistrictDto })
  @ApiOkResponse({ description: 'District updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'District not found.' })
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['admin', 'superadmin']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a district by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'District ID' })
  @ApiOkResponse({ description: 'District deleted successfully.' })
  @ApiNotFoundResponse({ description: 'District not found.' })
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
