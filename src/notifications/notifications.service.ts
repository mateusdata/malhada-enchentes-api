import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import axios from 'axios';

@Injectable()
export class NotificationsService {



  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll() {

    const data = {
      "to": "ExponentPushToken[RGUfRHOI_pUPkYnQtqMCn7]",
      "sound": "default",
      "title": "Cheguei",
      "body": "Estou chegadno em casa",
      "priority": "normal",
      "data": {
        "someData": "Olá Mateus, tudo bem? Verifique sua segurança digital."
      },
      "interruptionLevel": "critical"
    }
    
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json());
   

    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
