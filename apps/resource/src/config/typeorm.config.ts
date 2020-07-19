import { ConfigService } from '@nestjs/config';
import { Resource } from '../entities/resource.entity';

export const typeOrmConfigFactory = (configService: ConfigService) => ({
  type: 'mongodb' as const,
  url: configService.get('MONGO_URL'),
  entities: [Resource],
});
