import {
  UUID,
  InvalidParamError,
  EntityValidationError,
} from "#seedwork/domain";

import { CastMemberTypes } from "../../value-objects";

import { CastMember, CastMemberProps } from "../cast-member";

describe("Cast Member Unit Tests", () => {
  describe("should return an error when the input is", () => {
    const arrange = [
      {
        input: {
          name: "",
          type: null,
        },
        expected: { name: ["name should not be empty"] },
      },
      {
        input: {
          name: "a".repeat(256),
          type: null,
        },
        expected: {
          name: ["name must be shorter than or equal to 255 characters"],
        },
      },
      {
        input: {
          name: 0,
          type: 3,
          created_at: "2022",
        },
        expected: {
          name: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
          created_at: ["created_at must be a Date instance"],
        },
      },
      {
        input: {
          id: "id",
          name: {},
          type: [],
          created_at: [],
        },
        expected: {
          name: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
          created_at: ["created_at must be a Date instance"],
        },
      },
    ];

    test.each(arrange)("$input", ({ input, expected }) => {
      expect(() => new CastMember(input as any)).toThrowError(
        new EntityValidationError(expected)
      );
    });
  });

  describe("should return an error when the type is", () => {
    const arrange = [null, [], {}, -1, 10.5, "15acbd", 3];

    test.each(arrange)("%j", (type: any) => {
      expect(() => new CastMember({ name: "valid-name", type })).toThrowError(
        new InvalidParamError("cast member type")
      );
    });
  });

  describe("should create a cast member when the input is", () => {
    const created_at = new Date();
    const uuid = UUID.generate();

    const arrange = [
      {
        input: {
          name: "director",
          type: CastMemberTypes.director,
        },
        expected: {
          id: expect.any(String),
          name: "director",
          type: CastMemberTypes.director,
          created_at: expect.any(Date),
        },
      },
      {
        input: {
          name: "actor",
          type: CastMemberTypes.actor.toString(),
          created_at,
        },
        expected: {
          id: expect.any(String),
          name: "actor",
          type: CastMemberTypes.actor,
          created_at,
        },
      },
      {
        input: {
          id: uuid,
          name: "any name",
          type: CastMemberTypes.actor,
          created_at,
        },
        expected: {
          id: uuid,
          name: "any name",
          type: CastMemberTypes.actor,
          created_at,
        },
      },
    ];

    test.each(arrange)("$input", ({ input, expected }) => {
      const castMember = new CastMember(input as CastMemberProps);
      expect(castMember.toJSON()).toStrictEqual(expected);
    });
  });

  describe("should return an error when the update input is", () => {
    const defaultInput = {
      name: "director",
      type: CastMemberTypes.director,
    };
    const arrange = [
      {
        input: {
          name: 0,
          type: defaultInput.type,
        },
        expected: new EntityValidationError({
          name: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        }),
      },
      {
        input: {
          name: defaultInput.name,
          type: -1,
        },
        expected: new InvalidParamError("cast member type"),
      },
      {
        input: {
          name: [],
          type: CastMemberTypes.actor,
        },
        expected: new EntityValidationError({
          name: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        }),
      },
      {
        input: {
          name: defaultInput.name,
          type: "123sa",
        },
        expected: new InvalidParamError("cast member type"),
      },
    ];

    test.each(arrange)("$input", ({ input, expected }) => {
      const castMember = new CastMember(defaultInput);
      expect(() => castMember.update(input as any)).toThrow(expected);
    });
  });

  describe("should update the cast member when the input is", () => {
    const defaultInput = {
      name: "director",
      type: CastMemberTypes.director,
    };
    const arrange = [
      {
        input: {
          name: "new name",
          type: defaultInput.type,
        },
        expected: {
          id: expect.any(String),
          name: "new name",
          type: defaultInput.type,
          created_at: expect.any(Date),
        },
      },
      {
        input: {
          name: defaultInput.name,
          type: CastMemberTypes.actor,
        },
        expected: {
          id: expect.any(String),
          name: defaultInput.name,
          type: CastMemberTypes.actor,
          created_at: expect.any(Date),
        },
      },
      {
        input: {
          name: "new name",
          type: CastMemberTypes.actor,
        },
        expected: {
          id: expect.any(String),
          name: "new name",
          type: CastMemberTypes.actor,
          created_at: expect.any(Date),
        },
      },
      {
        input: {
          name: defaultInput.name,
          type: defaultInput.type,
        },
        expected: {
          id: expect.any(String),
          name: defaultInput.name,
          type: defaultInput.type,
          created_at: expect.any(Date),
        },
      },
    ];

    test.each(arrange)("$input", ({ input, expected }) => {
      const castMember = new CastMember(defaultInput);
      castMember.update(input);
      expect(castMember.toJSON()).toStrictEqual(expected);
    });
  });

  it("should get the data from getters", () => {
    const input = {
      name: "director",
      type: CastMemberTypes.director,
      created_at: new Date(),
    };
    const castMember = new CastMember(input);
    expect(castMember.name).toEqual(input.name);
    expect(castMember.type).toEqual(input.type);
    expect(castMember.created_at).toEqual(input.created_at);
  });
});
