import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports:[CacheModule.register({
    ttl: 20000,
  })],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
