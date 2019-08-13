import { Controller, Get, Post, Delete, Patch, Param, Body, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { createUserDTO } from '../DTO/createUserDTO';

@Controller('/user')
export class UserController {
  constructor(
    private userservice: UserService,
  ) { }
  @Get()
  getUser() {
    return this.userservice.getAllEvent();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userservice.getEventById(id);
  }

  @Post()
  createUser(@Body() createuserDTO: createUserDTO) {
    return this.userservice.createEvent(createuserDTO);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userservice.deleteEvent(id);
  }

  @Put()
  updateUser(@Body() newUser: createUserDTO) {
    return this.userservice.updateEvent(newUser);
  }
}
