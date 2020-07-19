import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { HealthModule } from './health/health.module';
import { LoggerModule } from '../../../libs/logger/src';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ResourceController } from './resource/resource.controller';
import { ResourceService } from './resource/resource.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: { port: parseInt(process.env['AUTH_PORT']) },
      },
    ]),
    ClientsModule.register([
      {
        name: 'RESOURCE',
        transport: Transport.TCP,
        options: { port: parseInt(process.env['RESOURCE_PORT']) },
      },
    ]),
    HealthModule,
    LoggerModule,
  ],
  controllers: [AuthController, ResourceController],
  providers: [ConfigService, AuthService, ResourceService],
})
export class AppModule {}
