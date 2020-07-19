import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { PinoAdapter } from './pino-adapter';

@Module({
  providers: [LoggerService, PinoAdapter],
  exports: [LoggerService],
})
export class LoggerModule {}
