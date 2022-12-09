import { union } from 'lodash';
import { Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { EntityValidationError } from '@fc/micro-videos/@seedwork/domain';

import { UNPROCESSABLE_ENTITY } from '../errors/errors.http';

@Catch(EntityValidationError)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = UNPROCESSABLE_ENTITY.STATUS;

    response.status(status).json({
      statusCode: status,
      error: UNPROCESSABLE_ENTITY.ERROR,
      message: union(...Object.values(exception.error)),
    });
  }
}
