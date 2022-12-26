export class InvalidParamError extends Error {
  constructor(param?: string) {
    super(`The ${param} is invalid`);
    this.name = "InvalidParamError";
  }
}
