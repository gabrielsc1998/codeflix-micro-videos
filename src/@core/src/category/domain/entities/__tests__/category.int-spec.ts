import { Category } from "../category";

const NAME_ERRORS = {
  EMPTY: "name should not be empty",
  TYPE: "name must be a string",
  LENGTH: "name must be shorter than or equal to 255 characters",
};

const DESCRIPTION_ERRORS = {
  TYPE: "description must be a string",
};

const IS_ACTIVE_ERRORS = {
  TYPE: "is_active must be a boolean value",
};

const CREATED_AT_ERRORS = {
  TYPE: "created_at must be a Date instance",
};

describe("Category Integration Tests", () => {
  describe("When create a category", () => {
    it("should throw error when the name is invalid", () => {
      const arrange = [
        {
          value: "",
          expectedErrorMsg: {
            name: [NAME_ERRORS.EMPTY],
          },
        },
        {
          value: null,
          expectedErrorMsg: {
            name: [NAME_ERRORS.EMPTY, NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: undefined,
          expectedErrorMsg: {
            name: [NAME_ERRORS.EMPTY, NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: 1,
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: true,
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: {},
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: [] as any,
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
      ];

      arrange.forEach(({ value, expectedErrorMsg }) => {
        expect(() => new Category({ name: value })).containsErrorMessages(
          expectedErrorMsg
        );
      });
    });

    it("should throw error when the description is invalid", () => {
      const arrange = [
        {
          value: null,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: undefined,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: 1,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: true,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: {},
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: [] as any,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
      ];

      arrange.forEach(({ value, expectedErrorMsg }) => {
        expect(
          () => new Category({ name: "valid-name", description: value })
        ).containsErrorMessages(expectedErrorMsg);
      });
    });

    it("should throw error when the is_active is invalid", () => {
      const arrange = [
        {
          value: null,
          expectedErrorMsg: {
            is_active: [IS_ACTIVE_ERRORS.TYPE],
          },
        },
        {
          value: undefined,
          expectedErrorMsg: {
            is_active: [IS_ACTIVE_ERRORS.TYPE],
          },
        },
        {
          value: 1,
          expectedErrorMsg: {
            is_active: [IS_ACTIVE_ERRORS.TYPE],
          },
        },
        {
          value: "",
          expectedErrorMsg: {
            is_active: [IS_ACTIVE_ERRORS.TYPE],
          },
        },
        {
          value: {},
          expectedErrorMsg: {
            is_active: [IS_ACTIVE_ERRORS.TYPE],
          },
        },
        {
          value: [] as any,
          expectedErrorMsg: {
            is_active: [IS_ACTIVE_ERRORS.TYPE],
          },
        },
      ];

      arrange.forEach(({ value, expectedErrorMsg }) => {
        expect(
          () => new Category({ name: "valid-name", is_active: value })
        ).containsErrorMessages(expectedErrorMsg);
      });
    });

    it("should throw error when the created_at is invalid", () => {
      const arrange = [
        {
          value: null,
          expectedErrorMsg: {
            created_at: [CREATED_AT_ERRORS.TYPE],
          },
        },
        {
          value: undefined,
          expectedErrorMsg: {
            created_at: [CREATED_AT_ERRORS.TYPE],
          },
        },
        {
          value: 1,
          expectedErrorMsg: {
            created_at: [CREATED_AT_ERRORS.TYPE],
          },
        },
        {
          value: "",
          expectedErrorMsg: {
            created_at: [CREATED_AT_ERRORS.TYPE],
          },
        },
        {
          value: {},
          expectedErrorMsg: {
            created_at: [CREATED_AT_ERRORS.TYPE],
          },
        },
        {
          value: [] as any,
          expectedErrorMsg: {
            created_at: [CREATED_AT_ERRORS.TYPE],
          },
        },
      ];

      arrange.forEach(({ value, expectedErrorMsg }) => {
        expect(
          () => new Category({ name: "valid-name", created_at: value })
        ).containsErrorMessages(expectedErrorMsg);
      });
    });

    it("should create a category successfully", () => {
      const arrange = [
        {
          name: "valid-name",
        },
        {
          name: "valid-name",
          description: "valid-description",
        },
        {
          name: "valid-name",
          description: "valid-description",
          is_active: true,
        },
        {
          name: "valid-name",
          description: "valid-description",
          created_at: new Date(),
        },
        {
          name: "valid-name",
          description: "valid-description",
          is_active: true,
          created_at: new Date(),
        },
      ];

      arrange.forEach((categoryProps) =>
        expect(() => new Category(categoryProps)).not.toThrowError()
      );
    });
  });

  describe("When update a category", () => {
    let category: Category;

    beforeEach(() => (category = new Category({ name: "valid-name" })));

    it("should throw error when the name is invalid", () => {
      const arrange = [
        {
          value: "",
          expectedErrorMsg: {
            name: [NAME_ERRORS.EMPTY],
          },
        },
        {
          value: null,
          expectedErrorMsg: {
            name: [NAME_ERRORS.EMPTY, NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: undefined,
          expectedErrorMsg: {
            name: [NAME_ERRORS.EMPTY, NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: 1,
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: true,
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: {},
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
        {
          value: [] as any,
          expectedErrorMsg: {
            name: [NAME_ERRORS.TYPE, NAME_ERRORS.LENGTH],
          },
        },
      ];

      arrange.forEach(({ value, expectedErrorMsg }) => {
        expect(() =>
          category.update({ name: value, description: category.description })
        ).containsErrorMessages(expectedErrorMsg);
      });
    });

    it("should throw error when the description is invalid", () => {
      const arrange = [
        {
          value: null,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: undefined,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: 1,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: true,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: {},
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
        {
          value: [] as any,
          expectedErrorMsg: {
            description: [DESCRIPTION_ERRORS.TYPE],
          },
        },
      ];

      arrange.forEach(({ value, expectedErrorMsg }) => {
        expect(() =>
          category.update({ name: category.name, description: value })
        ).containsErrorMessages(expectedErrorMsg);
      });
    });

    it("should throw error when all data is invalid", () => {
      expect(() =>
        category.update({ name: "", description: 123 as any })
      ).containsErrorMessages({
        name: [NAME_ERRORS.EMPTY],
        description: [DESCRIPTION_ERRORS.TYPE],
      });
    });

    it("should update a category successfully", () => {
      const arrange = [
        {
          name: "valid-name",
          description: null,
        },
        {
          name: "valid-name",
          description: undefined,
        },
        {
          name: "valid-name",
          description: "valid-description",
        },
      ];

      arrange.forEach((updateData) =>
        expect(() => category.update(updateData)).not.toThrowError()
      );
    });
  });
});
