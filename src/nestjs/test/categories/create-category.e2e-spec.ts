import { HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { getConnectionToken } from '@nestjs/sequelize';

import { CategoryRepository } from '@fc/micro-videos/category/domain';

import { startApp } from '../../src/@share/testing/helpers';
import { CreateCategoryFixture } from '../../src/categories/fixtures';
import { UNPROCESSABLE_ENTITY } from '../../src/@share/errors/errors.http';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { CategoriesController } from '../../src/categories/categories.controller';

describe('CategoriesController - /categories (POST) - e2e', () => {
  describe('should a response error with 422 when request body is invalid', () => {
    const app = startApp();
    const invalidRequest = CreateCategoryFixture.arrangeInvalidRequest();
    const arrange = Object.keys(invalidRequest).map((key) => ({
      label: key,
      value: invalidRequest[key],
    }));

    test.each(arrange)('when body is $label', async ({ value }) => {
      const res = await app.client
        .post('/categories')
        .send(value.send_data)
        .expect(UNPROCESSABLE_ENTITY.STATUS);
      expect(res.body).toStrictEqual(value.expected);
    });
  });

  describe('should a response error with 422 when throw EntityValidationError', () => {
    const app = startApp({
      disableGlobalPipes: true,
    });
    const validationError =
      CreateCategoryFixture.arrangeForEntityValidationError();
    const arrange = Object.keys(validationError).map((key) => ({
      label: key,
      value: validationError[key],
    }));
    test.each(arrange)('when body is $label', async ({ value }) => {
      const res = await app.client
        .post('/categories')
        .send(value.send_data)
        .expect(UNPROCESSABLE_ENTITY.STATUS);

      expect(res.body).toStrictEqual(value.expected);
    });
  });

  describe('should create a category', () => {
    const app = startApp();
    const arrange = CreateCategoryFixture.arrangeForSave();
    let categoryRepo: CategoryRepository.Repository;
    beforeEach(async () => {
      const sequelize = app.app.get(getConnectionToken());
      await sequelize.sync({ force: true });
      categoryRepo = app.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
    });

    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const res = await app.client
          .post('/categories')
          .send(send_data)
          .expect(HttpStatus.CREATED);

        const keyInResponse = CreateCategoryFixture.keysInResponse();

        expect(Object.keys(res.body)).toStrictEqual(['data']);
        expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

        const id = res.body.data.id;
        const categoryCreated: any = await categoryRepo.findById(id);
        const presenter = CategoriesController.toOutput(
          categoryCreated.toJSON(),
        );
        const serialized = instanceToPlain(presenter);

        expect(res.body.data).toStrictEqual({
          id: serialized.id,
          created_at: serialized.created_at,
          ...send_data,
          ...expected,
        });
      },
    );
  });
});
