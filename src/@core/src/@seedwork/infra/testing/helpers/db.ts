import { configTest } from "#seedwork/infra";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const sequelizeOptions: SequelizeOptions = {
  dialect: configTest.db.vendor,
  host: configTest.db.host,
  logging: configTest.db.logging,
};

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

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
