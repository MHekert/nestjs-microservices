import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Payload,
  RmqContext,
  Ctx,
} from '@nestjs/microservices';
import { SignUpEventDto } from '../../../libs/events/sign-up-event.dto';
import { VerifyUserEventDto } from '../../../libs/events/verify-user-event.dto';
import { PasswordResetEventDto } from '../../../libs/events/password-reset-event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('SIGN_UP')
  async getSignUpEvents(
    @Payload() signUpEventDto: SignUpEventDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.appService.sendSignUpMail(signUpEventDto);

    await channel.ack(originalMsg);
  }

  @MessagePattern('VERIFY_USER')
  async getVerifyUserEvents(
    @Payload() verifyUserEventDto: VerifyUserEventDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.appService.sendVerificationConfirmationMail(verifyUserEventDto);

    await channel.ack(originalMsg);
  }

  @MessagePattern('PASSWORD_RESET')
  async getPasswordResetEvents(
    @Payload() passwordResetEventDto: PasswordResetEventDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    await this.appService.sendPasswordResetMail(passwordResetEventDto);

    await channel.ack(originalMsg);
  }
}
