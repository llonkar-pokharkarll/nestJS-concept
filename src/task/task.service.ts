import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { createTaskDTO } from './DTO/createTaskDTO';
import { TaskStatus, Task } from './task.model';

@Injectable()
export class TaskService {
  private task = [];

  getAllTask() {
    return this.task;
  }

  getTaskById(id: string): Task {
    return this.task.find(item => item.id === id);
  }

  createTask(createtaskDTO: createTaskDTO): Task {
    const { title, description } = createtaskDTO;
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.task.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    this.task = this.task.filter(item => item.id !== id);
    return this.task;
  }

  updateTask(id: string, Status: TaskStatus): object {
    const task = this.getTaskById(id);
    task.status = Status;
    return task;
  }
}
