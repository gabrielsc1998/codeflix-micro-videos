import { HttpStatus } from '@nestjs/common';

export const UNPROCESSABLE_ENTITY = {
  STATUS: HttpStatus.UNPROCESSABLE_ENTITY,
  ERROR: 'Unprocessable Entity',
};

export const BAD_REQUEST = {
  STATUS: HttpStatus.BAD_REQUEST,
  ERROR: 'Bad Request',
};
