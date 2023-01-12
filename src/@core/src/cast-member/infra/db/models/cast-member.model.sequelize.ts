import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";

import { CastMemberTypes } from "#cast-member/domain";
import { SequelizeModelFactory } from "#seedwork/infra";

type CastMemberModelProps = {
  id: string;
  name: string;
  type: CastMemberTypes;
  created_at: Date;
};

@Table({ tableName: "cast_members", timestamps: false })
export class CastMemberModel extends Model<CastMemberModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare type: CastMemberTypes;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  static factory() {
    const { DataGenerator } = require("../../../../@seedwork/infra/testing");
    return new SequelizeModelFactory<CastMemberModel, CastMemberModelProps>(
      CastMemberModel,
      () => ({
        id: DataGenerator.uuid(),
        name: DataGenerator.word(),
        type: CastMemberTypes.actor,
        created_at: DataGenerator.date(),
      })
    );
  }
}
