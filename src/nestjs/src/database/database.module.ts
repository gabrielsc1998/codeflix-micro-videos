import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CONFIG_SCHEMA_TYPE } from '../config/config.module';

import { models } from './configs/models';
import mysqlConfig from './configs/mysql.config';
import sqliteConfig from './configs/sqlite.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (config: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const dbVendor = config.get('DB_VENDOR');
        if (dbVendor === 'sqlite') {
          return sqliteConfig(config, models);
        }
        if (dbVendor === 'mysql') {
          return mysqlConfig(config, models);
        }
        throw new Error('Unsupported database config');
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
