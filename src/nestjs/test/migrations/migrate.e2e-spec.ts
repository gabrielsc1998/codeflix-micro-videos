import { Umzug } from 'umzug';
import { Sequelize } from 'sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/sequelize';

import { migrator } from '@fc/micro-videos/@seedwork/infra';

import { MigrationModule } from '../../src/database/migration/migration.module';

describe('Migrate (e2e)', () => {
  let umzug: Umzug;
  let moduleBuilder: TestingModule;

  beforeEach(async () => {
    moduleBuilder = await Test.createTestingModule({
      imports: [MigrationModule],
    }).compile();

    const sequelize: Sequelize = moduleBuilder.get(getConnectionToken());

    umzug = migrator(sequelize, { logger: null });
  });

  afterEach(async () => await moduleBuilder.close());

  it('up command', async () => {
    await umzug.down({ to: 0 as any });
    const result = await umzug.up();
    expect(result).toHaveLength(1);
  });

  it('down command', async () => {
    await umzug.up();
    const result = await umzug.down({ to: 0 as any });
    expect(result).toHaveLength(1);
  });
});
