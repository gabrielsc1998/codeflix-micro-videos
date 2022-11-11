import {
  Entity,
  UniqueEntityId,
  EntityValidationError,
} from "#seedwork/domain";
import { CategoryValidatorFactory } from "../validators";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryUpdate = {
  name: string;
  description: string;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.is_active = this.props.is_active;
    this.description = this.props.description;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(input: CategoryUpdate): void {
    Category.validate({ ...input });
    this.name = input.name;
    this.description = input.description;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    Category.validate({ name: value });
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
