import Redis from "ioredis";
import config from "../config";

const {
  REDIS: { PORT, HOST },
} = config;

const redisClient = new Redis(PORT, HOST, { enableAutoPipelining: true });
console.log("Connection to redis has been established successfully.");
export default redisClient;
