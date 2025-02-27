import { Injectable } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {

async create(createNotificationDto: { level: number }) {
  const level = createNotificationDto.level;
  const levelInMeters = level / 100;
  const data = {
    "to": "ExponentPushToken[ASg0RAGPuH8n6dtmlKXK6i]",
    "sound": "default",
    "title": "🌊 Alerta de Enchente",
    "body": `O nível do rio está em ${levelInMeters.toFixed(2)} metros. Fique atento!`,
    "data": {
      "level": levelInMeters.toFixed(2),
      "nav": "/teste"
    }
  };

  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  return response;
}

  async findAll() {
   return `This action returns all notifications`;  
  }

  async findOne(id: number) {
   return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
