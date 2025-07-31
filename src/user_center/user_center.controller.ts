import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCenterService } from './user_center.service';
import { CreateUserCenterDto } from './dto/create-user_center.dto';
import { UpdateUserCenterDto } from './dto/update-user_center.dto';
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

@ApiTags('🔗 User Centers')
@Controller('user-center')
export class UserCenterController {
  constructor(private readonly userCenterService: UserCenterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user center relation' })
  @ApiBody({ type: CreateUserCenterDto })
  @ApiCreatedResponse({ description: 'User center created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid data for user center.' })
  create(@Body() createUserCenterDto: CreateUserCenterDto) {
    return this.userCenterService.create(createUserCenterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user centers' })
  @ApiOkResponse({ description: 'List of user centers.' })
  findAll() {
    return this.userCenterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user center by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User center ID' })
  @ApiOkResponse({ description: 'User center found.' })
  @ApiNotFoundResponse({ description: 'User center not found.' })
  findOne(@Param('id') id: string) {
    return this.userCenterService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user center by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User center ID' })
  @ApiBody({ type: UpdateUserCenterDto })
  @ApiOkResponse({ description: 'User center updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'User center not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUserCenterDto: UpdateUserCenterDto,
  ) {
    return this.userCenterService.update(+id, updateUserCenterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user center by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User center ID' })
  @ApiOkResponse({ description: 'User center deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User center not found.' })
  remove(@Param('id') id: string) {
    return this.userCenterService.remove(+id);
  }
}
