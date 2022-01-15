import dotenv from "dotenv";

dotenv.config();
export default function getEnvVariable(envName, defaultValue) {
  const envVariable = process.env[envName];
  return envVariable || defaultValue;
}
