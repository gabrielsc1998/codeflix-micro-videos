import {
  LoadEntityError,
  UniqueEntityId,
  EntityValidationError,
} from "#seedwork/domain";
import { CastMember } from "#cast-member/domain";

import { CastMemberModel } from "../models/cast-member.model.sequelize";

export class CastMemberModelMapper {
  static toEntity(model: CastMemberModel) {
    const { id, ...otherData } = model.toJSON();
    try {
      return new CastMember(otherData, new UniqueEntityId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }
      throw e;
    }
  }
}
