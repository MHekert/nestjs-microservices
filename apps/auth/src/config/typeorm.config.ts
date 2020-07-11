import { ConfigService } from '@nestjs/config';
import { User } from '../user.entity';

export const typeOrmConfigFactory = (configService: ConfigService) => ({
  type: 'postgres' as const,
  host: configService.get('RDS_HOSTNAME'),
  port: parseInt(configService.get('RDS_PORT'), 10),
  username: configService.get('RDS_USERNAME'),
  password: configService.get('RDS_PASSWORD'),
  database: configService.get('RDS_DB_NAME'),
  entities: [User],
  synchronize: ['development', 'test'].includes(configService.get('NODE_ENV')),
});
