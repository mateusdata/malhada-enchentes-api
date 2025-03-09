import { Injectable } from '@nestjs/common';
import { CreateWaterLevelDto } from './dto/create-water-level.dto';
import { UpdateWaterLevelDto } from './dto/update-water-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';

@Injectable()
export class WaterLevelService {

   constructor(
    private readonly prisma: PrismaService,
    private readonly WebsocketsGateway: WebsocketsGateway
  ) {}


 async create(createWaterLevelDto: CreateWaterLevelDto) {
    
   const waterLevel  = await this.prisma.waterLevel.upsert({
    where: { id: 1 },
    update: {
      level: createWaterLevelDto.level,
      location: createWaterLevelDto.location,
    },
    create: {
      level: createWaterLevelDto.level,
      location: createWaterLevelDto.location,
    },  
   })
   
  await this.WebsocketsGateway.findAll()

   return   waterLevel;

  }

  async findAll() {
    const waterLevel = await this.prisma.waterLevel.findFirst();
    await this.WebsocketsGateway.findAll()
    return waterLevel;
  }

 
}
