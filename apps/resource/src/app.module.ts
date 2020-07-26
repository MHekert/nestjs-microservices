import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResourceRepository } from './repositories/resource.repository';
import { typeOrmConfigFactory } from './config/typeorm.config';
import { LoggerModule } from '../../../libs/logger/src';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    TypeOrmModule.forFeature([ResourceRepository]),
    LoggerModule,
    ClientsModule.register([
      {
        name: 'SOCKETS',
        transport: Transport.REDIS,
        options: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
