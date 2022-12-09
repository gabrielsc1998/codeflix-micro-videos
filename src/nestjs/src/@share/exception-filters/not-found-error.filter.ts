import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { NotFoundError } from '@fc/micro-videos/@seedwork/domain';

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.NOT_FOUND;

    response.status(status).json({
      statusCode: status,
      error: 'Not Found',
      message: exception.message,
    });
  }
}
