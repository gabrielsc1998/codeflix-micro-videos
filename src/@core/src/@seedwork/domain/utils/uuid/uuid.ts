import { v4 as uuidV4, validate as uuidValidate } from "uuid";

export class UUID {
  static generate(): string {
    return uuidV4();
  }

  static validate(uuid: string): boolean {
    return uuidValidate(uuid);
  }
}
