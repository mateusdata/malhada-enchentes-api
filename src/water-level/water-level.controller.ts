import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateWaterLevelDto } from './dto/create-water-level.dto';
import { UpdateWaterLevelDto } from './dto/update-water-level.dto';
import { WaterLevelService } from './water-level.service';

@Controller('water-level')
export class WaterLevelController {
  constructor(private readonly waterLevelService: WaterLevelService) {}

  @Post()
  create(@Body() createWaterLevelDto: CreateWaterLevelDto) {
    return this.waterLevelService.create(createWaterLevelDto);
  }

  @Get()
  findAll() {
    return this.waterLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waterLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaterLevelDto: UpdateWaterLevelDto) {
    return this.waterLevelService.update(+id, updateWaterLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waterLevelService.remove(+id);
  }
}
