import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { HealthModule } from './health/health.module';
import { LoggerModule } from '../../../libs/logger/src';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

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
    HealthModule,
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService],
})
export class AppModule {}
