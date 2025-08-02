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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
import { Response } from 'express';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';
import { SelfOrRoleGuard } from '../common/guards/self-role.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { AuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('👤 Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin']))
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid user data.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'manager', 'admin']))
  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiOkResponse({ description: 'List of users.' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(
    AuthGuard,
    RoleGuard(['superadmin', 'manager', 'admin', 'user']),
    SelfOrRoleGuard('all'),
  )
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOkResponse({ description: 'User found.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(
    AuthGuard,
    RoleGuard(['superadmin', 'manager', 'admin', 'user']),
    SelfOrRoleGuard('all'),
  )
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['manager', 'superadmin']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch('forget-password/:id')
  @ApiOperation({ summary: 'Forget password user by ID' })
  async forgetPassword(
    @Param('id') userId: string,
    @Body() passwordUserDto: PasswordUserDto,
    @Res() res: Response,
  ) {
    return this.userService.forgetPassword(+userId, res, passwordUserDto);
  }

  @Patch('reset-password/:id')
  @ApiOperation({ summary: 'Reset password user by ID' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordUserDto,
    @Param('id') userId: string,
    @Res() res: Response,
  ) {
    return this.userService.resetPassword(+userId, res, resetPasswordDto);
  }
}
