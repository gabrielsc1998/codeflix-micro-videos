import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication } from '@nestjs/common';

import { NotFoundError } from '@fc/micro-videos/@seedwork/domain';

import { NotFoundErrorFilter } from '../';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new NotFoundError('fake not found error message');
  }
}

describe('NotFoundErrorFilter Unit Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new NotFoundErrorFilter());
    await app.init();
  });

  it('should catch a EntityValidationError', () => {
    return request(app.getHttpServer()).get('/stub').expect(404).expect({
      statusCode: 404,
      error: 'Not Found',
      message: 'fake not found error message',
    });
  });
});
