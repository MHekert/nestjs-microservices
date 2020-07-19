import { ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as Exception from '../errors/custom-rpc-exception';

export const validationPipeConfig: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (_errors: ValidationError[]) => {
    if (process.env.NODE_ENV === 'development')
      console.error(JSON.stringify(_errors, null, 2));
    return new Exception.BadRequest('Validation error');
  },
};
