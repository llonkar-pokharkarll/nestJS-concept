import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interface/user.interface';
import { createUserDTO } from 'src/DTO/createUserDTO';

@Injectable()
export class UserService {
  constructor(@InjectModel('User')
  private readonly userModel: Model<User>) { }

  async getAllEvent() {
    return await this.userModel.find();
  }

  async getEventById(id: string) {
    const found = await this.userModel.findById(id);
    if (!found) {
      throw new NotFoundException('User With ID not found');
    }
    return found;
  }

  async createEvent(createuserDTO: createUserDTO) {
    const { id, name, userId, password } = createuserDTO;
    const user = new this.userModel(createuserDTO);
    await user.save();
    return user;
  }

  async deleteEvent(id: string): Promise<any> {
    return await this.userModel.find({ _id: id }).remove();
  }

  async updateEvent(user) {
    const { id, name, userId, password } = user;
    console.log(id);

    const userEdit = await this.userModel.findOneAndUpdate({ _id: id }

      , { name, userId, password }, { new: true }
    ).exec();

    //  find({ _id: id }).save({ name, userId, password });

  }
}
