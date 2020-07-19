import {
  Controller,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignUpDto } from './dto/sign-up.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { validationPipeConfig } from '../../../libs/config/validation-pipe.config';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { MailerService } from './mailer/mailer.service';
import { SignUpEventDto } from '../../../libs/events/sign-up-event.dto';
import { VerifyUserEventDto } from '../../../libs/events/verify-user-event.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordChangeDto } from './dto/password-change.dto';
import { PasswordResetEventDto } from '../../../libs/events/password-reset-event.dto';
import { LoggingInterceptor } from '../../../libs/interceptors/logging.interceptor';

@UsePipes(new ValidationPipe(validationPipeConfig))
@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailerService: MailerService,
  ) {}

  @MessagePattern({ cmd: 'SIGN_UP' })
  async signUp(@Payload() data: SignUpDto): Promise<UserResponseDto> {
    const user = await this.appService.createUser(data);

    this.mailerService.publishSignUp(plainToClass(SignUpEventDto, user));

    return plainToClass(UserResponseDto, user);
  }

  @MessagePattern({ cmd: 'VERIFIY_USER' })
  async verifyUser(@Payload() data: VerifyUserDto): Promise<UserResponseDto> {
    const user = await this.appService.verifyUser(data);

    this.mailerService.publishVerification(
      plainToClass(VerifyUserEventDto, user),
    );

    return plainToClass(UserResponseDto, user);
  }

  @MessagePattern({ cmd: 'LOGIN' })
  async login(@Payload() data: LoginDto): Promise<TokenResponseDto> {
    const token = await this.appService.login(data);

    return plainToClass(TokenResponseDto, { token });
  }

  @MessagePattern({ cmd: 'PASSWORD_RESET' })
  async resetPassword(@Payload() data: PasswordResetDto) {
    const user = await this.appService.resetPassword(data);
    const passwordResetEventDto = plainToClass(PasswordResetEventDto, user);

    await this.mailerService
      .publishPasswordReset(passwordResetEventDto)
      .toPromise();
  }

  @MessagePattern({ cmd: 'PASSWORD_CHANGE' })
  async changePassword(@Payload() data: PasswordChangeDto) {
    const user = await this.appService.changePassword(data);

    return plainToClass(UserResponseDto, user);
  }
}
