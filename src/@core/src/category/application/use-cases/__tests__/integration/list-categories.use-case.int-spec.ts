import { setupSequelize } from "#seedwork/infra";
import { CategorySequelize } from "#category/infra";
import { CategoryFakeBuilder } from "#category/domain/entities/category-fake-builder";

import { ListCategoriesUseCase } from "../../list-categories.use-case";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe("ListCategoriesUseCase Integration Tests", () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  it("should return output using empty input with categories ordered by created_at", async () => {
    const names = ["a", "AAA", "AaA", "b", "c"];
    const categories = CategoryFakeBuilder.theCategories(2)
      .withName((index) => `category ${index}`)
      .activate()
      .withDescription("some description")
      .withCreatedAt((index) => new Date(new Date().getTime() + index))
      .build();
    await repository.bulkInsert(categories);

    const output = await useCase.execute({});

    expect(output).toMatchObject({
      items: [...categories].reverse().map((i) => i.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const names = ["a", "AAA", "AaA", "b", "c"];
    const categories = CategoryFakeBuilder.theCategories(5)
      .withName((index) => names[index])
      .build();
    await repository.bulkInsert(categories);

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toMatchObject({
      items: [categories[1], categories[2]].map((i) => i.toJSON()),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toMatchObject({
      items: [categories[0]].map((i) => i.toJSON()),
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "a",
    });
    expect(output).toMatchObject({
      items: [categories[0], categories[2]].map((i) => i.toJSON()),
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
