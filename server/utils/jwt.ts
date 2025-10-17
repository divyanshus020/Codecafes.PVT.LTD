import jwt from "jsonwebtoken";

const { JWT_SECRET = "dev-secret", JWT_EXPIRES_IN = "7d" } = process.env;

export interface JwtPayload {
  sub: string;
  username: string;
}

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
