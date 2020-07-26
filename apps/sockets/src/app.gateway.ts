import { UseGuards, Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthGuard } from '../socket-auth.guard';
import { SocketProvider } from './socket.provider';

@Injectable()
@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
  constructor(private socketProvider: SocketProvider) {}
  @WebSocketServer()
  readonly server: Server;

  afterInit(server: Server) {
    console.log('after init');
    this.socketProvider.socket = server;
  }

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('join')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): { status: string } {
    client.join('authorized');

    return { status: 'success' };
  }
}
