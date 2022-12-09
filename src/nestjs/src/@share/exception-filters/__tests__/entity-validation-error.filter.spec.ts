import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication } from '@nestjs/common';

import { EntityValidationError } from '@fc/micro-videos/@seedwork/domain';

import { UNPROCESSABLE_ENTITY } from '../../errors/errors.http';

import { EntityValidationErrorFilter } from '../';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new EntityValidationError({
      field1: ['field1 is required'],
      field2: ['field2 is required'],
    });
  }
}

describe('EntityValidationErrorFilter Unit Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new EntityValidationErrorFilter());
    await app.init();
  });

  it('should catch a EntityValidationError', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(UNPROCESSABLE_ENTITY.STATUS)
      .expect({
        statusCode: UNPROCESSABLE_ENTITY.STATUS,
        error: UNPROCESSABLE_ENTITY.ERROR,
        message: ['field1 is required', 'field2 is required'],
      });
  });
});
