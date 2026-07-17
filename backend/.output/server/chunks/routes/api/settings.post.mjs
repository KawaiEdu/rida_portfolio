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

const settings_post = defineEventHandler(async (event) => {
  checkAdmin(event);
  const body = await readBody(event);
  if (!body || typeof body !== "object") {
    throw createError({
      statusCode: 400,
      statusMessage: "Data tidak valid"
    });
  }
  const db = useDb();
  const upsertSetting = db.prepare(`
    INSERT INTO settings (key, value) 
    VALUES (?, ?) 
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  const transaction = db.transaction((settingsObj) => {
    for (const [key, value] of Object.entries(settingsObj)) {
      upsertSetting.run(key, String(value));
    }
  });
  transaction(body);
  return { success: true };
});

export { settings_post as default };
//# sourceMappingURL=settings.post.mjs.map
