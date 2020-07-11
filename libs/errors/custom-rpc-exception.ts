import { RpcException } from '@nestjs/microservices';

interface IException {
  statusCode: number;
  error: string;
  message?: string;
}

export class CustomRpcException extends RpcException {
  constructor(exception: IException) {
    super(exception);
  }
}

export class BadRequest extends CustomRpcException {
  constructor(message?: string) {
    super({
      statusCode: 400,
      error: 'Bad Request',
      ...(message && { message }),
    });
  }
}

export class Unauthorized extends CustomRpcException {
  constructor(message?: string) {
    super({
      statusCode: 401,
      error: 'Unauthorized',
      ...(message && { message }),
    });
  }
}

export class Forbidden extends CustomRpcException {
  constructor(message?: string) {
    super({
      statusCode: 403,
      error: 'Forbidden',
      ...(message && { message }),
    });
  }
}

export class NotFound extends CustomRpcException {
  constructor(message?: string) {
    super({
      statusCode: 404,
      error: 'Not Found',
      ...(message && { message }),
    });
  }
}

export class UnprocessableEntity extends CustomRpcException {
  constructor(message?: string) {
    super({
      statusCode: 422,
      error: 'Unprocessable Entity',
      ...(message && { message }),
    });
  }
}
