import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';

export class GetTaskFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.CLOSE, TaskStatus.IN_PROGRESS])
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}