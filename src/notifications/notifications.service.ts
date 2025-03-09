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
    const getWaterLevel: any = await this.waterLevelService.findAll();
    console.log(levelInMeters);

    // console.log(getWaterLevel?.level - levelInMeters)
    // console.log(Math.abs(getWaterLevel?.level - levelInMeters) <= 0.05)
    const hasCondition = true && Math.abs(getWaterLevel?.level - levelInMeters) <= 0.05; // Condição para não enviar alerta
    console.log(hasCondition);  
    if (hasCondition) {
      console.log("The water level difference is less than or equal to 5 centimeters. No alert will be sent.");
      return { message: "The water level difference is less than or equal to 5 centimeters. No alert will be sent." };
    }
    if (levelInMeters < 0.2) {
      return { message: "Water level cannot be less than 1 meter." };
    }

    const waterLevel = await this.waterLevelService.create({ level: levelInMeters, location: "Malhada Bahia" });

    // Obtem todos os usuários do banco
    const users = await this.prisma.user.findMany();
    let body: string | null;
    let title: string | null;

    if (levelInMeters <= 3) {
      body = `✅ O nível do rio está em ${levelInMeters.toFixed(2)} metros acima do normal. A situação está sob controle, mas continue acompanhando as atualizações.`;
      title = "Nível do Rio Estável";
    } else if (levelInMeters > 3 && levelInMeters <= 7) {
      body = `⚠️ O nível do rio subiu para ${levelInMeters.toFixed(2)} metros acima do normal. Permaneça atento e preparado para possíveis mudanças.`;
      title = "Nível do Rio Elevado";
    } else {
      body = `🚨 ALERTA CRÍTICO! O nível do rio atingiu ${levelInMeters.toFixed(2)} metros acima do normal. Tome precauções imediatamente e busque um local seguro!`;
      title = "Perigo de Enchente!";
    }


    // Mapeia e envia notificações para cada usuário
    const notifications = users.map(async (user) => {
      const data = {
        to: user.deviceToken, // Token do dispositivo do usuário
        sound: "default",
        title: title,
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



}
