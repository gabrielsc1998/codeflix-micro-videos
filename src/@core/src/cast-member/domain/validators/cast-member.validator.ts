import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { ClassValidatorFields } from "#seedwork/domain";

import { CastMemberProps } from "../entities/cast-member";

export class CastMemberRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor(props: Omit<CastMemberProps, "type">) {
    Object.assign(this, props);
  }
}

export class CastMemberValidator extends ClassValidatorFields<CastMemberRules> {
  validate(data: Omit<CastMemberProps, "type">): boolean {
    return super.validate(new CastMemberRules(data ?? ({} as any)));
  }
}

export class CastMemberValidatorFactory {
  static create() {
    return new CastMemberValidator();
  }
}
