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
  const { id, title, slug, content, image_url, status } = body;
  if (!title || !slug || !content || !image_url) {
    throw createError({
      statusCode: 400,
      statusMessage: "Semua field wajib diisi"
    });
  }
  const db = useDb();
  if (id) {
    db.prepare("UPDATE blogs SET title = ?, slug = ?, content = ?, image_url = ?, status = ? WHERE id = ?").run(title, slug, content, image_url, status || "draft", id);
    return { success: true, action: "update" };
  } else {
    try {
      const result = db.prepare("INSERT INTO blogs (title, slug, content, image_url, status) VALUES (?, ?, ?, ?, ?)").run(title, slug, content, image_url, status || "draft");
      return { success: true, action: "create", id: result.lastInsertRowId };
    } catch (err) {
      if (err.message && err.message.includes("UNIQUE")) {
        throw createError({
          statusCode: 400,
          statusMessage: "Slug sudah digunakan, pilih slug lain"
        });
      }
      throw err;
    }
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
