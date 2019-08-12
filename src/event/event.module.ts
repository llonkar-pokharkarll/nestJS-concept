import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './event.repository';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';
import { DatabaseModule } from './config/database.module';
import { eventProviders } from './event.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [EventController],
    providers: [...eventProviders, EventService],
})
export class EventModule { }
