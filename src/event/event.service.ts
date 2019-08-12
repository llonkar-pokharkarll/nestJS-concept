import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { createEventDTO } from './DTO/createEventDTO';
import { EventStatus } from './eventStatus.enum';
import { Model } from 'mongoose';
import { Event } from './interface/event.interface';

@Injectable()
export class EventService {
  constructor(@Inject('EVENT_MODEL')
  private readonly eventModel: Model<Event>) { }
  // private task = [];

  async getAllEvent() {
    return await this.eventModel.find();
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
  async getEventById(id: string) {
    const found = await this.eventModel.findById(id);
    if (!found) {
      throw new NotFoundException('Task With ID not found');
    }
    return found;
  }

  async createEvent(createtaskDTO: createEventDTO): Promise<Event> {
    const { title, description } = createtaskDTO;
    const event = new this.eventModel();
    event.title = title;
    event.description = description;
    event.status = EventStatus.OPEN;
    await event.save();
    return event;
  }

  async deleteEvent(id: string): Promise<any> {
    // const found = await this.getEventById(id);
    // if (!found) {
    //   throw new NotFoundException('Task With ID not found');
    // }
    return await this.eventModel.deleteOne(id);
  }

  async updateEvent(id: string, Status: EventStatus) {
    const event = await this.getEventById(id);
    event.status = Status;
    await event.save();
    return event;
  }
}
