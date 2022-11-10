import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";

import { Category } from "../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../infra/repository/in-memory/category-in-memory.repository";

import DeleteCategoryUseCase from "../delete-category.use-case";

describe("Delete Category Use Case Unit Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it("should throw error when the input is null", async () => {
    expect(() => useCase.execute(null)).rejects.toThrow(
      new Error(`Invalid input`)
    );
  });

  it("should throw error when the category not exists", async () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a category", async () => {
    const items = [new Category({ name: "Movie" })];
    repository.items = items;

    const spyDelete = jest.spyOn(repository, "delete");
    const spyFindById = jest.spyOn(repository, "findById");

    await useCase.execute({ id: items[0].id });

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(spyFindById).toHaveBeenCalledTimes(1);
  });
});
