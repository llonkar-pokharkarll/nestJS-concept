import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { DatabaseModule } from './config/database.module';
import { photoProviders } from './task.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [TaskController],
    providers: [...photoProviders, TaskService],
})
export class TaskModule { }
