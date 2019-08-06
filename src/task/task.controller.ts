import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDTO } from './DTO/createTaskDTO';
import { Task, TaskStatus } from './task.model';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  getAllTask(): Task[] {
    return this.taskService.getAllTask();
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createtaskDTO: createTaskDTO) {
    return this.taskService.createTask(createtaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/:status')
  updateTask(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.taskService.updateTask(id, status);
  }
}
