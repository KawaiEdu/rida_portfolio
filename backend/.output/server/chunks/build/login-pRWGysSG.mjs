import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-wrapper" }, _attrs))} data-v-28176a02><div class="login-background" data-v-28176a02><div class="circle c1" data-v-28176a02></div><div class="circle c2" data-v-28176a02></div></div><div class="login-card" data-v-28176a02><div class="login-header" data-v-28176a02><a href="/" class="back-link" data-v-28176a02>← Halaman Utama</a><h1 class="login-title" data-v-28176a02>ADMIN PANEL</h1><p class="login-subtitle" data-v-28176a02>Masuk untuk mengelola portofolio &amp; blog</p></div><form class="login-form" data-v-28176a02>`);
      if (errorMessage.value) {
        _push(`<div class="alert error" data-v-28176a02><span data-v-28176a02>${ssrInterpolate(errorMessage.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group" data-v-28176a02><label for="username" data-v-28176a02>Username</label><input type="text" id="username"${ssrRenderAttr("value", username.value)} placeholder="Masukkan username" required${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-28176a02></div><div class="form-group" data-v-28176a02><label for="password" data-v-28176a02>Password</label><input type="password" id="password"${ssrRenderAttr("value", password.value)} placeholder="Masukkan password" required${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-28176a02></div><button type="submit" class="btn-login"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-28176a02>`);
      if (loading.value) {
        _push(`<span data-v-28176a02>Menghubungkan...</span>`);
      } else {
        _push(`<span data-v-28176a02>Masuk Sekarang</span>`);
      }
      _push(`</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-28176a02"]]);

export { login as default };
//# sourceMappingURL=login-pRWGysSG.mjs.map
