import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { EventStatus } from '../eventStatus.enum';

export class GetEventFilterDTO {
  @IsOptional()
  @IsIn([EventStatus.OPEN, EventStatus.CLOSE, EventStatus.IN_PROGRESS])
  status: EventStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}