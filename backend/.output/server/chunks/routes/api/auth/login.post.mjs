import { c as defineEventHandler, r as readBody, e as createError, f as useDb, g as setCookie } from '../../../_/nitro.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'path';
import 'node:module';
import 'node:url';

const JWT_SECRET = process.env.JWT_SECRET || "rida-secret-key-default-987654321";
const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username dan password wajib diisi"
    });
  }
  const db = useDb();
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Username atau password salah"
    });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
  setCookie(event, "admin_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    // 7 days
    path: "/"
  });
  return {
    success: true,
    user: { id: user.id, username: user.username }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
