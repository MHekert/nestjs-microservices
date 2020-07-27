import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = parseInt(process.env['SOCKETS_PORT']);

  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  const microservice = app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: `redis://${process.env.REDIS_SOCKETS_PUBSUB_PORT}:${process.env.REDIS_SOCKETS_PUBSUB_HOST}`,
    },
  });

  await app.startAllMicroservicesAsync();

  app.listen(port, () => {
    console.log(`Socket microservice is listening on port ${port}`);
    console.log(
      `Socket microservices is subscribed to redis on port ${process.env.REDIS_PORT}`,
    );
  });
}
bootstrap();
