import { UUID } from "../../utils/uuid/uuid";

import InvalidUuidError from "../../errors/invalid-uuid.error";

import UniqueEntityId from "../unique-entity-id.vo";

describe("UniqueEntityId Unit Tests", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "9366b7dc-2d71-4799-b91c-c64adb205104";
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const vo = new UniqueEntityId();
    expect(UUID.validate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
