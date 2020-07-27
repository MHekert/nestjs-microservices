import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import { INestApplication } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  private readonly redisAdapter;

  constructor(app: INestApplication) {
    super(app);
    this.redisAdapter = redisIoAdapter({
      host: process.env.REDIS_SOCKETS_STORE_HOST,
      port: parseInt(process.env.REDIS_SOCKETS_STORE_PORT),
    });
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.redisAdapter);

    return server;
  }
}
