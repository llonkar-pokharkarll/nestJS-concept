import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { EventStatus } from './eventStatus.enum';

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: EventStatus;
}