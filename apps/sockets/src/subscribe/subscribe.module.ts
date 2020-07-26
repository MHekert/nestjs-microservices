import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../../../../libs/logger/src';
import { SubscribeController } from './subscribe.controller';
import { SocketProvider } from '../socket.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
  ],
  controllers: [SubscribeController],
  providers: [SocketProvider],
  exports: [SocketProvider],
})
export class SubscribeModule {}
