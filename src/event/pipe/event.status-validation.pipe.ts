import { ValidationPipe, BadRequestException, PipeTransform } from '@nestjs/common';
import { EventStatus } from '../eventStatus.enum';

export class EventStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [EventStatus.OPEN, EventStatus.CLOSE, EventStatus.IN_PROGRESS];
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
