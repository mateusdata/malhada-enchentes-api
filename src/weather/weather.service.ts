import { Inject, Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class WeatherService {

 
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}


  private readonly cities = [
    { name: 'Malhada (BA)', query: 'Malhada,BR' },
    { name: 'Delfinópolis (MG)', query: 'Delfinopolis,BR' },
    { name: 'Manga (MG)', query: 'Manga,BR' },
    { name: 'Januária (MG)', query: 'Januaria,BR' },
    { name: 'Pirapora (MG)', query: 'Pirapora,BR' },
    { name: 'Três Marias (MG)', query: 'Tres+Marias,BR' },
    { name: 'São Francisco (MG)', query: 'Sao+Francisco,BR' },
  ];

  create(createWeatherDto: CreateWeatherDto) {
    return 'This action adds a new weather';
  }

  async findAll() {
    const APPID = process.env.APPID;
    const results:any  = [];
  
    for (const city of this.cities) {
      const cacheKey = `weather_${city.query}`;
      const cachedData = await this.cacheManager.get(cacheKey);
  
      if (cachedData) {
        console.log(`Retornando dados do cache para ${city.name}`);
        results.push( cachedData );
        continue;
      }
  
      try {
        const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.query}&cnt=40&appid=${APPID}&units=metric&lang=pt_br`;
        const response = await fetch(baseUrl);
  
        if (!response.ok) {
          throw new Error(`Error fetching data for ${city.name}: ${response.statusText}`);
        }
  
        const data = await response.json();
        await this.cacheManager.set(cacheKey, data);
  
        results.push(data);
      } catch (error) {
        console.error(`Error fetching data for ${city.name}:`, error);
  
        results.push({ city: city.name, error: 'Failed to fetch data' });
      }
    }
  
    return results;
  }
  

  async findOne(id: number) {
  
    const cacheKey = 'teste';

    const cachedData = await this.cacheManager.get(cacheKey);
    console.log('cachedData', cachedData);  
    if (cachedData) { 
      console.log('Retornando dados do cache'); 
      return cachedData;
    } 

    const APPID = process.env.APPID;
    try {
      const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Manaus,BR&cnt=40&appid=${APPID}&units=metric&lang=pt_br`
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      await this.cacheManager.set(cacheKey, data);
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
