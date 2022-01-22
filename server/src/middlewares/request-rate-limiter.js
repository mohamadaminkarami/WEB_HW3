import RateLimiter from "../utils/rate-limiter";
import redisClient from "../utils/redis-client";
import config from "../config";
import RESPONSE_CODE from "../utils/response-codes";

const { MAXIMUM_REQUEST_PER_MINUTE } = config;

const MINUTE_IN_SECONDS = 60;
const requestRateLimiter = new RateLimiter({ db: redisClient, max: MAXIMUM_REQUEST_PER_MINUTE, duration: MINUTE_IN_SECONDS, namespace: "requestRateLimiter" });
export default function requestLimiter({ errorMessage }) {
  return async (ctx, next) => {
    const id = ctx.request.ip;
    const { remaining, expireTime } = await requestRateLimiter.get({ id });

    if (remaining > 0) {
      await next();
      return;
    }
    ctx.status = RESPONSE_CODE.TOO_MANY_REQUESTS;
    ctx.body = { errors: [errorMessage || `Rate limit exceeded, retry after ${expireTime} seconds.`] };
  };
}
