import supertest from 'supertest';
import { Sequelize } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/sequelize';

import { migrator } from '@fc/micro-videos/@seedwork/infra';

import { AppModule } from '../../app.module';
import { applyGlobalConfig } from '../../global-config';

export type Client = supertest.SuperTest<supertest.Test>;

type Options = {
  disableGlobalPipes?: boolean;
};

export function startApp(options?: Options) {
  let _app: INestApplication;

  beforeEach(async () => {
    const moduleBuilder: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    _app = moduleBuilder.createNestApplication();

    applyGlobalConfig(_app);

    if (options?.disableGlobalPipes) {
      _app['config'].globalPipes = [];
    }

    await dbConfig(_app);

    await _app.init();
  });

  afterEach(async () => {
    if (_app) {
      await _app.close();
    }
  });

  return {
    get app() {
      return _app;
    },
    get client() {
      return supertest.agent(_app.getHttpServer());
    },
  };
}

const dbConfig = async (app: INestApplication) => {
  const canRunMigrations = !app.get(ConfigService).get('DB_AUTO_LOAD_MODELS');

  const sequelize = app.get<Sequelize>(getConnectionToken());

  try {
    if (canRunMigrations) {
      const umzug = migrator(sequelize);
      await sequelize.drop();
      await umzug.up();
    } else {
      await sequelize.sync({ force: true });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
