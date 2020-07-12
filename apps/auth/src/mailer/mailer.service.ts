import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class MailerService {
  constructor(@Inject('MAILER') private client: ClientProxy) {}

  publishSignUp(dto: any): Observable<any> {
    return this.client.emit('SIGN_UP', dto);
  }
}
