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
import { UserRoleService } from './user_role.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
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
import { SelfOrRoleGuard } from '../common/guards/self-role.guard';

@ApiBearerAuth('access-token')
@ApiTags('🎭 User Roles')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @UseGuards(AuthGuard, RoleGuard(['manager', 'superadmin', 'admin']))
  @Post()
  @ApiOperation({ summary: 'Create a new user role relation' })
  @ApiBody({ type: CreateUserRoleDto })
  @ApiCreatedResponse({ description: 'User role created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid data for user role.' })
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['manager', 'superadmin', 'admin']))
  @Get()
  @ApiOperation({ summary: 'Get all user roles' })
  @ApiOkResponse({ description: 'List of user roles.' })
  findAll() {
    return this.userRoleService.findAll();
  }

  @UseGuards(
    AuthGuard,
    RoleGuard(['manager', 'superadmin', 'admin', 'user']),
    SelfOrRoleGuard('all'),
  )
  @Get(':id')
  @ApiOperation({ summary: 'Get user role by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User role ID' })
  @ApiOkResponse({ description: 'User role found.' })
  @ApiNotFoundResponse({ description: 'User role not found.' })
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['manager', 'superadmin', 'admin']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update user role by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User role ID' })
  @ApiBody({ type: UpdateUserRoleDto })
  @ApiOkResponse({ description: 'User role updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'User role not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['manager', 'superadmin', 'admin']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user role by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User role ID' })
  @ApiOkResponse({ description: 'User role deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User role not found.' })
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }
}
