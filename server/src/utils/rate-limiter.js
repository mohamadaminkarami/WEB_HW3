const toNumber = (str) => parseInt(str, 10);

export default class RateLimiter {
  constructor({ id, db, max = 2500, duration = 3600000, namespace = "ratelimiter" }) {
    this.db = db;
    this.id = id;
    this.max = max;
    this.duration = duration;
    this.namespace = namespace;
  }

  async get({ id = this.id, max = this.max, duration = this.duration }) {
    const key = `${this.namespace}:${id}`;

    const operations = [
      ["incr", key],
      ["expire", key, duration],
      ["ttl", key],
    ];

    const res = await this.db.multi(operations).exec();
    const count = toNumber(res[0][1]);
    const expireTime = toNumber(res[2][1]);
    return {
      remaining: count < max ? max - count : 0,
      expireTime,
      total: max,
    };
  }
}
