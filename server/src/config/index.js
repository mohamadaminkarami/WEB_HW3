import getEnvVariable from "../utils/get-env-variable";

const config = {
  ENVIRONMENT: getEnvVariable("NODE_ENV", "DEVELOPMENT"),
  PORT: getEnvVariable("PORT", 3030),
  DATABASE: {
    NAME: getEnvVariable("DB_NAME", "webhw3"),
    DIALECT: getEnvVariable("DB_DIALECT", "postgres"),
    HOST: getEnvVariable("DB_HOST", "localhost"),
    PORT: getEnvVariable("DB_PORT", "5432"),
    PASSWORD: getEnvVariable("DB_PASSWORD", ""),
    USERNAME: getEnvVariable("DB_USERNAME", "postgres"),
  },
  REDIS: {
    PORT: getEnvVariable("REDIS_PORT", 6379),
    HOST: getEnvVariable("REDIS_HOST", "localhost"),
  },
  JWT_SECRET_KEY: getEnvVariable("JWT_SECRET_KEY"),
  TOKEN_EXPIRATION_TIME: getEnvVariable("TOKEN_EXPIRATION_TIME", "1d"),
  CACHE_TARGET: getEnvVariable("CACHE_TARGET", "localhost:50051"),
  SSL_ENABLE: getEnvVariable("SSL_ENABLE", "false") === "true", 
  MAXIMUM_REQUEST_PER_MINUTE: parseInt(getEnvVariable("MAXIMUM_REQUEST_PER_MINUTE", 10), 10),
};

export default new Proxy(config, {
  get(target, name) {
    if (target[name] === undefined) {
      throw new Error(`Undefined config "${name}" was used.`);
    }
    return target[name];
  },
});
