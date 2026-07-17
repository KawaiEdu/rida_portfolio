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
  const { id, title, description, visual_class, link } = body;
  if (!title || !description || !visual_class || !link) {
    throw createError({
      statusCode: 400,
      statusMessage: "Semua field wajib diisi"
    });
  }
  const db = useDb();
  if (id) {
    db.prepare("UPDATE projects SET title = ?, description = ?, visual_class = ?, link = ? WHERE id = ?").run(title, description, visual_class, link, id);
    return { success: true, action: "update" };
  } else {
    const result = db.prepare("INSERT INTO projects (title, description, visual_class, link) VALUES (?, ?, ?, ?)").run(title, description, visual_class, link);
    return { success: true, action: "create", id: result.lastInsertRowId };
  }
});

export { index_post as default };
//# sourceMappingURL=index3.post.mjs.map
