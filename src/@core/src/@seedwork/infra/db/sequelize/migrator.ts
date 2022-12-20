import { join } from "path";
import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: ":memory:",
  logging: true,
});

const migrator = new Umzug({
  migrations: {
    glob: [
      "*/infra/db/sequelize/migrations/*.{js,ts}",
      {
        cwd: join(__dirname, "../../../.."),
        ignore: ["*.d.ts"],
      },
    ],
  },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

migrator.runAsCLI();
