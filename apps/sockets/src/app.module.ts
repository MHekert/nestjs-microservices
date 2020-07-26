import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { SubscribeModule } from './subscribe/subscribe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SubscribeModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
