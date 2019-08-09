import { Module } from '@nestjs/common';
import { TaskController } from './event/task.controller';
import { TaskService } from './event/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './event/task.repository';
import { TaskModule } from './event/task.module';

@Module({
  imports: [TaskModule],
})

export class AppModule { }
