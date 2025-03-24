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
        throw new Error('Failed to fetch weather data');
        //results.push({ city: city.name, error: 'Failed to fetch data' });
      }
    }
  
    return results;
  }
  

  async findOne(city: number) {
  
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

  async getRainVolume() {
    const weatherData = await this.findAll(); // Busca os dados completos
  
    const cityVolumes = weatherData.map((data) => {
      if (!data || !data.list) {
        return {
          name: data?.city?.name || 'Cidade desconhecida',
          volume_1_day: 'Erro ao calcular',
          volume_5_days: 'Erro ao calcular'
        };
      }
  
      const forecastList = data.list;
  
      // Calcula o volume total de chuvas para 5 dias (todos os 40 intervalos)
      const totalRainVolume5Days = forecastList.reduce((total, item) => {
        const rain = item.rain ? item.rain['3h'] || 0 : 0;
        return total + rain;
      }, 0);
  
      // Calcula o volume total de chuvas para 1 dia (primeiros 8 intervalos)
      const totalRainVolume1Day = forecastList.slice(0, 8).reduce((total, item) => {
        const rain = item.rain ? item.rain['3h'] || 0 : 0;
        return total + rain;
      }, 0);
  
      return {
        name: data.city.name,
        volume_1_day: totalRainVolume1Day.toFixed(2), // Volume de 1 dia
        volume_5_days: totalRainVolume5Days.toFixed(2) // Volume de 5 dias
      };
    });
  
    return cityVolumes;
  }

}
