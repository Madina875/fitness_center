import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
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
import { ResetPasswordAdminDto } from './dto/reset-password-admin.dto';
import { PasswordAdminDto } from './dto/password-admin.dto';
import { Response } from 'express';
import { RoleGuard } from '../common/guards/role.guard';
import { AdminSelfGuard } from '../common/guards/admin-self.guard';
import { SelfOrRoleGuard } from '../common/guards/self-role.guard';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('🧑‍💼 Admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard, RoleGuard(['superadmin']))
  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiCreatedResponse({
    description: 'The admin has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid admin data.' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin']))
  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiOkResponse({
    description: 'All admins retrieved successfully.',
  })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin']))
  @Get(':id')
  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Admin ID' })
  @ApiOkResponse({
    description: 'Admin retrieved successfully.',
  })
  @ApiNotFoundResponse({ description: 'Admin not found.' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'admin']), AdminSelfGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an admin by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Admin ID' })
  @ApiBody({ type: UpdateAdminDto })
  @ApiOkResponse({
    description: 'Admin updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'Admin not found.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['admin', 'superadmin']), AdminSelfGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admin by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Admin ID' })
  @ApiOkResponse({
    description: 'Admin deleted successfully.',
  })
  @ApiNotFoundResponse({ description: 'Admin not found.' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['admin', 'superadmin']), AdminSelfGuard)
  @Patch('forget-password/:id')
  @ApiOperation({ summary: 'Forget password admin by ID' })
  async forgetPassword(
    @Param('id') adminId: string,
    @Body() passwordAdminDto: PasswordAdminDto,
    @Res() res: Response,
  ) {
    return this.adminService.forgetPassword(+adminId, res, passwordAdminDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['admin', 'superadmin']), AdminSelfGuard)
  @Patch('reset-password/:id')
  @ApiOperation({ summary: 'Reset password admin by ID' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordAdminDto,
    @Param('id') adminId: string,
    @Res() res: Response,
  ) {
    return this.adminService.resetPassword(+adminId, res, resetPasswordDto);
  }
}
