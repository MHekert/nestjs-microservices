import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = parseInt(process.env['MAILER_PORT']);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env['MAILER_HOST']}:${port}`],
        queue: 'mailer_queue',
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.listen(() =>
    console.log(
      `Mailer microservice is listening rabbitmq's mailer_queue on port ${port}`,
    ),
  );
}
bootstrap();
