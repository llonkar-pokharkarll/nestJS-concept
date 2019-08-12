import { Module } from '@nestjs/common';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './event/event.repository';
import { EventModule } from './event/event.module';

@Module({
  imports: [EventModule],
})

export class AppModule { }
