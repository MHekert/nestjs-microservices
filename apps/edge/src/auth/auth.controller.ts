import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RpcToHttpExceptionFilter } from '../rpc-to-http-exception.filter';
import { LoggingInterceptor } from '../../../../libs/interceptors/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@UseFilters(new RpcToHttpExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() dto: any): Observable<any> {
    return this.authService.signUp(dto);
  }

  @Post('/verify')
  verifyUser(@Body() dto: any): Observable<any> {
    return this.authService.verifyUser(dto);
  }

  @Post('/login')
  getUser(@Body() dto: any): Observable<any> {
    return this.authService.login(dto);
  }

  @Post('/reset-password')
  resetPassword(@Body() dto: any): Observable<any> {
    return this.authService.resetPassword(dto);
  }

  @Post('/change-password')
  changePassword(@Body() dto: any): Observable<any> {
    return this.authService.changePassword(dto);
  }
}
