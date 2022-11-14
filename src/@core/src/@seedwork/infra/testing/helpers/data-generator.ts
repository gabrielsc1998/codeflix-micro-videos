import chance from "chance";

export class DataGenerator {
  private static readonly lib = chance();

  static uuid(): string {
    return DataGenerator.lib.guid({ version: 4 });
  }

  static word(): string {
    return DataGenerator.lib.word();
  }

  static text(): string {
    return DataGenerator.lib.paragraph();
  }

  static date(): Date {
    return DataGenerator.lib.date();
  }
}
