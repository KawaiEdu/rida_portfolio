import { c as defineEventHandler, r as readBody, e as createError, f as useDb } from '../../_/nitro.mjs';
import { c as checkAdmin } from '../../_/auth.mjs';
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
import 'jsonwebtoken';

const index_post = defineEventHandler(async (event) => {
  checkAdmin(event);
  const body = await readBody(event);
  const { id, title, type, link, description } = body;
  if (!title || !type) {
    throw createError({
      statusCode: 400,
      statusMessage: "Judul dan Tipe Publikasi wajib diisi"
    });
  }
  const db = useDb();
  if (id) {
    db.prepare("UPDATE publications SET title = ?, type = ?, link = ?, description = ? WHERE id = ?").run(title, type, link || "", description || "", id);
    return { success: true, action: "update" };
  } else {
    const result = db.prepare("INSERT INTO publications (title, type, link, description) VALUES (?, ?, ?, ?)").run(title, type, link || "", description || "");
    return { success: true, action: "create", id: result.lastInsertRowId };
  }
});

export { index_post as default };
//# sourceMappingURL=index4.post.mjs.map
