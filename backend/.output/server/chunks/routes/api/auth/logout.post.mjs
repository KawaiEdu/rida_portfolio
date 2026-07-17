import { c as defineEventHandler, h as deleteCookie } from '../../../_/nitro.mjs';
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

const logout_post = defineEventHandler((event) => {
  deleteCookie(event, "admin_token", { path: "/" });
  return { success: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
