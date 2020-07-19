import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ResourceService {
  constructor(@Inject('RESOURCE') private client: ClientProxy) {}

  insert(dto: any): Observable<any> {
    return this.client.send({ cmd: 'INSERT' }, dto);
  }
}
