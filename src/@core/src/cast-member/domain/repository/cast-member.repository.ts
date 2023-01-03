import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "#seedwork/domain";

import { CastMember } from "../entities/cast-member";
import { CastMemberTypes } from "../value-objects";

export namespace CastMemberRepository {
  export type Filter = { name?: string; type?: CastMemberTypes };

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<CastMember, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      CastMember,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
