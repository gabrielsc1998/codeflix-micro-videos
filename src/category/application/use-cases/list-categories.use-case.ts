import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../@seedwork/application/dto/output/pagination/pagination-output";
import UseCase from "../../../@seedwork/application/use-case";
import { SearchInputDto } from "../../../@seedwork/application/dto/input/search/search-input";

import { CategoryRepository } from "../../domain/repository/category.repository";

import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    const items = searchResult.items.map((i) => {
      return CategoryOutputMapper.toOutput(i);
    });
    const pagination = PaginationOutputMapper.toOutput(searchResult);
    return {
      items,
      ...pagination,
    };
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
