import { Injectable, Inject } from '@nestjs/common';
import { Resource, IResource } from './entities/resource.entity';
import { ResourceRepository } from './repositories/resource.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { NewResourceEventDto } from '../../../libs/events/new-resource-event.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: ResourceRepository,

    @Inject('SOCKETS') private client: ClientProxy,
  ) {}

  insertResource(data: IResource) {
    return this.resourceRepository.insertResource(data);
  }

  publish(data: NewResourceEventDto) {
    return this.client.emit('NEW_RESOURCE', data);
  }
}
