import { Injectable, NotFoundException, Catch, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interface/user.interface';
import { createUserDTO } from 'src/DTO/createUserDTO';
import { error } from 'util';
import { RabbitMQService } from './rebiitmq.service';

@Injectable()
export class UserService {
  constructor(@InjectModel('User')
  private readonly userModel: Model<User>) { }

  async getAllUser() {
    return await this.userModel.find();
  }

  async getUserById(id: string) {
    const found = await this.userModel.findById(id);
    if (!found) {
      throw new NotFoundException('User With ID not found');
    }
    return found;
  }

  async createUser(createuserDTO: createUserDTO): Promise<any> {
    // const { name, userId, password } = createuserDTO;
    const test = new RabbitMQService('	amqp://whgejucx:0m6v7Ad_jvVU-vazSeTkeMilTnTCfJqT@termite.rmq.cloudamqp.com/whgejucx', 'exchang2', 'queue2')

    await test.publish(JSON.stringify(createuserDTO));
    console.log('object');
    const user = new this.userModel(createuserDTO);
    try {

      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('UserId Already exists');
      }
    }
    return user;
  }

  async deleteUser(id: string): Promise<any> {
    return await this.userModel.find({ _id: id }).remove();
  }

  async updateUser(id: string, data: Partial<createUserDTO>) {
    await this.userModel.findByIdAndUpdate(id, data);
    return await this.getUserById(id);
  }
}
