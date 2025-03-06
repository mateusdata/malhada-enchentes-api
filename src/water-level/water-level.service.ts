import { Injectable } from '@nestjs/common';
import { CreateWaterLevelDto } from './dto/create-water-level.dto';
import { UpdateWaterLevelDto } from './dto/update-water-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WaterLevelService {

   constructor(private readonly prisma: PrismaService) {}


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

   return   waterLevel;
  }

  findAll() {
    const waterLevel = this.prisma.waterLevel.findFirst();
    return waterLevel;
  }

  findOne(id: number) {
    return `This action returns a #${id} waterLevel`;
  }

  update(id: number, updateWaterLevelDto: UpdateWaterLevelDto) {
    return `This action updates a #${id} waterLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} waterLevel`;
  }
}
