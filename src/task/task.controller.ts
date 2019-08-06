import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDTO } from './DTO/createTaskDTO';
import { Task, TaskStatus } from './task.model';
import { TaskStatusValidationPipe } from './pipe/task.status-validation.pipe';
import { GetTaskFilterDTO } from './DTO/GetTaskFilterDTO';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  getTask(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.taskService.getTaskWIthFilter(filterDTO);
    } else {
      return this.taskService.getAllTask();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createtaskDTO: createTaskDTO) {
    return this.taskService.createTask(createtaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/:status')
  updateTask(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus) {
    return this.taskService.updateTask(id, status);
  }
}
