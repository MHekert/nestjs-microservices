import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = parseInt(process.env['EDGE_PORT']);

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
  });

  await app.startAllMicroservicesAsync();
  await app.listen(port, () =>
    console.log(`Edge microservice is listening on port ${port}`),
  );
}
bootstrap();
