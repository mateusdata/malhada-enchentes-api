import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports:[CacheModule.register({
    ttl: 360000, // seconds 
  })],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
