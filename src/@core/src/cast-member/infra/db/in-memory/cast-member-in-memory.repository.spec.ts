import { CastMember, CastMemberTypes } from "#cast-member/domain";

import { CastMemberInMemoryRepository } from "./cast-member-in-memory.repository";

describe("CastMemberInMemoryRepository", () => {
  let repository: CastMemberInMemoryRepository;

  beforeEach(() => (repository = new CastMemberInMemoryRepository()));

  it("should no filter items when filter object is null", async () => {
    const items = [
      new CastMember({ name: "test", type: CastMemberTypes.actor }),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, null);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using name like filter parameter", async () => {
    const items = [
      new CastMember({ name: "test", type: CastMemberTypes.actor }),
      new CastMember({ name: "TEST", type: CastMemberTypes.actor }),
      new CastMember({ name: "fake", type: CastMemberTypes.actor }),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, {
      name: "TEST",
    });
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should filter items using type like filter parameter", async () => {
    const items = [
      new CastMember({ name: "test", type: CastMemberTypes.actor }),
      new CastMember({ name: "TEST", type: CastMemberTypes.actor }),
      new CastMember({ name: "fake", type: CastMemberTypes.director }),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    let itemsFiltered = await repository["applyFilter"](items, {
      type: CastMemberTypes.actor,
    });
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const created_at = new Date();
    const items = [
      new CastMember({
        name: "test",
        type: CastMemberTypes.actor,
        created_at: created_at,
      }),
      new CastMember({
        name: "TEST",
        type: CastMemberTypes.actor,
        created_at: new Date(created_at.getTime() + 100),
      }),
      new CastMember({
        name: "fake",
        type: CastMemberTypes.actor,
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    let itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should sort by name", async () => {
    const items = [
      new CastMember({ name: "c", type: CastMemberTypes.actor }),
      new CastMember({ name: "b", type: CastMemberTypes.actor }),
      new CastMember({ name: "a", type: CastMemberTypes.actor }),
    ];

    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
