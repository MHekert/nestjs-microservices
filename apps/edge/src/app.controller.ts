import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { RpcToHttpExceptionFilter } from './rpc-to-http-exception.filter';
import { LoggingInterceptor } from '../../../libs/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@UseFilters(new RpcToHttpExceptionFilter())
@Controller('/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/signup')
  signUp(@Body() dto: any): Observable<any> {
    return this.appService.signUp(dto);
  }

  @Post('/verify')
  verifyUser(@Body() dto: any): Observable<any> {
    return this.appService.verifyUser(dto);
  }

  @Post('/login')
  getUser(@Body() dto: any): Observable<any> {
    return this.appService.login(dto);
  }

  @Post('/reset-password')
  resetPassword(@Body() dto: any): Observable<any> {
    return this.appService.resetPassword(dto);
  }

  @Post('/change-password')
  changePassword(@Body() dto: any): Observable<any> {
    return this.appService.changePassword(dto);
  }
}
