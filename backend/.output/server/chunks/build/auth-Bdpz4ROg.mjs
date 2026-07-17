import { E as executeAsync } from '../_/nitro.mjs';
import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useFetch, a as useRequestHeaders } from './fetch-U6cPHsAe.mjs';
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
import 'vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const { data, error } = ([__temp, __restore] = executeAsync(() => useFetch(
    "/api/auth/me",
    {
      headers: useRequestHeaders(["cookie"])
      // Forward cookies in SSR
    },
    "$3CmYt0hbgG"
    /* nuxt-injected */
  )), __temp = await __temp, __restore(), __temp);
  if (error.value || !data.value?.authenticated) {
    return navigateTo("/admin/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-Bdpz4ROg.mjs.map
