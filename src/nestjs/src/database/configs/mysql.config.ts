import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { CONFIG_SCHEMA_TYPE } from '../../config/config.module';

export default (
  config: ConfigService<CONFIG_SCHEMA_TYPE>,
  models: any[],
): SequelizeModuleOptions => ({
  dialect: 'mysql',
  host: config.get('DB_HOST'),
  database: config.get('DB_DATABASE'),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  port: config.get('DB_PORT'),
  models,
  autoLoadModels: config.get('DB_AUTO_LOAD_MODELS'),
  logging: config.get('DB_LOGGING') === 'true',
});
