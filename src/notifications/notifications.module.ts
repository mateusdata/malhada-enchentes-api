import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Esp32Auth } from '../middleware/esp32-auth.middleware'; 
import { WaterLevelModule } from 'src/water-level/water-level.module';

@Module({
  imports : [WaterLevelModule], 
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Esp32Auth)
      .forRoutes(
        { path: 'notifications', method: RequestMethod.POST },   
        { path: 'notifications', method: RequestMethod.DELETE } 
      );
  }
}