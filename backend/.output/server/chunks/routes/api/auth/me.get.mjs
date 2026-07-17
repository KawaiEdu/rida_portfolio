import { c as defineEventHandler, i as getCookie, e as createError } from '../../../_/nitro.mjs';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'path';
import 'node:module';
import 'node:url';

const JWT_SECRET = process.env.JWT_SECRET || "rida-secret-key-default-987654321";
const me_get = defineEventHandler((event) => {
  const token = getCookie(event, "admin_token");
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      authenticated: true,
      user: { id: decoded.id, username: decoded.username }
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Sesi tidak valid"
    });
  }
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
