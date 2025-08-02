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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
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
import { RoleGuard } from '../common/guards/role.guard';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('🛡️ Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: CreateRoleDto })
  @ApiCreatedResponse({ description: 'Role created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid role data.' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(AuthGuard, RoleGuard('all'))
  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ description: 'List of all roles.' })
  findAll() {
    return this.roleService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard('all'))
  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Role ID' })
  @ApiOkResponse({ description: 'Role found.' })
  @ApiNotFoundResponse({ description: 'Role not found.' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update role by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Role ID' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiOkResponse({ description: 'Role updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Role not found.' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete role by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Role ID' })
  @ApiOkResponse({ description: 'Role deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Role not found.' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
