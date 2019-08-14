import { Controller, Get, Post, Delete, Patch, Param, Body, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { createUserDTO } from '../DTO/createUserDTO';

@Controller('/user')
export class UserController {
  constructor(
    private userservice: UserService,
  ) { }

  @Get()
  getUser() {
    return this.userservice.getAllUser();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userservice.getUserById(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) createuserDTO: createUserDTO) {
    return this.userservice.createUser(createuserDTO);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userservice.deleteUser(id);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() data: Partial<createUserDTO>) {
    return this.userservice.updateUser(id, data);
  }
}
