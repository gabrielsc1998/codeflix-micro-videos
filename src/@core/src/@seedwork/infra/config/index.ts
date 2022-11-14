import { join } from "path";

import { config as loadEnv } from "dotenv";

const ENV_TEST_FILE = join(__dirname, "../../../../.env.test");

loadEnv({ path: ENV_TEST_FILE });

export const config = {
  db: {
    vendor: process.env.DB_CONNECTION as any,
    host: process.env.DB_HOST,
    logging: process.env.DB_LOGGING === "true",
  },
};
