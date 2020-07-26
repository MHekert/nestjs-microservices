import {
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { validationPipeConfig } from '../../../libs/config/validation-pipe.config';
import { LoggingInterceptor } from '../../../libs/interceptors/logging.interceptor';
import { InsertResourceDto } from './dto/insert-resource.dto';
import { Resource } from './entities/resource.entity';
import { AuthGuard } from '../../../libs/guards/auth.guard';

@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe(validationPipeConfig))
@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'INSERT' })
  async insert(@Payload() data: InsertResourceDto): Promise<Resource> {
    const resource = await this.appService.insertResource(data);
    this.appService.publish(resource);

    return resource;
  }
}
