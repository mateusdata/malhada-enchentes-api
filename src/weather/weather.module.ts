import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports:[CacheModule.register({
    ttl: 60 * 60 * 2000 // 2 horas
  })],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
