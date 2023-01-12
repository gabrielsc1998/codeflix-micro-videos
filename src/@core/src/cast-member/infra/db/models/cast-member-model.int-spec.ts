import { DataType } from "sequelize-typescript";

import { setupSequelize } from "#seedwork/infra";

import { CastMemberModel } from "./cast-member.model.sequelize";
import { CastMemberTypes } from "#cast-member/domain";

describe("CastMemberModel Unit Tests", () => {
  setupSequelize({ models: [CastMemberModel] });

  test("mapping props", () => {
    const attributesMap = CastMemberModel.getAttributes();
    const attributes = Object.keys(CastMemberModel.getAttributes());
    expect(attributes).toStrictEqual(["id", "name", "type", "created_at"]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      field: "id",
      fieldName: "id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descriptionAttr = attributesMap.type;
    expect(descriptionAttr).toMatchObject({
      field: "type",
      fieldName: "type",
      allowNull: false,
      type: DataType.INTEGER(),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  test("create", async () => {
    const arrange = {
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "test",
      type: CastMemberTypes.actor,
      created_at: new Date(),
    };
    const CastMember = await CastMemberModel.create(arrange);
    expect(CastMember.toJSON()).toStrictEqual(arrange);
  });
});
