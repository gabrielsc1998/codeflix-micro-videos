import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CategorySequelize } from '@fc/micro-videos/category/infra';

import { CONFIG_SCHEMA_TYPE } from '../config/config.module';

import mysqlConfig from './configs/mysql.config';
import sqliteConfig from './configs/sqlite.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (config: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const models = [CategorySequelize.CategoryModel];
        if (config.get('DB_VENDOR') === 'sqlite') {
          return sqliteConfig(config, models);
        }
        if (config.get('DB_VENDOR') === 'mysql') {
          return mysqlConfig(config, models);
        }
        throw new Error('Unsupported database config');
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
