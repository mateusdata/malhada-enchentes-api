import { Injectable } from '@nestjs/common';
import { CreateEducationalDto } from './dto/create-educational.dto';
import { UpdateEducationalDto } from './dto/update-educational.dto';

@Injectable()
export class EducationalsService {
  create(createEducationalDto: CreateEducationalDto) {
    return 'This action adds a new educational';
  }

  findAll() {
    return `This action returns all educationals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} educational`;
  }

  update(id: number, updateEducationalDto: UpdateEducationalDto) {
    return `This action updates a #${id} educational`;
  }

  remove(id: number) {
    return `This action removes a #${id} educational`;
  }
}
