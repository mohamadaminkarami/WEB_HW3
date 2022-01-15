import jwt from "jsonwebtoken";
import config from "../config";

const { JWT_SECRET_KEY, TOKEN_EXPIRATION_TIME } = config;
export default function createJwtToken(user) {
  return jwt.sign({ userId: user.id, isSuperuser: user.isSuperuser }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRATION_TIME });
}
