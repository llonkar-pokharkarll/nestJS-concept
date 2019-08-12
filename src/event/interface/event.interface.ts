import { EventStatus } from '../eventStatus.enum';
import { Document } from 'mongoose';

export interface Event extends Document {
    id: string;
    title: string;
    description: string;
    status: EventStatus;
}