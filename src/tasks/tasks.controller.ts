import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
