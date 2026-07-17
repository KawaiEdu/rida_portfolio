import { c as defineEventHandler, j as getRouterParam, e as createError, f as useDb } from '../../../_/nitro.mjs';
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

const _slug__get = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug tidak ditemukan"
    });
  }
  const db = useDb();
  const row = db.prepare("SELECT * FROM blogs WHERE slug = ?").get(slug);
  if (!row) {
    throw createError({
      statusCode: 404,
      statusMessage: "Artikel tidak ditemukan"
    });
  }
  return row;
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
