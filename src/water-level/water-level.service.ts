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


  create(createWaterLevelDto: CreateWaterLevelDto) {
    
   const waterLevel  =  this.prisma.waterLevel.upsert({
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
   
   //this.WebsocketsGateway.handleEvent('water-level', waterLevel); 

   return   waterLevel;

  }

  findAll() {
    const waterLevel = this.prisma.waterLevel.findFirst();
    //this.WebsocketsGateway.handleEvent('water-level', waterLevel);
    return waterLevel;
  }

 
}
