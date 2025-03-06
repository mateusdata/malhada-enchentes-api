import { Module } from '@nestjs/common';
import { WaterLevelService } from './water-level.service';
import { WaterLevelController } from './water-level.controller';

@Module({
  controllers: [WaterLevelController],
  providers: [WaterLevelService],
})
export class WaterLevelModule {}
