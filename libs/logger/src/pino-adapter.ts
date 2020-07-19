import { Injectable } from '@nestjs/common';
import * as pino from 'pino';
import { logInput, errorInput } from './logger.interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PinoAdapter {
  private logger: pino.Logger;

  constructor(private configService: ConfigService) {
    this.logger = pino({
      level: this.configService.get('LOG_LEVEL') || 'debug',
      prettyPrint: {
        colorize: this.configService.get('LOG_COLORIZE') === 'true',
      },
    });
  }

  info(input: logInput): void {
    const { context, message } = input;
    if (!context) {
      this.logger.info(message);
    } else {
      this.logger.info(context, message);
    }
  }

  warn(input: logInput): void {
    const { context, message } = input;
    if (!context) {
      this.logger.warn(message);
    } else {
      this.logger.warn(context, message);
    }
  }

  debug(input: logInput): void {
    const { context, message } = input;
    if (!context) {
      this.logger.debug(message);
    } else {
      this.logger.debug(context, message);
    }
  }

  error(error: errorInput): void {
    this.logger.error(error);
  }
}
