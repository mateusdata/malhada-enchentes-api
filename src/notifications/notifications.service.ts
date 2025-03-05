import { Injectable } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: { level: number }) {
    const level = createNotificationDto.level;
    const levelInMeters = level / 100;
  
    // Obtem todos os usuários do banco
    const users = await this.prisma.user.findMany();
  
    // Mapeia e envia notificações para cada usuário
    const notifications = users.map(async (user) => {
      const data = {
        to: user.deviceToken, // Token do dispositivo do usuário
        sound: "default",
        title: "🌊 Alerta de Enchente",
        body: `O nível do rio está em ${levelInMeters.toFixed(2)} metros. Fique atento!`,
        data: {
          level: levelInMeters.toFixed(2),
          nav: "/",
        },
      };
  
      // Envia a notificação
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
  
      return response; // Retorna a resposta para cada usuário
    });
  
    // Aguarda todas as notificações serem enviadas
    const results = await Promise.all(notifications);
  
    return results; // Retorna os resultados de todas as notificações
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
