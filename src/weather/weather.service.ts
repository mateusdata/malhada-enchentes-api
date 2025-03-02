import { Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { createCache } from 'cache-manager';

@Injectable()
export class WeatherService {

  private readonly cache =  createCache({
    ttl: 10000, 
    refreshThreshold: 500,
    cacheId: 'weather',
  });


  create(createWeatherDto: CreateWeatherDto) {
    return 'This action adds a new weather';
  }

  findAll() {
    return `This action returns all weather`;
  }

  async findOne(id: number) {
  

    const cacheKey = 'teste';

    const cachedData = await this.cache.get(cacheKey);
    console.log('cachedData', cachedData);  
    if (cachedData) { 
      console.log('Retornando dados do cache'); 
    
      return cachedData;
    } 

    const APPID = process.env.APPID;
    try {
      const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Malhada,BR&cnt=16&appid=${APPID}&units=metric&lang=pt_br`
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      await this.cache.set(cacheKey, data);
      console.log('cachedData', cachedData);  

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  update(id: number, updateWeatherDto: UpdateWeatherDto) {
    return `This action updates a #${id} weather`;
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}
