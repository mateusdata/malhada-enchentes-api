import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationalsService } from './educationals.service';
import { CreateEducationalDto } from './dto/create-educational.dto';
import { UpdateEducationalDto } from './dto/update-educational.dto';

@Controller('educationals')
export class EducationalsController {
  constructor(private readonly educationalsService: EducationalsService) {}

  @Post()
  create(@Body() createEducationalDto: CreateEducationalDto) {
    return this.educationalsService.create(createEducationalDto);
  }

  @Get()
  findAll() {
    
    return this.educationalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationalDto: UpdateEducationalDto) {
    return this.educationalsService.update(+id, updateEducationalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalsService.remove(+id);
  }
}
