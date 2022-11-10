import { CategoryRepository } from "../../domain/repository/category.repository";
import UseCase from "../../../@seedwork/application/use-case";

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
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
