import { HttpStatus } from '@nestjs/common';

export const UNPROCESSABLE_ENTITY = {
  STATUS: HttpStatus.UNPROCESSABLE_ENTITY,
  ERROR: 'Unprocessable Entity',
};
