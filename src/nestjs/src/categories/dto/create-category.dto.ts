import { CreateCategoryUseCase } from '@fc/micro-videos/category/application';

import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

import {
  mustBeAString,
  cannotBeEmpty,
  mustBeABoolean,
} from '../../@share/errors/errors.messages';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  @IsString({ message: mustBeAString('Name') })
  @IsNotEmpty({ message: cannotBeEmpty('Name') })
  name: string;

  @IsString({ message: mustBeAString('Description') })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: mustBeABoolean('IsActive') })
  @IsOptional()
  is_active?: boolean;
}
