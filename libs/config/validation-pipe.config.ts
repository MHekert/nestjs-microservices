import { ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as Exception from 'libs/errors/custom-rpc-exception';

export const validationPipeConfig: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (_errors: ValidationError[]) =>
    new Exception.BadRequest('Validation error'),
};
