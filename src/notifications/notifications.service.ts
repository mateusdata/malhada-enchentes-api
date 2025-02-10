import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll() {


    // Generate a random water level between 0 and 10 meters, rounded to 2 decimal places
    const level = (Math.random() * 10).toFixed(2);
    const data = {
      "to": "ExponentPushToken[ASg0RAGPuH8n6dtmlKXK6i]",
      "sound": "default",
      "title": "🌊 Alerta de Enchente",
      "body": `O nível do rio está em ${level} metros. Fique atento!`,
      "data": {
        "level": level,
        "nav": "/teste"
      }
    };

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json());


    return response;
  }

  async findOne(id: number) {
    const APPID = process.env.APPID;
    try {
      const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Malhada,BR&cnt=16&appid=${APPID}&units=metric&lang=pt_br`
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
