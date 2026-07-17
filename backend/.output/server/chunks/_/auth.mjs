import { i as getCookie, e as createError } from './nitro.mjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "rida-secret-key-default-987654321";
function checkAdmin(event) {
  const token = getCookie(event, "admin_token");
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Silakan login terlebih dahulu"
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Sesi kedaluwarsa atau tidak valid"
    });
  }
}

export { checkAdmin as c };
//# sourceMappingURL=auth.mjs.map
