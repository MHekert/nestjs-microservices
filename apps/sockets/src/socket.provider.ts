import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketProvider {
  public socket: Server = null;
}
