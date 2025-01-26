import { Injectable, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto) {

     const user  = {
      email:"mateu",
      name:"mateus",
      id:1
     }
    return  user;
  }

  findAll() {
    const user  = {
      email:"mateu",
      name:"mateus",
      id:1
     }
    return  user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
