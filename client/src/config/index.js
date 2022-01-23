function getEnvVariable(envName, defaultValue) {
  const envVariable = process.env[envName];
  return envVariable || defaultValue;
}

const config = {
  ENVIRONMENT: getEnvVariable("ENVIRONMENT", "DEVELOPMENT"),
  REACT_APP_BACKEND_URL: getEnvVariable(
    "REACT_APP_BACKEND_URL",
    "http://localhost:8000/server"
  ),
};

export default new Proxy(config, {
  get(target, name) {
    if (target[name] === undefined) {
      throw new Error(`Undefined config "${name}" was used.`);
    }
    return target[name];
  },
});
