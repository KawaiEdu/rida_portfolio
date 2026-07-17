import { c as defineEventHandler, f as useDb } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler((event) => {
  checkAdmin(event);
  const db = useDb();
  const rows = db.prepare("SELECT * FROM contact_messages ORDER BY id DESC").all();
  return rows;
});

export { index_get as default };
//# sourceMappingURL=index2.get.mjs.map
