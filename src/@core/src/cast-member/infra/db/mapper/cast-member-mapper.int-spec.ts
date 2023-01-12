import { setupSequelize } from "#seedwork/infra";
import { CastMember, CastMemberTypes } from "#cast-member/domain";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";

import { CastMemberModel } from "../models";

import { CastMemberModelMapper } from "./cast-member.mapper";

describe("CastMemberModelMapper Unit Tests", () => {
  setupSequelize({ models: [CastMemberModel] });

  it("should throws error when castMember is invalid", () => {
    const model = CastMemberModel.build({
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
    });
    try {
      CastMemberModelMapper.toEntity(model);
      fail("The castMember is valid, but it needs throws a LoadEntityError");
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest
      .spyOn(CastMember, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = CastMemberModel.build({
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
    });
    expect(() => CastMemberModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should convert a castMember model to a castMember entity", () => {
    const created_at = new Date();
    const model = CastMemberModel.build({
      id: "5490020a-e866-4229-9adc-aa44b83234c4",
      name: "some value",
      type: CastMemberTypes.director,
      created_at,
    });
    const entity = CastMemberModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new CastMember(
        {
          name: "some value",
          type: CastMemberTypes.director,
          created_at,
        },
        new UniqueEntityId("5490020a-e866-4229-9adc-aa44b83234c4")
      ).toJSON()
    );
  });
});
