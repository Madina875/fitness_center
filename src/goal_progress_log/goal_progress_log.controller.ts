import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoalProgressLogService } from './goal_progress_log.service';
import { CreateGoalProgressLogDto } from './dto/create-goal_progress_log.dto';
import { UpdateGoalProgressLogDto } from './dto/update-goal_progress_log.dto';
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

@ApiTags('📈 Goal Progress Logs')
@Controller('goal-progress-log')
export class GoalProgressLogController {
  constructor(
    private readonly goalProgressLogService: GoalProgressLogService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new goal progress log entry' })
  @ApiBody({ type: CreateGoalProgressLogDto })
  @ApiCreatedResponse({
    description: 'Goal progress log created successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid goal progress data.' })
  create(@Body() createGoalProgressLogDto: CreateGoalProgressLogDto) {
    return this.goalProgressLogService.create(createGoalProgressLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all goal progress logs' })
  @ApiOkResponse({ description: 'Goal progress logs retrieved successfully.' })
  findAll() {
    return this.goalProgressLogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a goal progress log by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Goal progress log ID' })
  @ApiOkResponse({ description: 'Goal progress log retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Goal progress log not found.' })
  findOne(@Param('id') id: string) {
    return this.goalProgressLogService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a goal progress log by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Goal progress log ID' })
  @ApiBody({ type: UpdateGoalProgressLogDto })
  @ApiOkResponse({ description: 'Goal progress log updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid update data.' })
  @ApiNotFoundResponse({ description: 'Goal progress log not found.' })
  update(
    @Param('id') id: string,
    @Body() updateGoalProgressLogDto: UpdateGoalProgressLogDto,
  ) {
    return this.goalProgressLogService.update(+id, updateGoalProgressLogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a goal progress log by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Goal progress log ID' })
  @ApiOkResponse({ description: 'Goal progress log deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Goal progress log not found.' })
  remove(@Param('id') id: string) {
    return this.goalProgressLogService.remove(+id);
  }
}
