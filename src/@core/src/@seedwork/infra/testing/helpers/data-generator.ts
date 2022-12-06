import chance from "chance";

export class DataGenerator {
  private static readonly lib = chance();

  static uuid(): string {
    return DataGenerator.lib.guid({ version: 4 });
  }

  static word(options?: { length?: number }): string {
    return DataGenerator.lib.word(
      typeof options?.length === "number" && { length: options.length }
    );
  }

  static text(): string {
    return DataGenerator.lib.paragraph();
  }

  static date(): Date {
    return DataGenerator.lib.date();
  }
}
