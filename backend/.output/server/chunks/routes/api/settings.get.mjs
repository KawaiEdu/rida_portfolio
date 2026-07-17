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

const settings_get = defineEventHandler((event) => {
  const db = useDb();
  const rows = db.prepare("SELECT key, value FROM settings").all();
  const settingsObj = {};
  for (const row of rows) {
    settingsObj[row.key] = row.value;
  }
  return settingsObj;
});

export { settings_get as default };
//# sourceMappingURL=settings.get.mjs.map
