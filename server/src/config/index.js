import getEnvVariable from "../utils/get-env-variable";

const config = {
  ENVIRONMENT: getEnvVariable("NODE_ENV", "DEVELOPMENT"),
  PORT: getEnvVariable("PORT", 3000),
  DATABASE: {
    NAME: getEnvVariable("DB_NAME", "webhw3"),
    DIALECT: getEnvVariable("DB_DIALECT", "postgres"),
    HOST: getEnvVariable("DB_HOST", "localhost"),
    PORT: getEnvVariable("DB_PORT", "5432"),
    PASSWORD: getEnvVariable("DB_PASSWORD", ""),
    USERNAME: getEnvVariable("DB_USERNAME", "postgres"),
  },
};

export default new Proxy(config, {
  get(target, name) {
    if (target[name] === undefined) {
      throw new Error(`Undefined config "${name}" was used.`);
    }
    return target[name];
  },
});
