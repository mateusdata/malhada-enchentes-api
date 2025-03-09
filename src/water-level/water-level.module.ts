import { Module } from '@nestjs/common';
import { WaterLevelService } from './water-level.service';
import { WaterLevelController } from './water-level.controller';
import { WebsocketsModule } from 'src/websockets/websockets.module';

@Module({
  imports: [WebsocketsModule],  
  controllers: [WaterLevelController],
  providers: [WaterLevelService],
  exports: [WaterLevelService],
})
export class WaterLevelModule {}
