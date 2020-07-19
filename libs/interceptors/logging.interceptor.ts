import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../logger/src';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {
    this.logger = logger;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const message = `${controllerName} - ${handlerName}`;

    this.logger.log({ message });

    return next.handle().pipe(
      catchError(err => {
        this.logger.error(err);
        return throwError(err);
      }),
    );
  }
}
