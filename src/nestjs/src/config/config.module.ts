import { join } from 'path';
import * as Joi from 'joi';

import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';

import { CONFIG_DB_SCHEMA, DB_SCHEMA_TYPE } from './schemas/db.schema';

export type CONFIG_SCHEMA_TYPE = DB_SCHEMA_TYPE;

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const { envFilePath, ...otherOptions } = options;
    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath : [envFilePath]),
        join(__dirname, `../../envs/.env.${process.env.NODE_ENV}`),
        join(__dirname, '../../envs/.env'),
      ],
      validationSchema: Joi.object({
        ...CONFIG_DB_SCHEMA,
      }),
      ...otherOptions,
    });
  }
}
