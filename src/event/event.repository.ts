import { Repository, EntityRepository } from 'typeorm';
import { Event } from './event.entity';

@EntityRepository(Event)
export class TaskRepository extends Repository<Event> { }