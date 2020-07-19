import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  Body,
  Headers,
} from '@nestjs/common';
import { RpcToHttpExceptionFilter } from '../rpc-to-http-exception.filter';
import { LoggingInterceptor } from '../../../../libs/interceptors/logging.interceptor';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs';

@UseInterceptors(LoggingInterceptor)
@UseFilters(RpcToHttpExceptionFilter)
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post('/insert')
  signUp(
    @Body() dto: any,
    @Headers('authorization') token: string,
  ): Observable<any> {
    return this.resourceService.insert({ ...dto, token });
  }
}
