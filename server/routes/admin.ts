import { RequestHandler } from "express";
import { signToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "sharmadivyanshu281";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync("Preksh@2004", 8);

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username and password are required" });

  if (username !== ADMIN_USERNAME) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({ sub: "admin", username });
  res.json({ token, user: { username } });
};
