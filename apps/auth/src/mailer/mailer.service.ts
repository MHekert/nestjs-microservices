import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { SignUpEventDto } from '../../../../libs/events/sign-up-event.dto';
import { VerifyUserEventDto } from '../../../../libs/events/verify-user-event.dto';
import { PasswordResetDto } from '../dto/password-reset.dto';

@Injectable()
export class MailerService {
  constructor(@Inject('MAILER') private client: ClientProxy) {}

  publishSignUp(dto: SignUpEventDto): Observable<any> {
    return this.client.emit('SIGN_UP', dto);
  }

  publishVerification(dto: VerifyUserEventDto): Observable<any> {
    return this.client.emit('VERIFY_USER', dto);
  }

  publishPasswordReset(dto: PasswordResetDto): Observable<any> {
    return this.client.emit('PASSWORD_RESET', dto);
  }
}
