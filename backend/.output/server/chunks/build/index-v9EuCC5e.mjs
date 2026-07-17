import { withAsyncContext, ref, computed, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { u as useFetch } from './fetch-U6cPHsAe.mjs';
import { u as useHead } from './composables-BKzdUfxz.mjs';
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
import '@vue/shared';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const defaultAboutDescription = `Perjalanan saya di dunia akuntansi dimulai lebih dari 16 tahun lalu, dan sejak saat itu saya memilih untuk tidak berhenti hanya di satu peran. Saya adalah dosen Akuntansi Sektor Publik di Program Studi Akuntansi, Fakultas Ekonomi dan Bisnis, UPN “Veteran” Jawa Timur — tempat saya membimbing generasi akuntan dan auditor masa depan. Namun ruang kelas hanyalah satu bagian dari perjalanan saya.

Di sisi praktik, saya berperan sebagai auditor dan akuntan publik di KAP Mahsun, Nurdiono, Kukuh dan Rekan (KAP MNK & Rekan), serta sebagai praktisi dan tenaga ahli di Drastha Consulting dan Drastha Learning. Kombinasi ini memungkinkan saya menjembatani teori dan praktik secara langsung — sesuatu yang saya yakini menjadi kekuatan utama dalam memberikan layanan maupun pengajaran yang relevan dengan kebutuhan riil di lapangan.`;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: settings } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/settings",
      "$Mgkx-lEIaH"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: projects } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/projects",
      "$unrk8r9QY6"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: services } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/services",
      "$jWUfGtsmaM"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: blogs } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/blogs",
      "$S-ryB9RvCs"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: publications } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/publications",
      "$mnp6cq1D7r"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const resolveAcademicLink = (val, prefix) => {
      if (!val) return "#";
      const cleanVal = val.trim();
      if (cleanVal.startsWith("http://") || cleanVal.startsWith("https://")) return cleanVal;
      return prefix + cleanVal;
    };
    const formattedHeroHeadline = computed(() => {
      const text = settings.value?.hero_title_highlight || "Menjembatani riset akuntansi dengan praktik tata kelola yang akuntabel.";
      return text.replace(/riset/gi, '<span class="highlight-gold-italic">riset</span>');
    });
    const showAboutModal = ref(false);
    const formattedAboutDescription = computed(() => {
      const rawText = settings.value?.about_description || defaultAboutDescription;
      return rawText.split("\n\n").map((p) => {
        let text = p;
        text = text.replace(/dosen Akuntansi Sektor Publik/gi, "<strong>dosen Akuntansi Sektor Publik</strong>");
        text = text.replace(/auditor dan akuntan publik/gi, "<strong>auditor dan akuntan publik</strong>");
        text = text.replace(/KAP Mahsun, Nurdiono, Kukuh dan Rekan \(KAP MNK & Rekan\)/gi, "<strong>KAP Mahsun, Nurdiono, Kukuh dan Rekan (KAP MNK & Rekan)</strong>");
        text = text.replace(/Drastha Consulting/gi, "<strong>Drastha Consulting</strong>");
        text = text.replace(/Drastha Learning/gi, "<strong>Drastha Learning</strong>");
        return text;
      });
    });
    const educationDegrees = computed(() => {
      return [
        {
          title: settings.value?.about_degree1_title || "Doktor (S3)",
          field: settings.value?.about_degree1_field || "Ilmu Ekonomi / Akuntansi"
        },
        {
          title: settings.value?.about_degree2_title || "Magister Akuntansi",
          field: settings.value?.about_degree2_field || "M.Aks."
        },
        {
          title: settings.value?.about_degree3_title || "Sarjana Ekonomi",
          field: settings.value?.about_degree3_field || "S.E."
        }
      ];
    });
    const certCategories = computed(() => {
      return [
        {
          title: settings.value?.certs_category1_title || "AKUNTANSI & AUDIT",
          list: (settings.value?.certs_category1_list || "Ak., CA., CPA., CFrA.").split(",").map((s) => s.trim())
        },
        {
          title: settings.value?.certs_category2_title || "MANAJEMEN RISIKO & TATA KELOLA",
          list: (settings.value?.certs_category2_list || "CERA., CRA., CRP., GRCE.").split(",").map((s) => s.trim())
        },
        {
          title: settings.value?.certs_category3_title || "SEKTOR PUBLIK & BISNIS INTERNASIONAL",
          list: (settings.value?.certs_category3_list || "CIPSAS., CIBA.").split(",").map((s) => s.trim())
        },
        {
          title: settings.value?.certs_category4_title || "MANAJEMEN PROYEK & MEDIASI",
          list: (settings.value?.certs_category4_list || "CAPM., Mediator Bersertifikat").split(",").map((s) => s.trim())
        }
      ];
    });
    computed(() => {
      if (!blogs.value) return [];
      return blogs.value.filter((post) => post.status === "published");
    });
    const servicesByCategory = computed(() => {
      if (!services.value) return {};
      const groups = {};
      services.value.forEach((srv) => {
        const cat = srv.category || "Umum";
        if (!groups[cat]) {
          groups[cat] = [];
        }
        groups[cat].push(srv);
      });
      return groups;
    });
    const getServiceGlobalIndex = (srv) => {
      if (!services.value) return 0;
      const idx = services.value.findIndex((s) => s.id === srv.id);
      return idx !== -1 ? idx + 1 : 0;
    };
    const getPlaceholderCount = (categoryName) => {
      const count = (servicesByCategory.value[categoryName] || []).length;
      return count > 0 && count < 3 ? 3 - count : 0;
    };
    computed(() => {
      if (!publications.value) return {};
      const groups = {};
      publications.value.forEach((pub) => {
        const type = pub.type || "Lainnya";
        if (!groups[type]) {
          groups[type] = [];
        }
        groups[type].push(pub);
      });
      return groups;
    });
    const activeBlogPost = ref(null);
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };
    useHead({
      title: "Dr. Rida Perwita Sari, SE, MAks, Ak, CPA, CFrA, CIPSAS, GRCE",
      meta: [
        { name: "description", content: "Personal Branding & Professional Portfolio of Dr. Rida Perwita Sari - Expert Auditor, Academician, Forensic Accountant, and Public Sector Advisory Consultant." }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" }
      ]
    });
    const contactForm = ref({
      name: "",
      email: "",
      institution: "",
      topic: "",
      message: ""
    });
    const submittingForm = ref(false);
    const contactNotification = ref({ show: false, message: "", type: "success" });
    const contactAffiliationsList = computed(() => {
      if (!settings.value?.contact_affiliations) return [];
      return settings.value.contact_affiliations.split("\n").filter((item) => item.trim() !== "");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "portfolio-doc" }, _attrs))}><div class="paper-watermark">RPS • VERITAS</div><header class="${ssrRenderClass(["doc-header-main", { scrolled: isScrolled.value, "mobile-menu-open": isMobileMenuOpen.value }])}"><div class="header-container-doc"><a href="#" class="header-logo-block"><div class="header-logo-badge">`);
      if (unref(settings)?.header_logo_url) {
        _push(`<img${ssrRenderAttr("src", unref(settings).header_logo_url)} class="header-logo-badge-img" alt="Logo">`);
      } else {
        _push(`<span>${ssrInterpolate(unref(settings)?.seal_initials || "RPS")}</span>`);
      }
      _push(`</div><div class="header-logo-text-group"><span class="header-logo-title">Dr. Rida Perwita Sari</span><span class="header-logo-subtitle">AKUNTANSI · AUDIT · TATA KELOLA</span></div></a><nav class="${ssrRenderClass(["header-nav-links", { "mobile-active": isMobileMenuOpen.value }])}"><a href="#about">Tentang Saya</a><a href="#services">Bidang Fokus</a><a href="#blog">Publikasi Karya</a><a href="#contact">Kontak</a><a href="#contact" class="btn-header-cta mobile-only-cta">Hubungi Saya</a></nav><div class="header-action-group"><a href="#contact" class="btn-header-cta">Hubungi Saya</a></div><button class="${ssrRenderClass(["mobile-menu-toggle", { "is-active": isMobileMenuOpen.value }])}" aria-label="Toggle Menu"><span class="hamburger-bar"></span><span class="hamburger-bar"></span><span class="hamburger-bar"></span></button></div></header><section id="hero" class="hero-doc-section-light"><div class="hero-container-doc-light"><div class="hero-content-doc-light"><div class="hero-tag-light"><span class="gold-line">—</span><span class="tag-text">${ssrInterpolate(unref(settings)?.hero_credentials || unref(settings)?.hero_tag || "AKADEMISI · AUDITOR · KONSULTAN")}</span></div><h1 class="hero-title-doc-light">${formattedHeroHeadline.value ?? ""}</h1><h2 class="hero-name-sub">${ssrInterpolate(unref(settings)?.hero_badge || "Dr. Rida Perwita Sari, S.E., M.Aks.")}</h2><p class="hero-desc-light">${ssrInterpolate(unref(settings)?.hero_description || "Saya membantu institusi, lembaga publik, dan organisasi bisnis membangun tata kelola keuangan yang akuntabel — melalui audit, konsultasi, riset, dan pelatihan. Lebih dari 16 tahun pengalaman di bidang ekonomi, akuntansi, audit, dan forensik.")}</p><div class="hero-actions-light"><a href="#services" class="btn-light-primary">Lihat bidang fokus saya</a><a href="#blog" class="btn-light-secondary">Baca publikasi</a></div></div><div class="hero-seal-wrapper-light"><div class="seal-large-doc">`);
      if (unref(settings)?.hero_image_url || unref(settings)?.hero_seal_image_url) {
        _push(`<img${ssrRenderAttr("src", unref(settings)?.hero_image_url || unref(settings)?.hero_seal_image_url)} class="seal-large-doc-img" alt="Hero Photo">`);
      } else {
        _push(`<div class="seal-inner-circle-double"><span class="seal-initials-text">${ssrInterpolate(unref(settings)?.seal_initials || "RPS")}</span><div class="seal-gold-divider"></div><div class="seal-credentials-block"><div class="seal-line">${ssrInterpolate(unref(settings)?.seal_line1 || "AK. · CA. · CPA.")}</div><div class="seal-line">${ssrInterpolate(unref(settings)?.seal_line2 || "CFRA. · CIPSAS. · DR.")}</div></div></div>`);
      }
      _push(`</div></div></div></section><div class="hero-stats-bar-light"><div class="stats-bar-container"><div class="stat-bar-item"><span class="stat-bar-num">${ssrInterpolate(unref(settings)?.stat_experience_num || "16+")}</span><span class="stat-bar-label">${ssrInterpolate(unref(settings)?.stat_experience_label || "Tahun pengalaman")}</span></div><div class="stat-bar-item"><span class="stat-bar-num">${ssrInterpolate(unref(settings)?.stat_certs_num || "14")}</span><span class="stat-bar-label">${ssrInterpolate(unref(settings)?.stat_certs_label || "Sertifikasi profesional")}</span></div><div class="stat-bar-item"><span class="stat-bar-num">${ssrInterpolate(unref(settings)?.stat_papers_num || "800+")}</span><span class="stat-bar-label">${ssrInterpolate(unref(settings)?.stat_papers_label || "Sitasi karya ilmiah")}</span></div><div class="stat-bar-item"><span class="stat-bar-num">${ssrInterpolate(unref(settings)?.stat_affiliations_num || "4")}</span><span class="stat-bar-label">${ssrInterpolate(unref(settings)?.stat_affiliations_label || "Afiliasi institusi")}</span></div></div></div><section id="about" class="doc-section-about-clean"><div class="section-container-doc"><div class="section-header-about-clean"><div class="about-num-label">01 — ${ssrInterpolate(unref(settings)?.about_badge || "Tentang Saya")}</div><h2 class="about-title-serif">${ssrInterpolate(unref(settings)?.about_title || "Satu kaki di ruang kelas, satu kaki di lapangan.")}</h2></div><div class="about-two-col-layout">`);
      if (unref(settings)?.about_image_url) {
        _push(`<div class="about-image-wrapper-doc"><div class="photo-attachment-frame"><img${ssrRenderAttr("src", unref(settings).about_image_url)} class="about-img-doc" alt="Dr. Rida Perwita Sari"><svg class="seal-of-credentials" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"></circle><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1"></circle><path id="seal-curve" d="M 18 50 A 32 32 0 1 1 82 50" fill="none" stroke="transparent"></path><text font-size="7" font-weight="bold" fill="currentColor"><textPath href="#seal-curve" startOffset="50%" text-anchor="middle"> * DR. RIDA PERWITA SARI * </textPath></text><text x="50" y="52" font-size="8" font-weight="bold" fill="currentColor" text-anchor="middle">VERITAS</text><text x="50" y="62" font-size="5" fill="currentColor" text-anchor="middle">OFFICIAL SEAL</text></svg></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="about-left-bio-col"><div class="about-bio-paragraphs"><!--[-->`);
      ssrRenderList(formattedAboutDescription.value, (paragraph, idx) => {
        _push(`<p>${paragraph ?? ""}</p>`);
      });
      _push(`<!--]--></div><div class="degrees-list-block"><!--[-->`);
      ssrRenderList(educationDegrees.value, (deg, idx) => {
        _push(`<div class="degree-row-item"><span class="degree-title">${ssrInterpolate(deg.title)}</span><span class="degree-field">${ssrInterpolate(deg.field)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="about-right-certs-col"><!--[-->`);
      ssrRenderList(certCategories.value, (cat, idx) => {
        _push(`<div class="cert-category-group"><h4 class="cert-group-label">${ssrInterpolate(cat.title)}</h4><div class="cert-badges-wrap"><!--[-->`);
        ssrRenderList(cat.list, (badge, bIdx) => {
          _push(`<span class="cert-badge-tag">${ssrInterpolate(badge)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div></div></section><section id="services" class="services-clean-section"><div class="section-container-doc"><div class="services-section-header-clean"><div class="services-num-label-clean">02 — Bidang Fokus</div><h2 class="services-title-serif-clean">${ssrInterpolate(unref(settings)?.services_title || "Tujuh bidang fokus, tiga ranah kerja.")}</h2><p class="services-intro-desc-clean">${ssrInterpolate(unref(settings)?.services_subtitle || "Dari ruang audit hingga ruang kelas — setiap bidang fokus berangkat dari kombinasi kompetensi akademik dan jam terbang praktik.")}</p></div><!--[-->`);
      ssrRenderList(["Untuk Institusi & Organisasi", "Untuk Pengembangan SDM", "Untuk Akademisi & Peneliti"], (categoryName) => {
        _push(`<div class="services-category-block-clean"><div class="services-cat-header-clean"><h3 class="services-cat-title-clean">${ssrInterpolate(categoryName)}</h3><div class="services-cat-line-clean"></div></div><div class="services-ledger-grid"><!--[-->`);
        ssrRenderList(servicesByCategory.value[categoryName] || [], (srv, sIdx) => {
          _push(`<div class="service-ledger-card"><div class="service-card-num">${ssrInterpolate(String(getServiceGlobalIndex(srv)).padStart(2, "0"))}</div><h4 class="service-card-title">${ssrInterpolate(srv.title)}</h4><p class="service-card-text">${ssrInterpolate(srv.description)}</p></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(getPlaceholderCount(categoryName), (pIdx) => {
          _push(`<div class="service-ledger-placeholder"></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></section><section id="blog" class="publications-clean-section"><div class="section-container-doc"><div class="pub-section-header-clean"><div class="pub-num-label-clean">03 — Publikasi &amp; Karya</div><h2 class="pub-title-serif-clean">${ssrInterpolate(unref(settings)?.publications_title || "Riset yang berbicara melalui sitasi.")}</h2></div><div class="pub-two-col-layout"><div class="pub-left-list-col"><div class="pub-cards-list-wrap"><!--[-->`);
      ssrRenderList(unref(publications), (pub) => {
        _push(`<div class="pub-clean-card">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(pub.link ? "a" : "div"), {
          href: pub.link || void 0,
          target: pub.link ? "_blank" : void 0,
          class: "pub-card-content-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="pub-clean-type"${_scopeId}>${ssrInterpolate(pub.type.toUpperCase())}</span><h4 class="pub-clean-title"${_scopeId}>${ssrInterpolate(pub.title)} `);
              if (pub.link) {
                _push2(`<span class="link-arrow"${_scopeId}>↗</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</h4><p class="pub-clean-desc"${_scopeId}>${ssrInterpolate(pub.description)}</p>`);
            } else {
              return [
                createVNode("span", { class: "pub-clean-type" }, toDisplayString(pub.type.toUpperCase()), 1),
                createVNode("h4", { class: "pub-clean-title" }, [
                  createTextVNode(toDisplayString(pub.title) + " ", 1),
                  pub.link ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "link-arrow"
                  }, "↗")) : createCommentVNode("", true)
                ]),
                createVNode("p", { class: "pub-clean-desc" }, toDisplayString(pub.description), 1)
              ];
            }
          }),
          _: 2
        }), _parent);
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="pub-clean-note-box"><div class="pub-note-accent-line"></div><div class="pub-note-content-wrap"><p class="pub-note-text">${ssrInterpolate(unref(settings)?.publications_note || "Catatan: tautan Google Scholar, Scopus, SINTA, dan/atau ORCID sebaiknya ditambahkan di sini agar pengunjung dapat menelusuri publikasi lengkap secara langsung.")}</p>`);
      if (unref(settings)?.scholar_id || unref(settings)?.sinta_id || unref(settings)?.scopus_id || unref(settings)?.orcid_id) {
        _push(`<div class="academic-profile-links-wrap">`);
        if (unref(settings)?.scholar_id) {
          _push(`<a${ssrRenderAttr("href", resolveAcademicLink(unref(settings).scholar_id, ""))} target="_blank" class="academic-badge-link scholar-badge"><span class="badge-icon">🎓</span> Google Scholar </a>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(settings)?.sinta_id) {
          _push(`<a${ssrRenderAttr("href", resolveAcademicLink(unref(settings).sinta_id, "https://sinta.kemdikbud.go.id/authors/detail?id="))} target="_blank" class="academic-badge-link sinta-badge"><span class="badge-icon">🇮🇩</span> SINTA ID </a>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(settings)?.scopus_id) {
          _push(`<a${ssrRenderAttr("href", resolveAcademicLink(unref(settings).scopus_id, "https://www.scopus.com/authid/detail.uri?authorId="))} target="_blank" class="academic-badge-link scopus-badge"><span class="badge-icon">🔍</span> Scopus ID </a>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(settings)?.orcid_id) {
          _push(`<a${ssrRenderAttr("href", resolveAcademicLink(unref(settings).orcid_id, "https://orcid.org/"))} target="_blank" class="academic-badge-link orcid-badge"><span class="badge-icon">🆔</span> ORCID </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="pub-right-stats-col"><div class="pub-dark-stats-box"><div class="pub-stat-number">${ssrInterpolate(unref(settings)?.publications_citation_num || "800+")}</div><div class="pub-stat-label">${ssrInterpolate(unref(settings)?.publications_citation_label || "Sitasi karya ilmiah")}</div><p class="pub-stat-desc">${ssrInterpolate(unref(settings)?.citation_text || unref(settings)?.publications_citation_desc || "Karya-karya ilmiah saya telah disitasi lebih dari 800 kali oleh peneliti lain — indikator kontribusi nyata bagi perkembangan ilmu akuntansi sektor publik dan audit, baik di tingkat nasional maupun internasional.")}</p></div></div></div></div></section><div class="marquee-banner-doc"><div class="marquee-content-doc"><span>INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC     </span><span>INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC     </span><span>INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC     </span></div></div><section id="contact" class="contact-clean-section"><div class="section-container-doc"><div class="contact-section-header-clean"><div class="contact-num-label-clean">04 — Kontak</div><h2 class="contact-title-serif-clean">${ssrInterpolate(unref(settings)?.contact_title || "Mari berkolaborasi.")}</h2><p class="contact-intro-desc-clean">${ssrInterpolate(unref(settings)?.contact_subtitle || "Apakah Anda mewakili instansi yang membutuhkan jasa audit, organisasi yang ingin memperkuat tata kelola, atau penyelenggara acara yang mencari narasumber — saya terbuka untuk berdiskusi.")}</p></div><div class="contact-two-col-layout"><div class="contact-affiliations-col-clean"><ul class="contact-aff-list-clean"><!--[-->`);
      ssrRenderList(contactAffiliationsList.value, (aff, idx) => {
        _push(`<li class="contact-aff-item-clean"><span class="contact-aff-marker">■</span><span class="contact-aff-text">${ssrInterpolate(aff)}</span></li>`);
      });
      _push(`<!--]--></ul></div><div class="contact-form-col-clean"><div class="contact-form-container-clean">`);
      if (contactNotification.value.show) {
        _push(`<div class="${ssrRenderClass(["contact-toast-doc-clean", contactNotification.value.type])}"><span class="toast-icon-doc-clean">${ssrInterpolate(contactNotification.value.type === "success" ? "✓" : "✗")}</span><span class="toast-msg-doc-clean">${ssrInterpolate(contactNotification.value.message)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="contact-form-clean"><div class="form-group-clean"><label class="form-label-clean">NAMA</label><input type="text"${ssrRenderAttr("value", contactForm.value.name)} class="form-input-clean" placeholder="Nama lengkap Anda" required></div><div class="form-group-clean"><label class="form-label-clean">EMAIL</label><input type="email"${ssrRenderAttr("value", contactForm.value.email)} class="form-input-clean" placeholder="nama@institusi.com" required></div><div class="form-group-clean"><label class="form-label-clean">TOPIK</label><input type="text"${ssrRenderAttr("value", contactForm.value.topic)} class="form-input-clean" placeholder="Audit / Konsultasi / Pelatihan / Lainnya" required></div><div class="form-group-clean"><label class="form-label-clean">PESAN</label><textarea rows="4" class="form-textarea-clean" placeholder="Tuliskan kebutuhan Anda..." required>${ssrInterpolate(contactForm.value.message)}</textarea></div><button type="submit" class="btn-submit-clean"${ssrIncludeBooleanAttr(submittingForm.value) ? " disabled" : ""}>${ssrInterpolate(submittingForm.value ? "Mengirim..." : "Kirim pesan")}</button></form></div></div></div></div></section><footer class="footer-clean-doc"><div class="footer-container-clean-doc"><div class="footer-left-clean-doc"><p class="copyright-clean-doc">© 2026 Dr. Rida Perwita Sari</p></div><div class="footer-right-clean-doc"><a${ssrRenderAttr("href", unref(settings)?.contact_linkedin || "#")} target="_blank" class="footer-link-item">LinkedIn</a><a${ssrRenderAttr("href", unref(settings)?.scholar_id || "#")} target="_blank" class="footer-link-item">Google Scholar</a><a${ssrRenderAttr("href", "mailto:" + (unref(settings)?.contact_email || ""))} class="footer-link-item">Email</a></div></div></footer>`);
      if (activeBlogPost.value) {
        _push(`<div class="blog-modal-backdrop-doc"><div class="blog-modal-card-doc"><div class="modal-card-top-bar"><span>DOKUMEN PUBLIKASI RESMI - ARSIP RPS</span><button class="btn-close-modal-doc">×</button></div><div class="modal-header-doc"><span class="modal-date-doc">Diterbitkan: ${ssrInterpolate(formatDate(activeBlogPost.value.created_at))}</span><h2>${ssrInterpolate(activeBlogPost.value.title)}</h2><div class="modal-title-line"></div></div><div class="modal-body-doc"><div class="modal-banner-wrapper"><img${ssrRenderAttr("src", activeBlogPost.value.image_url)}${ssrRenderAttr("alt", activeBlogPost.value.title)} class="modal-banner-doc"></div><div class="modal-content-text-doc"><!--[-->`);
        ssrRenderList(activeBlogPost.value.content.split("\n"), (paragraph, idx) => {
          _push(`<p>${ssrInterpolate(paragraph)}</p>`);
        });
        _push(`<!--]--></div></div><div class="modal-card-footer-doc"><span>Tanda Tangan Elektronik Bersertifikasi (Escrow)</span><button class="btn-modal-close-bottom">Tutup Dokumen</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showAboutModal.value) {
        _push(`<div class="blog-modal-backdrop-doc"><div class="blog-modal-card-doc credential-modal-card"><div class="modal-card-top-bar"><span>BERKAS LAMPIRAN: AFIDAVIT KREDENSIAL LENGKAP - ARSIP RPS</span><button class="btn-close-modal-doc">×</button></div><div class="modal-header-doc"><span class="modal-date-doc">Status Dokumen: Terverifikasi Resmi</span><h2>Kredensial, Sertifikasi &amp; Kontribusi Ilmiah</h2><div class="modal-title-line"></div></div><div class="modal-body-doc credential-modal-body"><div class="credential-columns-grid"><div class="credential-col-left"><div class="credential-section-block"><h3 class="credential-block-title">I. RIWAYAT PENDIDIKAN AKADEMIK</h3><ul class="credential-list"><li><strong>Doktor (S3)</strong> — Ilmu Ekonomi / Konsentrasi Akuntansi</li><li><strong>Magister Akuntansi (M.Aks.)</strong></li><li><strong>Sarjana Ekonomi (S.E.)</strong></li></ul></div><div class="credential-section-block" style="${ssrRenderStyle({ "margin-top": "2.5rem" })}"><h3 class="credential-block-title">II. KONTRIBUSI ILMIAH &amp; AKADEMIK</h3><ul class="credential-list"><li>Lebih dari <strong>800 sitasi</strong> atas karya-karya ilmiah terpublikasi.</li><li>Publikasi jurnal internasional bereputasi, termasuk di <em>Journal of Financial Crime</em>.</li><li>Penulis buku <em>Pemeriksaan Akuntansi &amp; Contoh Kasus di Indonesia</em>.</li><li>Reviewer aktif di jurnal ilmiah terakreditasi nasional maupun bereputasi internasional.</li><li>Pembimbing penelitian mahasiswa aktif tingkat S1 dan S2.</li></ul></div></div><div class="credential-col-right"><h3 class="credential-block-title">III. SERTIFIKASI PROFESIONAL (14 KOMPETENSI)</h3><p class="credential-intro">Memiliki sertifikasi resmi tingkat nasional dan internasional yang mencakup kepatuhan audit, forensik, tata kelola, dan risiko:</p><div class="certification-subgrids"><div class="cert-category-box"><h4>Akuntansi &amp; Audit</h4><ul><li><strong>Ak.</strong> (Akuntan Resmi Negara)</li><li><strong>CA.</strong> (Chartered Accountant)</li><li><strong>CPA.</strong> (Certified Public Accountant)</li><li><strong>CFrA.</strong> (Certified Forensic Auditor)</li></ul></div><div class="cert-category-box"><h4>Manajemen Risiko &amp; Tata Kelola</h4><ul><li><strong>CERA.</strong></li><li><strong>CRA.</strong></li><li><strong>CRP.</strong></li><li><strong>GRCE.</strong></li></ul></div><div class="cert-category-box"><h4>Sektor Publik Internasional</h4><ul><li><strong>CIPSAS.</strong></li></ul></div><div class="cert-category-box"><h4>Bisnis Internasional</h4><ul><li><strong>CIBA.</strong></li></ul></div><div class="cert-category-box"><h4>Manajemen Proyek</h4><ul><li><strong>CAPM.</strong></li></ul></div><div class="cert-category-box"><h4>Mediasi</h4><ul><li><strong>Mediator Bersertifikat</strong></li></ul></div></div></div></div></div><div class="modal-card-footer-doc"><span>Kearsipan Kredensial Akademik UPN &quot;Veteran&quot; Jatim &amp; KAP MNK</span><button class="btn-modal-close-bottom">Tutup Berkas</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-v9EuCC5e.mjs.map
