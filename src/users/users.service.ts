import { Injectable, Controller, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {

    const user  = await this.prisma.user.create({
      data:{
        email:"mateusss@gmail.com",
        name:"mateus",
      }
    })
    return  user;
  }

 async findAll() {

    const user =  await this.prisma.user.findMany(); 
    if(!user){
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.findMany();
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
