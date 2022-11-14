import { UUID } from "#seedwork/domain";

import { DataGenerator } from "../data-generator";

describe("Data Generator Integration Test", () => {
  it("should generate an UUID V4", () => {
    const output = DataGenerator.uuid();
    expect(typeof output).toBe("string");
    expect(UUID.validate(output)).toBeTruthy();
  });

  it("should generate a word", () => {
    const output = DataGenerator.word();
    expect(typeof output).toBe("string");
    expect(output.length > 0).toBeTruthy();
  });

  it("should generate a text", () => {
    const output = DataGenerator.text();
    expect(typeof output).toBe("string");
    expect(output.length > 0).toBeTruthy();
  });

  it("should generate a date", () => {
    const output = DataGenerator.date();
    expect(output).toBeInstanceOf(Date);
  });
});
