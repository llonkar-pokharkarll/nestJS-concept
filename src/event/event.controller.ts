import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { createEventDTO } from './DTO/createEventDTO';
import { EventStatusValidationPipe } from './pipe/event.status-validation.pipe';
import { GetEventFilterDTO } from './DTO/GetEventFilterDTO';
import { Event } from './interface/event.interface';
import { EventStatus } from './eventStatus.enum';


@Controller('/event')
export class EventController {
  constructor(private eventService: EventService) { }

  @Get()
  getEvent(@Query(ValidationPipe) filterDTO: GetEventFilterDTO) {
    return this.eventService.getAllEvent();
  }

  @Get('/:id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createEvent(@Body() createtaskDTO: createEventDTO) {
    return this.eventService.createEvent(createtaskDTO);
  }

  @Delete('/:id')
  deleteEvent(@Param() id: string) {
    return this.eventService.deleteEvent(id);
  }

  @Patch('/:id/status')
  updateEvent(@Param('id') id: string, @Body('status', EventStatusValidationPipe) status: EventStatus) {
    return this.eventService.updateEvent(id, status);
  }
}
