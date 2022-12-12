import { InvalidUuidError } from '@fc/micro-videos/@seedwork/domain';
import { ParseUUIDPipe, ParseUUIDPipeOptions } from '@nestjs/common';

import { BAD_REQUEST } from '../errors/errors.http';

const CONFIG: ParseUUIDPipeOptions = {
  version: '4',
  errorHttpStatusCode:
    BAD_REQUEST.STATUS as ParseUUIDPipeOptions['errorHttpStatusCode'],
  exceptionFactory: () => {
    throw new InvalidUuidError();
  },
};

export const UUIDPipe = (): ParseUUIDPipe => new ParseUUIDPipe(CONFIG);
