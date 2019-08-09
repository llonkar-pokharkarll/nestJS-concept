import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDTO } from './DTO/createTaskDTO';
import { TaskStatusValidationPipe } from './pipe/task.status-validation.pipe';
import { GetTaskFilterDTO } from './DTO/GetTaskFilterDTO';
import { Task } from './interface/task.interface';
import { TaskStatus } from './taskStatus.enum';


@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  getTask(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO) {
    return this.taskService.getAllTask();
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

  @Patch('/:id/status')
  updateTask(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus) {
    return this.taskService.updateTask(id, status);
  }
}
