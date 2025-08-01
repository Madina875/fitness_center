import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
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

@ApiTags('🧑‍💼 Admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiOkResponse({
    description: 'All admins retrieved successfully.',
  })
  findAll() {
    return this.adminService.findAll();
  }

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

  @Patch('forget-password/:id')
  @ApiOperation({ summary: 'Forget password admin by ID' })
  async forgetPassword(
    @Param('id') adminId: string,
    @Body() passwordAdminDto: PasswordAdminDto,
    @Res() res: Response,
  ) {
    return this.adminService.forgetPassword(+adminId, res, passwordAdminDto);
  }

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
