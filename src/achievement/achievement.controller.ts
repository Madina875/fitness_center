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
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';

@ApiTags('🏆 Achievements')
@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @UseGuards(AuthGuard, RoleGuard(['user', 'manager']))
  @Post()
  @ApiOperation({ summary: 'Create a new achievement' })
  @ApiBody({ type: CreateAchievementDto })
  @ApiCreatedResponse({
    description: 'The achievement has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid achievement data.' })
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementService.create(createAchievementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all achievements' })
  @ApiOkResponse({
    description: 'All achievements retrieved successfully.',
  })
  findAll() {
    return this.achievementService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard(['user', 'manager']))
  @Get(':id')
  @ApiOperation({ summary: 'Get an achievement by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Achievement ID' })
  @ApiOkResponse({
    description: 'Achievement retrieved successfully.',
  })
  @ApiNotFoundResponse({ description: 'Achievement not found.' })
  findOne(@Param('id') id: string) {
    return this.achievementService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['user', 'manager']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update an achievement by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Achievement ID' })
  @ApiBody({ type: UpdateAchievementDto })
  @ApiOkResponse({
    description: 'Achievement updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'Achievement not found.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  update(
    @Param('id') id: string,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ) {
    return this.achievementService.update(+id, updateAchievementDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['user', 'manager']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an achievement by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Achievement ID' })
  @ApiOkResponse({
    description: 'Achievement deleted successfully.',
  })
  @ApiNotFoundResponse({ description: 'Achievement not found.' })
  remove(@Param('id') id: string) {
    return this.achievementService.remove(+id);
  }
}
