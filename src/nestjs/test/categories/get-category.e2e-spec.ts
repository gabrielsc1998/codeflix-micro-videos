import { HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { Category, CategoryRepository } from '@fc/micro-videos/category/domain';

import { startApp } from '../../src/@share/testing/helpers';
import { CategoryFixture } from '../../src/categories/fixtures';
import { BAD_REQUEST } from '../../src/@share/errors/errors.http';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { CategoriesController } from '../../src/categories/categories.controller';

describe('CategoriesController - /categories/:id (GET) - e2e', () => {
  const app = startApp();

  describe('should return an error', () => {
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

  it('should return a category ', async () => {
    const categoryRepo = app.app.get<CategoryRepository.Repository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
    const category: any = Category.fake().aCategory().build();
    await categoryRepo.insert(category);

    const res = await app.client
      .get(`/categories/${category.id}`)
      .expect(HttpStatus.OK);

    const keyInResponse = CategoryFixture.keysInResponse();
    expect(Object.keys(res.body)).toStrictEqual(['data']);
    expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

    const presenter = CategoriesController.toOutput(category.toJSON());
    const serialized = instanceToPlain(presenter);
    expect(res.body.data).toStrictEqual(serialized);
  });
});
