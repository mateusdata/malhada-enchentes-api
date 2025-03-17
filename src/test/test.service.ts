import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TestService {

  private readonly logger = new Logger(TestService.name);

  // Executa a tarefa a cada 10 minutos entre 6h e 23h
  @Cron('*/5 6-23 * * *') 
  async handleCron() {
    try {
      this.logger.debug('Executando tarefa para manter o servidor ativo...');
      const response = await fetch('https://docs.github.com/');
      this.logger.debug(`Resposta da API: ${response?.status}`);
    } catch (error) {
      this.logger.error('Erro ao fazer chamada para API externa', error.message);
    }
  }
}
