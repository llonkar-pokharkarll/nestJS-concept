import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { createTaskDTO } from './DTO/createTaskDTO';
import { TaskStatus } from './taskStatus.enum';
import { Model } from 'mongoose';
import { Task } from './interface/task.interface';

@Injectable()
export class TaskService {
  constructor(@Inject('TASK_MODEL')
  private readonly taskModel: Model<Task>) { }
  // private task = [];

  async getAllTask() {
    return await this.taskModel.find();
  }

  // getTaskWIthFilter(filterDTO: GetTaskFilterDTO): Task[] {
  //   const { search, status } = filterDTO;
  //   let task = this.getAllTask();
  //   if (status) {
  //     task = task.filter(task => task.status === status)
  //   }
  //   if (search) {
  //     task = task.filter(task => task.title.includes(search) || task.description.includes(search))
  //   }
  //   return task;
  // }
  async getTaskById(id: string) {
    const found = await this.taskModel.findById(id);
    if (!found) {
      throw new NotFoundException('Task With ID not found');
    }
    return found;
  }

  async createTask(createtaskDTO: createTaskDTO): Promise<Task> {
    const { title, description } = createtaskDTO;
    const task = new this.taskModel();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

  async deleteTask(id: string): Promise<any> {
    const found = await this.taskModel.findByIdAndDelete(id);
    if (!found) {
      throw new NotFoundException('Task With ID not found');
    }
    return 'record deleted';
  }

  async updateTask(id: string, Status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = Status;
    await task.save();
    return task;
  }
}
