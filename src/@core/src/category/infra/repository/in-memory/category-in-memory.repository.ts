import { Category, CategoryRepository } from "#category/domain";
import { InMemorySearchableRepository } from "#seedwork/domain";
import { SortDirection } from "#seedwork/domain/repository/repository-contracts";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["created_at", "name"];

  protected async applyFilter(
    items: Category[],
    filter: string
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((category) =>
      category.props.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Category[]> {
    let sortField = sort;
    if (!sortField) {
      sortField = "created_at";
    }
    return super.applySort(items, sortField, sort_dir);
  }
}
