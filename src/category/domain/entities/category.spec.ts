import { omit } from "lodash";

import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

import { Category, CategoryProperties, CategoryUpdate } from "./category";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date(); //string
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category["name"] = "other name";
    expect(category.name).toBe("other name");
  });

  test("getter and setter of description prop", () => {
    const changeDescription = (category: Category, data: any): void =>
      (category["description"] = data);

    const inputs = [
      { value: undefined, expected: null },
      { value: null, expected: null },
      { value: "some description", expected: "some description" },
      {
        value: undefined,
        change: (category: Category) =>
          changeDescription(category, "other description"),
        expected: "other description",
      },
      {
        value: "some description",
        change: (category: Category) => changeDescription(category, undefined),
        expected: null,
      },
      {
        value: "some description",
        change: (category: Category) => changeDescription(category, null),
        expected: null,
      },
    ] as Array<any>;

    inputs.forEach(({ value, change, expected }) => {
      let category = new Category({
        name: "Movie",
        description: value,
      });

      if (change) {
        change(category);
      }

      expect(category.description).toBe(expected);
    });
  });

  test("getter and setter of is_active prop", () => {
    const inputs = [
      { value: undefined, expected: true },
      { value: null, expected: true },
      { value: true, expected: true },
      { value: false, expected: false },
    ];

    inputs.forEach(({ value, expected }) => {
      const category = new Category({
        name: "Movie",
        is_active: value,
      });
      expect(category.is_active).toBe(expected);
    });
  });

  test("getter of created_at prop", () => {
    let category = new Category({
      name: "Movie",
    });

    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.created_at).toBe(created_at);
  });

  it("should update the category", () => {
    const category = new Category({ name: "Movie" });
    const input: CategoryUpdate = {
      name: "category name",
      description: "some description",
    };
    category.update(input);
    expect(category.name).toBe(input.name);
    expect(category.description).toBe(input.description);
  });

  it("should update the category transforming description to null when it is undefined", () => {
    const category = new Category({ name: "Movie" });
    const input: CategoryUpdate = {
      name: "new name",
      description: undefined,
    };
    category.update(input);
    expect(category.name).toBe(input.name);
    expect(category.description).toBeNull();
  });

  it("should throw an error when update with a invalid name", () => {
    const invalidNames = [undefined, null, 0, ""];

    const category = new Category({ name: "Movie" });

    invalidNames.forEach((invalidName: any) => {
      const input: CategoryUpdate = {
        name: invalidName,
        description: "some description",
      };
      expect(() => category.update(input)).toThrowError(
        new EntityValidationError(null)
      );
    });
  });

  it("should activate the category", () => {
    const category = new Category({ name: "category name" });
    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  it("should deactivate the category", () => {
    const category = new Category({ name: "category name" });
    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });
});
