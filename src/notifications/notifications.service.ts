import { get } from './../../node_modules/http2-wrapper/index.d';
import { Injectable } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WaterLevelService } from 'src/water-level/water-level.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly waterLevelService: WaterLevelService) { }

  async create(createNotificationDto: CreateNotificationDto) {

    const level = createNotificationDto.level;
    const levelInMeters = level / 100;
    const getWaterLevel = await this.waterLevelService.findAll();
    console.log(getWaterLevel?.level === levelInMeters);
    if (getWaterLevel?.level === levelInMeters) {
      return { message: "Water level is already at the specified level." };
    }

    const waterLevel = await this.waterLevelService.create({ level: levelInMeters, location: "Malhada Bahia" });


    // Obtem todos os usuários do banco
    const users = await this.prisma.user.findMany();
    let body: string | null;

    if (levelInMeters <= 3) {
      body = `✅ O nível do rio está em ${levelInMeters.toFixed(2)} metros. A situação está normal, mas continue atento!`;
    } else if (levelInMeters > 3 && levelInMeters <= 7) {
      body = `⚠️ O nível do rio está em ${levelInMeters.toFixed(2)} metros. Fique atento!`;
    } else {
      body = `🚨 O nível do rio está em ${levelInMeters.toFixed(2)} metros. Alerta crítico, tome precauções imediatas!`;
    }    
    // Mapeia e envia notificações para cada usuário
    const notifications = users.map(async (user) => {
      const data = {
        to: user.deviceToken, // Token do dispositivo do usuário
        sound: "default",
        title: "🌊 Alerta de Enchente",
        body: body,
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
