import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import { loadConfigTest } from "#seedwork/infra";

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  const configTest = loadConfigTest();
  const sequelizeOptions: SequelizeOptions = {
    dialect: configTest.db.vendor,
    host: configTest.db.host,
    logging: configTest.db.logging,
  };

  beforeAll(
    () =>
      (_sequelize = new Sequelize({
        ...sequelizeOptions,
        ...options,
      }))
  );

  beforeEach(async () => {
    await _sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await _sequelize.close();
  });

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}
