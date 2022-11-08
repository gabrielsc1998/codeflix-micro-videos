import UniqueEntityId from "../value-objects/unique-entity-id.vo";

type EntityToJson<Props> = Required<{ id: string } & Props>;

export default abstract class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON(): EntityToJson<Props> {
    return {
      id: this.id,
      ...this.props,
    } as EntityToJson<Props>;
  }
}
