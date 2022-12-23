import { Sequelize } from "sequelize";

import { migrator } from "./migrator";

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: ":memory:",
  logging: true,
});

migrator(sequelize).runAsCLI();
