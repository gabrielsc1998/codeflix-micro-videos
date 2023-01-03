import { CastMember, CastMemberRepository } from "#cast-member/domain";
import { SortDirection, InMemorySearchableRepository } from "#seedwork/domain";

export class CastMemberInMemoryRepository
  extends InMemorySearchableRepository<CastMember, CastMemberRepository.Filter>
  implements CastMemberRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: CastMember[],
    filter: CastMemberRepository.Filter
  ): Promise<CastMember[]> {
    if (!filter) {
      return items;
    }

    if (filter?.name) {
      return items.filter((i) => {
        return i.props.name.toLowerCase().includes(filter.name.toLowerCase());
      });
    }

    if (filter.type) {
      return items.filter((i) => {
        return i.props.type === Number(filter.type);
      });
    }
  }

  protected async applySort(
    items: CastMember[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<CastMember[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}
