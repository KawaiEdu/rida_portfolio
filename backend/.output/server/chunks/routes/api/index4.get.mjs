import { c as defineEventHandler, f as useDb } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(() => {
  const db = useDb();
  const rows = db.prepare("SELECT * FROM publications ORDER BY id ASC").all();
  return rows;
});

export { index_get as default };
//# sourceMappingURL=index4.get.mjs.map
