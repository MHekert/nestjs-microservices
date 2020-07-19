import { Injectable } from '@nestjs/common';
import { Resource } from './entities/resource.entity';
import { ResourceRepository } from './repositories/resource.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: ResourceRepository,
  ) {}

  insertResource(data: any) {
    return this.resourceRepository.insertResource(data);
  }
}
