import {
  CastMemberRules,
  CastMemberValidator,
  CastMemberValidatorFactory,
} from "../cast-member.validator";

describe("Cast Member Validator Unit Tests", () => {
  let validator: CastMemberValidator;

  beforeEach(() => (validator = CastMemberValidatorFactory.create()));

  test("invalidation cases for name field", () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { name: null } }).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({ validator, data: { name: "" } }).containsErrorMessages({
      name: ["name should not be empty"],
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect({
      validator,
      data: { name: "t".repeat(256) },
    }).containsErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  test("invalidation cases for created_at field", () => {
    expect({ validator, data: { created_at: "123" } }).containsErrorMessages({
      created_at: ["created_at must be a Date instance"],
    });

    expect({ validator, data: { created_at: 0 } }).containsErrorMessages({
      created_at: ["created_at must be a Date instance"],
    });

    expect({ validator, data: { created_at: {} } }).containsErrorMessages({
      created_at: ["created_at must be a Date instance"],
    });

    expect({ validator, data: { created_at: [] } }).containsErrorMessages({
      created_at: ["created_at must be a Date instance"],
    });

    expect({ validator, data: { created_at: true } }).containsErrorMessages({
      created_at: ["created_at must be a Date instance"],
    });

    expect({ validator, data: { created_at: () => {} } }).containsErrorMessages(
      {
        created_at: ["created_at must be a Date instance"],
      }
    );
  });

  test("valid cases for fields", () => {
    const arrange = [
      { name: "some value" },
      {
        name: "some value",
        created_at: undefined,
      },
      { name: "some value", created_at: null },
      { name: "some value", created_at: new Date() },
    ] as any;

    arrange.forEach((item: any) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CastMemberRules(item));
    });
  });
});
