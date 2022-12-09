import supertest from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

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
