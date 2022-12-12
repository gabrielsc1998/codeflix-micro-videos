import { HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { CategoryRepository } from '@fc/micro-videos/category/domain';

import { startApp } from '../../src/@share/testing/helpers';
import { ListCategoriesFixture } from '../../src/categories/fixtures';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { CategoriesController } from '../../src/categories/categories.controller';

describe('CategoriesController - /categories (GET) - e2e', () => {
  describe('should return categories sorted by created_at when request query is empty', () => {
    let categoryRepo: CategoryRepository.Repository;
    const app = startApp();
    const { entitiesMap, arrange } =
      ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

    beforeEach(async () => {
      categoryRepo = app.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      await categoryRepo.bulkInsert(Object.values(entitiesMap));
    });

    test.each(arrange)(
      'when query params is $send_data',
      async ({ send_data, expected }) => {
        const queryParams = new URLSearchParams(send_data as any).toString();
        return app.client
          .get(`/categories/?${queryParams}`)
          .expect(HttpStatus.OK)
          .expect({
            data: expected.entities.map((e: any) =>
              instanceToPlain(CategoriesController.toOutput(e)),
            ),
            meta: expected.meta,
          });
      },
    );
  });

  describe('should return categories using paginate, filter and sort', () => {
    let categoryRepo: CategoryRepository.Repository;
    const app = startApp();
    const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

    beforeEach(async () => {
      categoryRepo = app.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      await categoryRepo.bulkInsert(Object.values(entitiesMap));
    });

    test.each([arrange[0]])(
      'when query params is $send_data',
      async ({ send_data, expected }) => {
        const queryParams = new URLSearchParams(send_data as any).toString();
        return app.client
          .get(`/categories/?${queryParams}`)
          .expect(HttpStatus.OK)
          .expect({
            data: expected.entities.map((e: any) =>
              instanceToPlain(CategoriesController.toOutput(e)),
            ),
            meta: expected.meta,
          });
      },
    );
  });
});
