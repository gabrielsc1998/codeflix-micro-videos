import { Category } from "../../../domain/entities/category";

import CategoryInMemoryRepository from "./category-in-memory.repository";

describe("CategoryInMemoryRepository", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => (repository = new CategoryInMemoryRepository()));

  describe("Apply Filter Method", () => {
    it("should not apply filter when the filter is null", async () => {
      const items = [new Category({ name: "category" })];
      repository.items = items;

      const spyFilter = jest.spyOn(items as any, "filter");
      const filteredItems = await repository["applyFilter"](items, null);

      expect(spyFilter).not.toBeCalled();
      expect(filteredItems).toStrictEqual(items);
    });

    it("should apply filter", async () => {
      const items = [
        new Category({ name: "category" }),
        new Category({ name: "CaTegory" }),
        new Category({ name: "abc" }),
      ];
      repository.items = items;

      const spyFilter = jest.spyOn(items as any, "filter");
      const filteredItems = await repository["applyFilter"](items, "category");

      expect(spyFilter).toBeCalled();
      expect(filteredItems).toStrictEqual([items[0], items[1]]);
    });
  });

  describe("Apply Sort Method", () => {
    it("should sort by created_at when sort field is null", async () => {
      const createdAt = new Date();
      const items = [
        new Category({
          name: "category",
          created_at: createdAt,
        }),
        new Category({
          name: "category 2",
          created_at: new Date(createdAt.getTime() + 100),
        }),
      ];
      repository.items = items;

      let sorteredItems = await repository["applySort"](items, null, "asc");
      expect(sorteredItems).toStrictEqual(items);

      sorteredItems = await repository["applySort"](items, null, "desc");
      expect(sorteredItems).toStrictEqual([items[1], items[0]]);
    });

    it("should sort by name", async () => {
      const items = [
        new Category({ name: "a" }),
        new Category({ name: "b" }),
        new Category({ name: "c" }),
      ];
      repository.items = items;

      repository.items = items;

      let sorteredItems = await repository["applySort"](items, "name", "asc");
      expect(sorteredItems).toStrictEqual(items);

      sorteredItems = await repository["applySort"](items, "name", "desc");
      expect(sorteredItems).toStrictEqual([items[2], items[1], items[0]]);
    });
  });
});
