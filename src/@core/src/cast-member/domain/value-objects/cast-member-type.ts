import { InvalidParamError, ValueObject } from "#seedwork/domain";

export enum CastMemberTypes {
  director = 1,
  actor,
}

export class CastMemberType extends ValueObject<CastMemberTypes> {
  constructor(private readonly type: CastMemberTypes) {
    CastMemberType.validate(type);
    super(Number(type));
  }

  private static validate(type: CastMemberTypes): void {
    if (!CastMemberTypes[type]) {
      throw new InvalidParamError("cast member type");
    }
  }
}
