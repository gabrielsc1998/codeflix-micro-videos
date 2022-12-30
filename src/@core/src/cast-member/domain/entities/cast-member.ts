import {
  Entity,
  UniqueEntityId,
  EntityValidationError,
} from "#seedwork/domain";

import { CastMemberValidatorFactory } from "../validators";
import { CastMemberType, CastMemberTypes } from "../value-objects";

export type CastMemberProps = {
  name: string;
  type: CastMemberTypes;
  created_at?: Date;
};

export type CastMemberUpdateProps = {
  name: string;
  type: CastMemberTypes;
};

export class CastMemberId extends UniqueEntityId {}

export class CastMember extends Entity<CastMemberProps> {
  private _type: CastMemberType;

  constructor(public readonly props: CastMemberProps, id?: CastMemberId) {
    CastMember.validate(props);
    super(props, id);
    this.type = this.props.type;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  static validate(props: Omit<CastMemberProps, "type">) {
    const validator = CastMemberValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(input: CastMemberUpdateProps): void {
    CastMember.validate(input);
    this.name = input?.name;
    this.type = input?.type;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    CastMember.validate({ name: value });
    this.props.name = value;
  }

  private set type(value: CastMemberTypes) {
    this._type = new CastMemberType(value);
    this.props.type = this._type.value;
  }

  get type(): CastMemberTypes {
    return this._type.value;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
