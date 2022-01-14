import jwt from "jsonwebtoken";
import config from "../config";

const { JWT_SECRET_KEY } = config;

export default function isAuthenticated() {
  return async (ctx, next) => {
    const token = ctx.body?.token || ctx.params?.token || ctx.headers.authorization;
    if (!token) {
      ctx.unauthorized({ errors: ["Token is not provided"] });
      return;
    }
    try {
      ctx.user = jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
      ctx.unauthorized({ errors: ["Invalid Token"] });
      return;
    }
    next();
  };
}
