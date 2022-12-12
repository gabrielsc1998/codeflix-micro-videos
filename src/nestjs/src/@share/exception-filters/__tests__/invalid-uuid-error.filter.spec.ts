import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication } from '@nestjs/common';

import { InvalidUuidError } from '@fc/micro-videos/@seedwork/domain';

import { BAD_REQUEST } from '../../errors/errors.http';

import { InvalidUUIDErrorFilter } from '..';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new InvalidUuidError();
  }
}

describe('InvalidUUIDErrorFilter Unit Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new InvalidUUIDErrorFilter());
    await app.init();
  });

  it('should return an invalid uuid error', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(BAD_REQUEST.STATUS)
      .expect({
        statusCode: BAD_REQUEST.STATUS,
        error: BAD_REQUEST.ERROR,
        message: 'ID must be a valid UUID',
      });
  });
});
