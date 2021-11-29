import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    return this.tasks.filter((task) => {
      return (
        task.status.includes(status) ||
        task.title.includes(search) ||
        task.description.includes(search)
      );
    });
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  public deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
