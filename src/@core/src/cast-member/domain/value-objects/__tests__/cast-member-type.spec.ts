import { InvalidParamError } from "#seedwork/domain";

import { CastMemberType, CastMemberTypes } from "../cast-member-type";

describe("Cast Member Type Unit Tests", () => {
  describe("should return an error when the cast member type input is", () => {
    const arrange = ["", "abcd", 0, 3, -10, null, undefined, [], {}];
    const expectedError = new InvalidParamError("cast member type");

    test.each(arrange)("%j", (input: any) => {
      expect(() => new CastMemberType(input)).toThrowError(expectedError);
    });
  });

  describe("should not return an error when the cast member type input is", () => {
    const arrange = [
      CastMemberTypes.director,
      CastMemberTypes.director.toString(),
      CastMemberTypes.actor,
      CastMemberTypes.actor.toString(),
    ];

    test.each(arrange)("%j", (input: any) => {
      let castMemberType: CastMemberType;
      expect(
        () => (castMemberType = new CastMemberType(input))
      ).not.toThrowError();
      expect(castMemberType.value).toBe(Number(input));
    });
  });
});
