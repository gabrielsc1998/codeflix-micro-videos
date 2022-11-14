import { CreateCategoryUseCase } from "../../create-category.use-case";
import { CategorySequelize } from "../../../../infra/db/sequelize/category-sequelize";
import { setupSequelize } from "../../../../../@seedwork/infra/testing/helpers/db";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe("CreateCategoryUseCase Integration Tests", () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  describe("should create a category", () => {
    const arrange = [
      {
        inputProps: { name: "test" },
        outputProps: {
          name: "test",
          description: null,
          is_active: true,
        },
      },
      {
        inputProps: { name: "test", description: "some description" },
        outputProps: {
          name: "test",
          description: "some description",
          is_active: true,
        },
      },
      {
        inputProps: {
          name: "test",
          description: "some description",
          is_active: true,
        },
        outputProps: {
          name: "test",
          description: "some description",
          is_active: true,
        },
      },
      {
        inputProps: {
          name: "test",
          description: "some description",
          is_active: false,
        },
        outputProps: {
          name: "test",
          description: "some description",
          is_active: false,
        },
      },
    ];

    test.each(arrange)(
      "input $inputProps, output $outputProps",
      async ({ inputProps, outputProps }) => {
        let output = await useCase.execute(inputProps);
        let entity = await repository.findById(output.id);
        expect(output.id).toBe(entity.id);
        expect(output.created_at).toStrictEqual(entity.created_at);
        expect(output).toMatchObject(outputProps);
      }
    );
  });
});
