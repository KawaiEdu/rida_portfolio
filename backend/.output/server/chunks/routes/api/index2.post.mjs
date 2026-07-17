import { c as defineEventHandler, r as readBody, e as createError, f as useDb } from '../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, institution, topic, message } = body;
  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Nama, Surel, dan Pesan wajib diisi."
    });
  }
  const db = useDb();
  const result = db.prepare("INSERT INTO contact_messages (name, email, institution, topic, message) VALUES (?, ?, ?, ?, ?)").run(name, email, institution || "", topic || "", message);
  return { success: true, id: result.lastInsertRowId };
});

export { index_post as default };
//# sourceMappingURL=index2.post.mjs.map
