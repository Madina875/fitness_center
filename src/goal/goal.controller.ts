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
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
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
@ApiTags('🎯 Goals')
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'user']))
  @Post()
  @ApiOperation({ summary: 'Create a new goal' })
  @ApiBody({ type: CreateGoalDto })
  @ApiCreatedResponse({ description: 'Goal created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid goal data.' })
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalService.create(createGoalDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'user']))
  @Get()
  @ApiOperation({ summary: 'Get all goals' })
  @ApiOkResponse({ description: 'All goals retrieved successfully.' })
  findAll() {
    return this.goalService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'user']))
  @Get(':id')
  @ApiOperation({ summary: 'Get a goal by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Goal ID' })
  @ApiOkResponse({ description: 'Goal retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Goal not found.' })
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'user']))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a goal by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Goal ID' })
  @ApiBody({ type: UpdateGoalDto })
  @ApiOkResponse({ description: 'Goal updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Goal not found.' })
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(+id, updateGoalDto);
  }

  @UseGuards(AuthGuard, RoleGuard(['superadmin', 'user']))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a goal by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Goal ID' })
  @ApiOkResponse({ description: 'Goal deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Goal not found.' })
  remove(@Param('id') id: string) {
    return this.goalService.remove(+id);
  }
}
