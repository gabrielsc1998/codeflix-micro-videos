import { Category } from "#category/domain";
import { CategoryInMemoryRepository } from "#category/infra";
import { NotFoundError } from "#seedwork/domain";
import { DeleteCategoryUseCase } from "../delete-category.use-case";

describe("Delete Category Use Case Unit Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
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

    expect(repository.items).toHaveLength(0);
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(spyFindById).toHaveBeenCalledTimes(1);
  });
});
