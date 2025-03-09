import { Socket } from 'socket.io';
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { WebsocketsService } from './websockets.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server } from 'socket.io'; // Importação correta do Server para WebSocket

@WebSocketGateway()
export class WebsocketsGateway {
  constructor(private readonly websocketsService: WebsocketsService) { }

  @WebSocketServer()
  server: Server; // O servidor WebSocket que será usado para emitir mensagens a todos os clientes conectados

  async handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
    const level = await this.websocketsService.findAll();
    // Enviando uma mensagem ao cliente assim que ele se conecta
    client.emit('findAllWebsockets',  level);
  
  }


  @SubscribeMessage('createWebsocket')
  create(@MessageBody() createWebsocketDto: CreateWebsocketDto) {
    return this.websocketsService.create(createWebsocketDto);
  }

  @SubscribeMessage('findAllWebsockets')
  async findAll(@MessageBody() data?: string) {
    console.log('Emitindo para todos os clientes conectados...');
    
    try {
      const level = await this.websocketsService.findAll();
  
      // Aqui emitimos para TODOS os clientes conectados
      this.server.emit('findAllWebsockets', level);
  
      console.log('Mensagem enviada com sucesso para todos os clientes.');
      return level; // Retorna os dados caso necessário
    } catch (error) {
      console.error('Erro ao emitir a mensagem:', error);
      throw new Error('Falha ao enviar a mensagem para os clientes.');
    }
  }
  

  @SubscribeMessage('findOneWebsocket')
  findOne(@MessageBody() id: number) {
    return this.websocketsService.findOne(id);
  }

  @SubscribeMessage('updateWebsocket')
  update(@MessageBody() updateWebsocketDto: UpdateWebsocketDto) {
    return this.websocketsService.update(updateWebsocketDto.id, updateWebsocketDto);
  }

  @SubscribeMessage('removeWebsocket')
  remove(@MessageBody() id: number) {
    return this.websocketsService.remove(id);
  }
}
