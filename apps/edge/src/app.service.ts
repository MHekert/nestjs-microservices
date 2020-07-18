import { Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH') private client: ClientProxy) {}

  signUp(dto: any): Observable<any> {
    return this.client.send({ cmd: 'SIGN_UP' }, dto);
  }

  verifyUser(dto: any): Observable<any> {
    return this.client.send({ cmd: 'VERIFIY_USER' }, dto);
  }

  login(dto: any): Observable<any> {
    return this.client.send({ cmd: 'LOGIN' }, dto);
  }

  resetPassword(dto: any): Observable<any> {
    return this.client.send({ cmd: 'PASSWORD_RESET' }, dto);
  }

  changePassword(dto: any): Observable<any> {
    return this.client.send({ cmd: 'PASSWORD_CHANGE' }, dto);
  }
}
