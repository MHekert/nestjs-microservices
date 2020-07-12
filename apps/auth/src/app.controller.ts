import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { SignUpEventDto } from './dto/sign-up-event.dto';

@UsePipes(new ValidationPipe(validationPipeConfig))
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

    return plainToClass(UserResponseDto, user);
  }

  @MessagePattern({ cmd: 'LOGIN' })
  async login(@Payload() data: LoginDto): Promise<TokenResponseDto> {
    const token = await this.appService.login(data);

    return plainToClass(TokenResponseDto, { token });
  }
}
