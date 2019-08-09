import { ValidationPipe, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../taskStatus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [TaskStatus.OPEN, TaskStatus.CLOSE, TaskStatus.IN_PROGRESS];
  transform(value: any) {
    const val = value.toUpperCase();

    if (!this.isValidStatus(val)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return val;
  }

  private isValidStatus(val) {
    const indx = this.allowedStatus.indexOf(val);
    return indx !== -1;
  }
}
