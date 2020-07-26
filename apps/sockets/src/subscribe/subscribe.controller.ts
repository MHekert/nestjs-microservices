import { Controller, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../../../../libs/interceptors/logging.interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewResourceEventDto } from '../../../../libs/events/new-resource-event.dto';
import { SocketProvider } from '../socket.provider';

@UseInterceptors(LoggingInterceptor)
@Controller('subscribe')
export class SubscribeController {
  constructor(private socketProvider: SocketProvider) {}

  @MessagePattern('NEW_RESOURCE')
  async insert(@Payload() data: NewResourceEventDto): Promise<void> {
    this.socketProvider.socket.sockets.to('authorized').emit('events', data);
  }
}
