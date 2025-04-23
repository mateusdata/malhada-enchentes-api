import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateEducationalDto } from './dto/create-educational.dto';
import { UpdateEducationalDto } from './dto/update-educational.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EducationalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEducationalDto: CreateEducationalDto) {

    return this.notAvailable();

    return this.prisma.educational.create({
      data: {
        title: createEducationalDto.title,
        description: createEducationalDto.description,
        link: createEducationalDto.link,
        source: createEducationalDto.source,
      },
    });
  }

  createMany(createEducationalDtos: CreateEducationalDto[]) {

    return this.notAvailable();
    
    return this.prisma.educational.createMany({
      data: createEducationalDtos,
    });
  }

  async findAll() {
    return this.prisma.educational.findMany();
  }

  async findOne(id: number) {
    return this.prisma.educational.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEducationalDto: UpdateEducationalDto) {

    return this.notAvailable();
    
    return this.prisma.educational.update({
      where: { id },
      data: updateEducationalDto,
    });
  }

  async remove(id: number) {

    return this.notAvailable();
    
    return this.prisma.educational.delete({
      where: { id },
    });
  }

  notAvailable(){
   throw new ServiceUnavailableException()
  }

}
