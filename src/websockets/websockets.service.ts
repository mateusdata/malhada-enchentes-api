import { Injectable } from '@nestjs/common';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebsocketsService {
  constructor(private readonly prisma: PrismaService) { }
  create(createWebsocketDto: CreateWebsocketDto) {
    return 'This action adds a new websocket';
  }

  async  findAll() {
    const level  =  await  this.prisma.waterLevel.findFirst()  
    return level; 
  }

  findOne(id: number) {
    return `This action returns a #${id} websocket`;
  }

  update(id: number, updateWebsocketDto: UpdateWebsocketDto) {
    return `This action updates a #${id} websocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} websocket`;
  }
}
