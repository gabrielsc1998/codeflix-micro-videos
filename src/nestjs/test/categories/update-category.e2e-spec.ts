import { HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { getConnectionToken } from '@nestjs/sequelize';

import { Category, CategoryRepository } from '@fc/micro-videos/category/domain';

import { startApp } from '../../src/@share/testing/helpers';
import { BAD_REQUEST } from '../../src/@share/errors/errors.http';
import { UpdateCategoryFixture } from '../../src/categories/fixtures';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { CategoriesController } from '../../src/categories/categories.controller';

describe('CategoriesController - /categories/:id (PUT) - e2e', () => {
  const uuid = '9366b7dc-2d71-4799-b91c-c64adb205104';

  describe('should return an error', () => {
    const app = startApp();

    const arrange = [
      {
        description: 'when the category does not exist',
        id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
        expected: {
          message:
            'Entity Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Not Found',
        },
      },
      {
        description: 'when the id is invalid',
        id: 'any-invalid-id',
        expected: {
          statusCode: BAD_REQUEST.STATUS,
          message: 'ID must be a valid UUID',
          error: BAD_REQUEST.ERROR,
        },
      },
    ];

    test.each(arrange)('$description', async ({ id, expected }) => {
      const res = await app.client
        .get(`/categories/${id}`)
        .expect(expected.statusCode);

      expect(res.body).toStrictEqual(expected);
    });
  });
  describe('should a response error with 422 when request body is invalid', () => {
    const app = startApp();
    const invalidRequest = UpdateCategoryFixture.arrangeInvalidRequest();
    const arrange = Object.keys(invalidRequest).map((key) => ({
      label: key,
      value: invalidRequest[key],
    }));
    test.each(arrange)('when body is $label', ({ value }) => {
      return app.client
        .put(`/categories/${uuid}`)
        .send(value.send_data)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(value.expected);
    });
  });

  describe('should a response error with 422 when throw EntityValidationError', () => {
    const app = startApp({ disableGlobalPipes: true });

    const validationError =
      UpdateCategoryFixture.arrangeForEntityValidationError();
    const arrange = Object.keys(validationError).map((key) => ({
      label: key,
      value: validationError[key],
    }));
    let categoryRepo: CategoryRepository.Repository;

    beforeEach(() => {
      categoryRepo = app.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
    });
    test.each(arrange)('when body is $label', async ({ value }) => {
      const category: any = Category.fake().aCategory().build();
      await categoryRepo.insert(category);
      return app.client
        .put(`/categories/${category.id}`)
        .send(value.send_data)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .expect(value.expected);
    });
  });

  describe('should update a category', () => {
    const app = startApp();
    const arrange = UpdateCategoryFixture.arrangeForSave();
    let categoryRepo: CategoryRepository.Repository;

    beforeEach(async () => {
      categoryRepo = app.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const sequelize = app.app.get(getConnectionToken());
      await sequelize.sync({ force: true });
    });

    test.each(arrange)(
      'when body is $send_data',
      async ({ send_data, expected }) => {
        const categoryCreated: any = Category.fake().aCategory().build();
        await categoryRepo.insert(categoryCreated);

        const res = await app.client
          .put(`/categories/${categoryCreated.id}`)
          .send(send_data)
          .expect(200);
        const keyInResponse = UpdateCategoryFixture.keysInResponse();
        expect(Object.keys(res.body)).toStrictEqual(['data']);
        expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);
        const id = res.body.data.id;
        const categoryUpdated: any = await categoryRepo.findById(id);
        const presenter = CategoriesController.toOutput(
          categoryUpdated.toJSON(),
        );
        const serialized = instanceToPlain(presenter);
        expect(res.body.data).toStrictEqual(serialized);
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
