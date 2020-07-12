import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Payload,
  RmqContext,
  Ctx,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('SIGN_UP')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    // TODO: handle event
    // TODO: ack
  }
}
