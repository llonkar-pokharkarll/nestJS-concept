import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { createTaskDTO } from './DTO/createTaskDTO';
import { TaskStatus, Task } from './task.model';
import { GetTaskFilterDTO } from './DTO/GetTaskFilterDTO';

@Injectable()
export class TaskService {
  private task = [];

  getAllTask() {
    return this.task;
  }

  getTaskWIthFilter(filterDTO: GetTaskFilterDTO): Task[] {
    const { search, status } = filterDTO;
    let task = this.getAllTask();
    if (status) {
      task = task.filter(task => task.status === status)
    }
    if (search) {
      task = task.filter(task => task.title.includes(search) || task.description.includes(search))
    }
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.task.find(item => item.id === id);

    if (!found) {
      throw new NotFoundException('Task With ID not found');
    }

    return found;
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
    const found = this.getTaskById(id);
    this.task = this.task.filter(item => item.id !== found.id);
    return this.task;
  }

  updateTask(id: string, Status: TaskStatus): object {
    const task = this.getTaskById(id);
    task.status = Status;
    return task;
  }
}
