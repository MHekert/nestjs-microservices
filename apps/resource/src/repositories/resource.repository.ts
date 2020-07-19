import { EntityRepository, Repository } from 'typeorm';
import { Resource, IResource } from '../entities/resource.entity';

@EntityRepository(Resource)
export class ResourceRepository extends Repository<Resource> {
  async insertResource(resource: IResource): Promise<Resource> {
    return this.create(resource).save();
  }
}
