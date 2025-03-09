import { Socket } from 'socket.io';
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { WebsocketsService } from './websockets.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';

@WebSocketGateway()
export class WebsocketsGateway {
  constructor(private readonly websocketsService: WebsocketsService) { }


  async handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
    const level = await this.websocketsService.findAll();
    // Enviando uma mensagem ao cliente assim que ele se conecta
    client.emit('findAllWebsockets', level);
  }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.broadcast.emit("events", data);
    return data;
  }


  @SubscribeMessage('createWebsocket')
  create(@MessageBody() createWebsocketDto: CreateWebsocketDto) {
    return this.websocketsService.create(createWebsocketDto);
  }

  @SubscribeMessage('findAllWebsockets')
  async findAll(client?: Socket | any, data?: string) {
    const level = await this.websocketsService.findAll();
    client?.broadcast.emit("findAllWebsockets", level);

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
