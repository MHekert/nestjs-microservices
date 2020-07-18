import { Injectable } from '@nestjs/common';
import { Mailer } from './mailer';
import { SignUpEventDto } from '../../../libs/events/sign-up-event.dto';
import { VerifyUserEventDto } from '../../../libs/events/verify-user-event.dto';
import { PasswordResetEventDto } from '../../../libs/events/password-reset-event.dto';

@Injectable()
export class AppService {
  constructor(private mailer: Mailer) {
    this.mailer = mailer;
  }

  async sendSignUpMail(signUpEventDto: SignUpEventDto) {
    return this.mailer.sendMail({
      to: signUpEventDto.email,
      text: signUpEventDto.verificationCode,
      subject: 'Sign up',
    });
  }

  async sendVerificationConfirmationMail(
    verifyUserEventDto: VerifyUserEventDto,
  ) {
    return this.mailer.sendMail({
      to: verifyUserEventDto.email,
      text: 'E-mail address verified',
      subject: 'Verification confirmation',
    });
  }

  async sendPasswordResetMail(passwordResetEventDto: PasswordResetEventDto) {
    return this.mailer.sendMail({
      to: passwordResetEventDto.email,
      text: passwordResetEventDto.verificationCode,
      subject: 'Password reset',
    });
  }
}
