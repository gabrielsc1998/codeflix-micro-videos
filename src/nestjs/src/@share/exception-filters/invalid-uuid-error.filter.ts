import { Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { InvalidUuidError } from '@fc/micro-videos/@seedwork/domain';

import { BAD_REQUEST } from '../errors/errors.http';

@Catch(InvalidUuidError)
export class InvalidUUIDErrorFilter implements ExceptionFilter {
  catch(exception: InvalidUuidError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = BAD_REQUEST.STATUS;

    response.status(status).json({
      statusCode: status,
      error: BAD_REQUEST.ERROR,
      message: exception.message,
    });
  }
}
