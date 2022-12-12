import { HttpStatus } from '@nestjs/common';

import { NotFoundError } from '@fc/micro-videos/@seedwork/domain';
import { Category, CategoryRepository } from '@fc/micro-videos/category/domain';

import { startApp } from '../../src/@share/testing/helpers';
import { BAD_REQUEST } from '../../src/@share/errors/errors.http';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';

describe('CategoriesController - /categories/:id (DELETE) - e2e', () => {
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

  it('should delete a category', async () => {
    const categoryRepo = app.app.get<CategoryRepository.Repository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
    const category: any = Category.fake().aCategory().build();
    await categoryRepo.insert(category);

    await app.client
      .delete(`/categories/${category.id}`)
      .expect(HttpStatus.NO_CONTENT);

    await expect(categoryRepo.findById(category.id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${category.id}`),
    );
  });
});
