import { Injectable } from '@nestjs/common';
import { logInput, errorInput } from './logger.interfaces';
import { PinoAdapter } from './pino-adapter';

@Injectable()
export class LoggerService {
  constructor(private loggerAdapter: PinoAdapter) {}

  info(input: logInput): void {
    this.loggerAdapter.info(input);
  }

  warn(input: logInput): void {
    this.loggerAdapter.warn(input);
  }

  debug(input: logInput): void {
    this.loggerAdapter.debug(input);
  }

  error(error: errorInput): void {
    this.loggerAdapter.error(error);
  }

  log(input: logInput): void {
    this.info(input);
  }
}
