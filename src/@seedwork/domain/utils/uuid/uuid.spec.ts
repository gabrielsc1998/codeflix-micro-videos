import { UUID } from "./uuid";

describe("UUID Unit Tests", () => {
  it("should generate and uuid", () => {
    const uuid = UUID.generate();

    expect(typeof uuid).toBe("string");
    expect(uuid).toHaveLength(36);
  });

  it("should return true when the uuid is valid", () => {
    const uuid = UUID.generate();
    const validationResult = UUID.validate(uuid);
    expect(validationResult).toBeTruthy();
  });

  it("should return false when the uuid is invalid", () => {
    const inputs = ["", "123456412", null, undefined, 0];

    inputs.forEach((input) => {
      const validationResult = UUID.validate(input as any);
      expect(validationResult).toBeFalsy();
    });
  });
});
