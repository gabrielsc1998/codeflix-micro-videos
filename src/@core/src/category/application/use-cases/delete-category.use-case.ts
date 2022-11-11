import { CategoryRepository } from "../../domain/repository/category.repository";
import { UseCase as BaseUseCase } from "../../../@seedwork/application/use-case";

export namespace DeleteCategoryUseCase {
  export class UseCase implements BaseUseCase<Input, Output> {
    constructor(private readonly repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<void> {
      if (!input) {
        throw new Error("Invalid input");
      }

      const category = await this.repository.findById(input.id);
      await this.repository.delete(category.id);
    }
  }

  type Input = {
    id: string;
  };

  type Output = void;
}
