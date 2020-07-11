import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const excp = this.convert(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(excp.getStatus()).json(excp.getResponse());
  }

  private convert(exception: any): HttpException {
    try {
      const errorObj = {
        error: exception.error || 'Internal server error',
        statusCode: exception.statusCode || 500,
        ...(exception.message && { message: exception.message }),
      };

      return new HttpException(errorObj, errorObj.statusCode);
    } catch (err) {
      return new InternalServerErrorException();
    }
  }
}
