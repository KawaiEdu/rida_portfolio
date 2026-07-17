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

const services_get = defineEventHandler(() => {
  const db = useDb();
  const rows = db.prepare("SELECT * FROM services ORDER BY id ASC").all();
  return rows;
});

export { services_get as default };
//# sourceMappingURL=services.get.mjs.map
