import { c as defineEventHandler, j as getRouterParam, e as createError, f as useDb } from '../../../_/nitro.mjs';
import { c as checkAdmin } from '../../../_/auth.mjs';
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

const _id__delete = defineEventHandler((event) => {
  checkAdmin(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID pesan tidak ditemukan"
    });
  }
  const db = useDb();
  db.prepare("DELETE FROM contact_messages WHERE id = ?").run(id);
  return { success: true };
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
