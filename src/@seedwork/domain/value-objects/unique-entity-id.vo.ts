import InvalidUuidError from "../../errors/invalid-uuid.error";

import { UUID } from "../utils/uuid/uuid";

import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || UUID.generate());
    this.validate();
  }

  private validate(): void {
    const isValid: boolean = UUID.validate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
