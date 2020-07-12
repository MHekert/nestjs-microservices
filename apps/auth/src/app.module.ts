import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from './config/typeorm.config';
import { UserRepository } from './user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerService } from './mailer/mailer.service';

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
    TypeOrmModule.forFeature([UserRepository]),
    ClientsModule.register([
      {
        name: 'MAILER',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env['MAILER_HOST']}:${process.env['MAILER_PORT']}`,
          ],
          queue: 'mailer_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, MailerService],
})
export class AppModule {}
