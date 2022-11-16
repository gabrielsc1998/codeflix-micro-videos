import { join } from "path";

import { config as loadEnv } from "dotenv";

const ENV_TEST_FILE = join(__dirname, "../../../../.env.test");

type Config = {
  db: {
    vendor: any;
    host: string;
    logging: boolean;
  };
};

function makeConfig(envFile: string): Config {
  const output = loadEnv({ path: envFile });
  console.log(output);
  return {
    db: {
      vendor: output.parsed.DB_VENDOR as any,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === "true",
    },
  };
}

export const configTest = makeConfig(ENV_TEST_FILE);
