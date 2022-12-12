import { InvalidUuidError } from '@fc/micro-videos/@seedwork/domain';

import { UUIDPipe } from '../uuid.pipe';

describe('UUID Pipe', () => {
  const uuidPipe = UUIDPipe();

  it('should be defined', () => {
    expect(uuidPipe).toBeDefined();
  });

  it('should have the correct uuid version', () => {
    expect(uuidPipe['version']).toBe('4');
  });

  it('should throw a correct error', () => {
    expect(() => uuidPipe['exceptionFactory'](null)).toThrow(
      new InvalidUuidError(),
    );
  });
});
