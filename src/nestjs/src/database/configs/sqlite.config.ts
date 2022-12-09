import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { CONFIG_SCHEMA_TYPE } from '../../config/config.module';

export default (
  config: ConfigService<CONFIG_SCHEMA_TYPE>,
  models: any[],
): SequelizeModuleOptions => ({
  dialect: 'sqlite',
  host: config.get('DB_HOST'),
  models,
  autoLoadModels: config.get('DB_AUTO_LOAD_MODELS'),
  logging: config.get('DB_LOGGING') === 'true',
});
