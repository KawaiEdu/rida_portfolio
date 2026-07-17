import { c as defineEventHandler, k as readMultipartFormData, e as createError } from '../../_/nitro.mjs';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { c as checkAdmin } from '../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'bcryptjs';
import 'node:module';
import 'node:url';
import 'jsonwebtoken';

const upload_post = defineEventHandler(async (event) => {
  checkAdmin(event);
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tidak ada file yang diunggah"
    });
  }
  const file = files[0];
  if (!file.filename || !file.type || !file.type.startsWith("image/")) {
    throw createError({
      statusCode: 400,
      statusMessage: "File harus berupa gambar"
    });
  }
  const uploadDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }
  const extension = file.filename.split(".").pop() || "jpg";
  const newFilename = `upload-${Date.now()}.${extension}`;
  const filePath = join(uploadDir, newFilename);
  writeFileSync(filePath, file.data);
  return {
    success: true,
    url: `/uploads/${newFilename}`
  };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
