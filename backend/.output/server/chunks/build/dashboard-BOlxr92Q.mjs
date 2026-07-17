import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("settings");
    const notification = ref({ message: "", type: "" });
    const tabTitle = computed(() => {
      if (activeTab.value === "settings") return "Pengaturan Konten Utama";
      if (activeTab.value === "projects") return "Pengelolaan Proyek Portofolio";
      if (activeTab.value === "blogs") return "Pengelolaan Artikel & Publikasi";
      if (activeTab.value === "publications") return "Pengelolaan Publikasi Ilmiah & Buku";
      return "Kotak Masuk Pesan Korespondensi";
    });
    const settings = ref({
      hero_badge: "",
      hero_title_highlight: "",
      hero_credentials: "",
      hero_description: "",
      profile_image_url: "",
      hero_image_url: "",
      header_logo_url: "",
      hero_seal_image_url: "",
      seal_initials: "",
      seal_line1: "",
      seal_line2: "",
      about_image_url: "",
      about_badge: "",
      about_title: "",
      about_description: "",
      stat_experience_num: "",
      stat_experience_label: "",
      stat_projects_num: "",
      stat_projects_label: "",
      stat_papers_num: "",
      stat_papers_label: "",
      contact_email: "",
      contact_phone: "",
      sinta_id: "",
      scopus_id: "",
      scholar_id: "",
      orcid_id: "",
      citation_text: "",
      contact_title: "",
      contact_subtitle: "",
      contact_affiliations: "",
      contact_linkedin: ""
    });
    const savingSettings = ref(false);
    const projects = ref([]);
    const savingProject = ref(false);
    const projectForm = ref({
      id: null,
      title: "",
      description: "",
      visual_class: "p-visual-1",
      link: "#"
    });
    const blogs = ref([]);
    const savingBlog = ref(false);
    const blogForm = ref({
      id: null,
      title: "",
      slug: "",
      content: "",
      image_url: "/images/blog_1.jpg",
      status: "draft"
    });
    const publications = ref([]);
    const savingPub = ref(false);
    const pubForm = ref({
      id: null,
      title: "",
      type: "Buku",
      link: "",
      description: ""
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const messages = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-wrapper" }, _attrs))} data-v-9a94c648><aside class="sidebar" data-v-9a94c648><div class="sidebar-header" data-v-9a94c648><h2 data-v-9a94c648>PORTFOLIO</h2><span class="user-role" data-v-9a94c648>Administrator</span></div><nav class="sidebar-menu" data-v-9a94c648><button class="${ssrRenderClass(["menu-item", { active: activeTab.value === "settings" }])}" data-v-9a94c648><span class="icon" data-v-9a94c648>⚙️</span> Pengaturan Konten </button><button class="${ssrRenderClass(["menu-item", { active: activeTab.value === "projects" }])}" data-v-9a94c648><span class="icon" data-v-9a94c648>💼</span> Kelola Proyek </button><button class="${ssrRenderClass(["menu-item", { active: activeTab.value === "blogs" }])}" data-v-9a94c648><span class="icon" data-v-9a94c648>✍️</span> Kelola Blog </button><button class="${ssrRenderClass(["menu-item", { active: activeTab.value === "publications" }])}" data-v-9a94c648><span class="icon" data-v-9a94c648>📚</span> Kelola Publikasi </button><button class="${ssrRenderClass(["menu-item", { active: activeTab.value === "inbox" }])}" data-v-9a94c648><span class="icon" data-v-9a94c648>📥</span> Pesan Masuk </button></nav><div class="sidebar-footer" data-v-9a94c648><button class="btn-logout" data-v-9a94c648> Keluar 🚪 </button></div></aside><main class="main-content" data-v-9a94c648><header class="content-header" data-v-9a94c648><div class="header-title" data-v-9a94c648><h1 data-v-9a94c648>${ssrInterpolate(tabTitle.value)}</h1><p data-v-9a94c648>Kelola dan update isi website Anda secara real-time</p></div><div class="header-actions" data-v-9a94c648><a href="/" target="_blank" class="btn-preview" data-v-9a94c648>Pratinjau Website 👁️</a></div></header>`);
      if (notification.value.message) {
        _push(`<div class="${ssrRenderClass(["notification", notification.value.type])}" data-v-9a94c648>${ssrInterpolate(notification.value.message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "settings") {
        _push(`<section class="tab-panel" data-v-9a94c648><div class="card" data-v-9a94c648><h2 data-v-9a94c648>Informasi Utama (Hero Section)</h2><form class="grid-form" data-v-9a94c648><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Headline (Nama)</label><input type="text"${ssrRenderAttr("value", settings.value.hero_title_highlight)} required data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Sub-headline (Gelar/Profesi)</label><input type="text"${ssrRenderAttr("value", settings.value.hero_badge)} required data-v-9a94c648></div><div class="form-group span-4" data-v-9a94c648><label data-v-9a94c648>Pernyataan Fokus / Pengalaman</label><input type="text"${ssrRenderAttr("value", settings.value.hero_credentials)} required data-v-9a94c648></div><div class="form-group span-4" data-v-9a94c648><label data-v-9a94c648>Pengantar Singkat Hero</label><textarea rows="4" required data-v-9a94c648>${ssrInterpolate(settings.value.hero_description)}</textarea></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Inisial Stempel Hero (Contoh: RPS)</label><input type="text"${ssrRenderAttr("value", settings.value.seal_initials)} required data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Kredensial Stempel Baris 1 (Contoh: AK. · CA. · CPA.)</label><input type="text"${ssrRenderAttr("value", settings.value.seal_line1)} required data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Kredensial Stempel Baris 2 (Contoh: CFRA. · CIPSAS. · DR.)</label><input type="text"${ssrRenderAttr("value", settings.value.seal_line2)} required data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Foto Hero (Profil Utama)</label><div class="image-uploader" data-v-9a94c648><img${ssrRenderAttr("src", settings.value.hero_image_url || "/images/rida_profile.jpg")} class="preview-img" alt="Hero Photo" data-v-9a94c648><div class="upload-controls" data-v-9a94c648><input type="file" accept="image/*" id="hero-upload" class="hidden-input" data-v-9a94c648><label for="hero-upload" class="btn-secondary" data-v-9a94c648>Ganti Foto Hero 📁</label><p class="file-info" data-v-9a94c648>Rekomendasi format JPG/PNG.</p></div></div></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Logo Header (Opsional - Menggantikan Teks)</label><div class="image-uploader" data-v-9a94c648>`);
        if (settings.value.header_logo_url) {
          _push(`<img${ssrRenderAttr("src", settings.value.header_logo_url)} class="preview-img" alt="Header Logo" data-v-9a94c648>`);
        } else {
          _push(`<div class="preview-circle-placeholder" data-v-9a94c648>${ssrInterpolate(settings.value.seal_initials || "RPS")}</div>`);
        }
        _push(`<div class="upload-controls" data-v-9a94c648><input type="file" accept="image/*" id="header-logo-upload" class="hidden-input" data-v-9a94c648><label for="header-logo-upload" class="btn-secondary" data-v-9a94c648>Ganti Logo Header 📁</label>`);
        if (settings.value.header_logo_url) {
          _push(`<button type="button" class="btn-danger-sm" data-v-9a94c648>Reset ke Teks</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="file-info" data-v-9a94c648>Format JPG/PNG/WEBP. Jika kosong, inisial di header akan tampil.</p></div></div></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Stempel Hero (Opsional - Menggantikan Stempel Teks)</label><div class="image-uploader" data-v-9a94c648>`);
        if (settings.value.hero_seal_image_url) {
          _push(`<img${ssrRenderAttr("src", settings.value.hero_seal_image_url)} class="preview-img" alt="Hero Seal" data-v-9a94c648>`);
        } else {
          _push(`<div class="preview-circle-placeholder" data-v-9a94c648>${ssrInterpolate(settings.value.seal_initials || "RPS")}</div>`);
        }
        _push(`<div class="upload-controls" data-v-9a94c648><input type="file" accept="image/*" id="hero-seal-upload" class="hidden-input" data-v-9a94c648><label for="hero-seal-upload" class="btn-secondary" data-v-9a94c648>Ganti Stempel Hero 📁</label>`);
        if (settings.value.hero_seal_image_url) {
          _push(`<button type="button" class="btn-danger-sm" data-v-9a94c648>Reset ke Teks</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="file-info" data-v-9a94c648>Format JPG/PNG/WEBP. Jika kosong, stempel/seal text akan tampil.</p></div></div></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Email Kontak</label><input type="email"${ssrRenderAttr("value", settings.value.contact_email)} required data-v-9a94c648><label style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-9a94c648>No. WhatsApp / Telepon</label><input type="text"${ssrRenderAttr("value", settings.value.contact_phone)} required data-v-9a94c648></div><div class="span-4 border-top" data-v-9a94c648><h2 data-v-9a94c648>Profil Eksekutif (Tentang Saya)</h2></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Badge Profil</label><input type="text"${ssrRenderAttr("value", settings.value.about_badge)} required data-v-9a94c648><label style="${ssrRenderStyle({ "margin-top": "1rem" })}" data-v-9a94c648>Judul Profil</label><input type="text"${ssrRenderAttr("value", settings.value.about_title)} required data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Foto Profil Deskripsi</label><div class="image-uploader" data-v-9a94c648><img${ssrRenderAttr("src", settings.value.about_image_url || "/images/rida_profile.jpg")} class="preview-img" alt="About Photo" data-v-9a94c648><div class="upload-controls" data-v-9a94c648><input type="file" accept="image/*" id="about-upload" class="hidden-input" data-v-9a94c648><label for="about-upload" class="btn-secondary" data-v-9a94c648>Ganti Foto Profil 📁</label><p class="file-info" data-v-9a94c648>Rekomendasi format JPG/PNG.</p></div></div></div><div class="form-group span-4" data-v-9a94c648><label data-v-9a94c648>Deskripsi Profil Lengkap</label><textarea rows="4" required data-v-9a94c648>${ssrInterpolate(settings.value.about_description)}</textarea></div><div class="span-4 border-top" data-v-9a94c648><h2 data-v-9a94c648>Profil Akademik &amp; Riset</h2></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>SINTA ID</label><input type="text"${ssrRenderAttr("value", settings.value.sinta_id)} placeholder="Masukkan ID SINTA" data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Scopus Author ID</label><input type="text"${ssrRenderAttr("value", settings.value.scopus_id)} placeholder="Masukkan ID Author Scopus" data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Tautan Profil Google Scholar</label><input type="text"${ssrRenderAttr("value", settings.value.scholar_id)} placeholder="https://scholar.google.com/citations?user=..." data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>ORCID ID</label><input type="text"${ssrRenderAttr("value", settings.value.orcid_id)} placeholder="Masukkan ID ORCID (Contoh: 0000-0002-xxxx-xxxx)" data-v-9a94c648></div><div class="form-group span-4" data-v-9a94c648><label data-v-9a94c648>Keterangan / Narasi Rekam Jejak Sitasi</label><textarea rows="3" placeholder="Masukkan keterangan tentang jumlah sitasi riset..." data-v-9a94c648>${ssrInterpolate(settings.value.citation_text)}</textarea></div><div class="span-4 border-top" data-v-9a94c648><h2 data-v-9a94c648>Statistik Pencapaian</h2></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Stat 1 (Angka)</label><input type="text"${ssrRenderAttr("value", settings.value.stat_experience_num)} required data-v-9a94c648><label style="${ssrRenderStyle({ "margin-top": "0.5rem" })}" data-v-9a94c648>Stat 1 (Label)</label><input type="text"${ssrRenderAttr("value", settings.value.stat_experience_label)} required data-v-9a94c648></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Stat 2 (Angka)</label><input type="text"${ssrRenderAttr("value", settings.value.stat_projects_num)} required data-v-9a94c648><label style="${ssrRenderStyle({ "margin-top": "0.5rem" })}" data-v-9a94c648>Stat 2 (Label)</label><input type="text"${ssrRenderAttr("value", settings.value.stat_projects_label)} required data-v-9a94c648></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Stat 3 (Angka)</label><input type="text"${ssrRenderAttr("value", settings.value.stat_papers_num)} required data-v-9a94c648><label style="${ssrRenderStyle({ "margin-top": "0.5rem" })}" data-v-9a94c648>Stat 3 (Label)</label><input type="text"${ssrRenderAttr("value", settings.value.stat_papers_label)} required data-v-9a94c648></div><div class="span-4 border-top" data-v-9a94c648><h2 data-v-9a94c648>Kontak &amp; Saluran Kolaborasi</h2></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>Judul Kolaborasi</label><input type="text"${ssrRenderAttr("value", settings.value.contact_title)} required data-v-9a94c648></div><div class="form-group span-2" data-v-9a94c648><label data-v-9a94c648>LinkedIn Profil URL</label><input type="text"${ssrRenderAttr("value", settings.value.contact_linkedin)} placeholder="https://linkedin.com/in/username" data-v-9a94c648></div><div class="form-group span-4" data-v-9a94c648><label data-v-9a94c648>Sub-judul Kolaborasi / Ajakan Diskusi</label><textarea rows="2" required data-v-9a94c648>${ssrInterpolate(settings.value.contact_subtitle)}</textarea></div><div class="form-group span-4" data-v-9a94c648><label data-v-9a94c648>Daftar Afiliasi (Satu per Baris)</label><textarea rows="4" placeholder="Masukkan satu afiliasi profesional per baris..." required data-v-9a94c648>${ssrInterpolate(settings.value.contact_affiliations)}</textarea></div><div class="span-4 action-bar" data-v-9a94c648><button type="submit" class="btn-save"${ssrIncludeBooleanAttr(savingSettings.value) ? " disabled" : ""} data-v-9a94c648>${ssrInterpolate(savingSettings.value ? "Menyimpan..." : "Simpan Semua Perubahan")}</button></div></form></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "projects") {
        _push(`<section class="tab-panel" data-v-9a94c648><div class="flex-row" data-v-9a94c648><div class="card flex-grow" data-v-9a94c648><div class="card-header" data-v-9a94c648><h2 data-v-9a94c648>Daftar Proyek</h2><button class="btn-primary" data-v-9a94c648>Tambah Proyek Baru ➕</button></div><div class="table-wrapper" data-v-9a94c648><table data-v-9a94c648><thead data-v-9a94c648><tr data-v-9a94c648><th data-v-9a94c648>Judul Proyek</th><th data-v-9a94c648>Deskripsi Ringkas</th><th data-v-9a94c648>Desain Visual</th><th data-v-9a94c648>Aksi</th></tr></thead><tbody data-v-9a94c648><!--[-->`);
        ssrRenderList(projects.value, (proj) => {
          _push(`<tr data-v-9a94c648><td data-v-9a94c648><strong data-v-9a94c648>${ssrInterpolate(proj.title)}</strong></td><td class="text-truncate" data-v-9a94c648>${ssrInterpolate(proj.description)}</td><td data-v-9a94c648><span class="${ssrRenderClass([proj.visual_class, "badge-style"])}" data-v-9a94c648>${ssrInterpolate(proj.visual_class)}</span></td><td class="table-actions" data-v-9a94c648><button class="btn-edit" data-v-9a94c648>Edit ✏️</button><button class="btn-delete" data-v-9a94c648>Hapus 🗑️</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div><div class="card form-card" id="project-form-card" data-v-9a94c648><h2 data-v-9a94c648>${ssrInterpolate(projectForm.value.id ? "Edit Proyek" : "Tambah Proyek")}</h2><form class="stack-form" data-v-9a94c648><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Judul Proyek</label><input type="text"${ssrRenderAttr("value", projectForm.value.title)} placeholder="Contoh: E-Governance Audit" required data-v-9a94c648></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Deskripsi Proyek</label><textarea rows="4" placeholder="Deskripsi singkat mengenai pengerjaan proyek..." required data-v-9a94c648>${ssrInterpolate(projectForm.value.description)}</textarea></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Desain Kartu / Visual Style</label><select required data-v-9a94c648><option value="p-visual-1" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(projectForm.value.visual_class) ? ssrLooseContain(projectForm.value.visual_class, "p-visual-1") : ssrLooseEqual(projectForm.value.visual_class, "p-visual-1")) ? " selected" : ""}>Visual Pink / Orange Gradient (Gaya 1)</option><option value="p-visual-2" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(projectForm.value.visual_class) ? ssrLooseContain(projectForm.value.visual_class, "p-visual-2") : ssrLooseEqual(projectForm.value.visual_class, "p-visual-2")) ? " selected" : ""}>Visual Teal / Blue Gradient (Gaya 2)</option><option value="p-visual-3" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(projectForm.value.visual_class) ? ssrLooseContain(projectForm.value.visual_class, "p-visual-3") : ssrLooseEqual(projectForm.value.visual_class, "p-visual-3")) ? " selected" : ""}>Visual Gold / Yellow Polygon (Gaya 3)</option><option value="p-visual-4" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(projectForm.value.visual_class) ? ssrLooseContain(projectForm.value.visual_class, "p-visual-4") : ssrLooseEqual(projectForm.value.visual_class, "p-visual-4")) ? " selected" : ""}>Visual Red / Orange Path (Gaya 4)</option></select></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Tautan Proyek / Anchor Link</label><input type="text"${ssrRenderAttr("value", projectForm.value.link)} placeholder="Contoh: #project1 atau URL lengkap" required data-v-9a94c648></div><div class="form-actions" data-v-9a94c648><button type="button" class="btn-cancel" data-v-9a94c648>Batal</button><button type="submit" class="btn-save"${ssrIncludeBooleanAttr(savingProject.value) ? " disabled" : ""} data-v-9a94c648>${ssrInterpolate(savingProject.value ? "Menyimpan..." : "Simpan Proyek")}</button></div></form></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "blogs") {
        _push(`<section class="tab-panel" data-v-9a94c648><div class="flex-row" data-v-9a94c648><div class="card flex-grow" data-v-9a94c648><div class="card-header" data-v-9a94c648><h2 data-v-9a94c648>Daftar Artikel Blog</h2><button class="btn-primary" data-v-9a94c648>Tulis Artikel Baru ➕</button></div><div class="table-wrapper" data-v-9a94c648><table data-v-9a94c648><thead data-v-9a94c648><tr data-v-9a94c648><th data-v-9a94c648>Judul Artikel</th><th data-v-9a94c648>Slug URL</th><th data-v-9a94c648>Status</th><th data-v-9a94c648>Tanggal Dibuat</th><th data-v-9a94c648>Aksi</th></tr></thead><tbody data-v-9a94c648><!--[-->`);
        ssrRenderList(blogs.value, (post) => {
          _push(`<tr data-v-9a94c648><td data-v-9a94c648><strong data-v-9a94c648>${ssrInterpolate(post.title)}</strong></td><td data-v-9a94c648><code data-v-9a94c648>${ssrInterpolate(post.slug)}</code></td><td data-v-9a94c648><span class="${ssrRenderClass(["badge-status", post.status])}" data-v-9a94c648>${ssrInterpolate(post.status === "published" ? "Published" : "Draft")}</span></td><td data-v-9a94c648>${ssrInterpolate(formatDate(post.created_at))}</td><td class="table-actions" data-v-9a94c648><button class="btn-edit" data-v-9a94c648>Edit ✏️</button><button class="btn-delete" data-v-9a94c648>Hapus 🗑️</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div><div class="card form-card large-form" id="blog-form-card" data-v-9a94c648><h2 data-v-9a94c648>${ssrInterpolate(blogForm.value.id ? "Edit Artikel" : "Tulis Artikel Baru")}</h2><form class="stack-form" data-v-9a94c648><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Judul Artikel</label><input type="text"${ssrRenderAttr("value", blogForm.value.title)} placeholder="Contoh: Tantangan Audit Keuangan BUMN" required data-v-9a94c648></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Slug URL (Otomatis)</label><input type="text"${ssrRenderAttr("value", blogForm.value.slug)} placeholder="tantangan-audit-keuangan-bumn" required data-v-9a94c648></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Gambar Banner / Cover URL</label><div class="image-uploader" data-v-9a94c648><img${ssrRenderAttr("src", blogForm.value.image_url || "/images/blog_1.jpg")} class="preview-img rect" alt="Blog Cover" data-v-9a94c648><div class="upload-controls" data-v-9a94c648><input type="file" accept="image/*" id="blog-upload" class="hidden-input" data-v-9a94c648><label for="blog-upload" class="btn-secondary" data-v-9a94c648>Pilih Gambar 📷</label></div></div></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Konten Artikel</label><textarea rows="10" placeholder="Tulis isi artikel lengkap di sini..." required data-v-9a94c648>${ssrInterpolate(blogForm.value.content)}</textarea></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Status Publikasi</label><select required data-v-9a94c648><option value="draft" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(blogForm.value.status) ? ssrLooseContain(blogForm.value.status, "draft") : ssrLooseEqual(blogForm.value.status, "draft")) ? " selected" : ""}>Draft (Disembunyikan)</option><option value="published" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(blogForm.value.status) ? ssrLooseContain(blogForm.value.status, "published") : ssrLooseEqual(blogForm.value.status, "published")) ? " selected" : ""}>Published (Ditampilkan)</option></select></div><div class="form-actions" data-v-9a94c648><button type="button" class="btn-cancel" data-v-9a94c648>Batal</button><button type="submit" class="btn-save"${ssrIncludeBooleanAttr(savingBlog.value) ? " disabled" : ""} data-v-9a94c648>${ssrInterpolate(savingBlog.value ? "Menyimpan..." : "Simpan Artikel")}</button></div></form></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "publications") {
        _push(`<section class="tab-panel" data-v-9a94c648><div class="flex-row" data-v-9a94c648><div class="card flex-grow" data-v-9a94c648><div class="card-header" data-v-9a94c648><h2 data-v-9a94c648>Daftar Publikasi &amp; Karya</h2><button class="btn-primary" data-v-9a94c648>Tambah Publikasi Baru ➕</button></div><div class="table-wrapper" data-v-9a94c648><table data-v-9a94c648><thead data-v-9a94c648><tr data-v-9a94c648><th data-v-9a94c648>Judul Publikasi</th><th data-v-9a94c648>Tipe</th><th data-v-9a94c648>Tautan</th><th data-v-9a94c648>Keterangan / Narasi</th><th data-v-9a94c648>Aksi</th></tr></thead><tbody data-v-9a94c648><!--[-->`);
        ssrRenderList(publications.value, (pub) => {
          _push(`<tr data-v-9a94c648><td data-v-9a94c648><strong data-v-9a94c648>${ssrInterpolate(pub.title)}</strong></td><td data-v-9a94c648><span class="badge-status published" data-v-9a94c648>${ssrInterpolate(pub.type)}</span></td><td data-v-9a94c648>`);
          if (pub.link) {
            _push(`<a${ssrRenderAttr("href", pub.link)} target="_blank" class="text-link" data-v-9a94c648>${ssrInterpolate(pub.link)}</a>`);
          } else {
            _push(`<span class="text-muted" data-v-9a94c648>-</span>`);
          }
          _push(`</td><td data-v-9a94c648>${ssrInterpolate(pub.description || "-")}</td><td class="table-actions" data-v-9a94c648><button class="btn-edit" data-v-9a94c648>Edit ✏️</button><button class="btn-delete" data-v-9a94c648>Hapus 🗑️</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div><div class="card form-card" id="pub-form-card" data-v-9a94c648><h2 data-v-9a94c648>${ssrInterpolate(pubForm.value.id ? "Edit Publikasi" : "Tambah Publikasi Baru")}</h2><form class="stack-form" data-v-9a94c648><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Judul Publikasi</label><input type="text"${ssrRenderAttr("value", pubForm.value.title)} placeholder="Contoh: Pemeriksaan Akuntansi &amp; Contoh Kasus di Indonesia" required data-v-9a94c648></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Tipe Publikasi</label><select required data-v-9a94c648><option value="Buku" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(pubForm.value.type) ? ssrLooseContain(pubForm.value.type, "Buku") : ssrLooseEqual(pubForm.value.type, "Buku")) ? " selected" : ""}>Buku</option><option value="Artikel Jurnal Terpilih" data-v-9a94c648${ssrIncludeBooleanAttr(Array.isArray(pubForm.value.type) ? ssrLooseContain(pubForm.value.type, "Artikel Jurnal Terpilih") : ssrLooseEqual(pubForm.value.type, "Artikel Jurnal Terpilih")) ? " selected" : ""}>Artikel Jurnal Terpilih</option></select></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Tautan / Link Publikasi (Opsional)</label><input type="url"${ssrRenderAttr("value", pubForm.value.link)} placeholder="Contoh: https://example.com/publikasi" data-v-9a94c648></div><div class="form-group" data-v-9a94c648><label data-v-9a94c648>Keterangan / Narasi</label><textarea rows="4" placeholder="Penjelasan singkat atau detail publikasi..." data-v-9a94c648>${ssrInterpolate(pubForm.value.description)}</textarea></div><div class="form-actions" data-v-9a94c648><button type="button" class="btn-cancel" data-v-9a94c648>Batal</button><button type="submit" class="btn-save"${ssrIncludeBooleanAttr(savingPub.value) ? " disabled" : ""} data-v-9a94c648>${ssrInterpolate(savingPub.value ? "Menyimpan..." : "Simpan Publikasi")}</button></div></form></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "inbox") {
        _push(`<section class="tab-panel" data-v-9a94c648><div class="card" data-v-9a94c648><div class="card-header" data-v-9a94c648><h2 data-v-9a94c648>Daftar Pesan Masuk / Korespondensi</h2><button class="btn-secondary" data-v-9a94c648>Perbarui 🔄</button></div>`);
        if (messages.value.length === 0) {
          _push(`<div class="empty-state" style="${ssrRenderStyle({ "text-align": "center", "padding": "3rem", "color": "var(--color-text-main)" })}" data-v-9a94c648><p data-v-9a94c648>Belum ada pesan korespondensi yang masuk.</p></div>`);
        } else {
          _push(`<div class="table-wrapper" data-v-9a94c648><table data-v-9a94c648><thead data-v-9a94c648><tr data-v-9a94c648><th data-v-9a94c648>Tanggal</th><th data-v-9a94c648>Nama Pengirim</th><th data-v-9a94c648>Alamat Surel</th><th data-v-9a94c648>Institusi</th><th data-v-9a94c648>Topik</th><th data-v-9a94c648>Uraian Pesan</th><th data-v-9a94c648>Aksi</th></tr></thead><tbody data-v-9a94c648><!--[-->`);
          ssrRenderList(messages.value, (msg) => {
            _push(`<tr data-v-9a94c648><td style="${ssrRenderStyle({ "white-space": "nowrap" })}" data-v-9a94c648>${ssrInterpolate(formatDate(msg.created_at))}</td><td data-v-9a94c648><strong data-v-9a94c648>${ssrInterpolate(msg.name)}</strong></td><td data-v-9a94c648><a${ssrRenderAttr("href", "mailto:" + msg.email)} class="text-link" data-v-9a94c648>${ssrInterpolate(msg.email)}</a></td><td data-v-9a94c648>${ssrInterpolate(msg.institution || "-")}</td><td data-v-9a94c648><span class="badge-status published" data-v-9a94c648>${ssrInterpolate(msg.topic || "Lainnya")}</span></td><td data-v-9a94c648><div class="message-text-bubble" style="${ssrRenderStyle({ "max-width": "300px", "max-height": "80px", "overflow-y": "auto", "font-size": "0.85rem", "line-height": "1.4", "color": "var(--color-text-main)" })}" data-v-9a94c648>${ssrInterpolate(msg.message)}</div></td><td class="table-actions" data-v-9a94c648><button class="btn-delete" data-v-9a94c648>Hapus 🗑️</button></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a94c648"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-BOlxr92Q.mjs.map
