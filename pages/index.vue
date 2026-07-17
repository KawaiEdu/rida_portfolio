<template>
  <div class="portfolio-doc">
    <!-- Watermark Background -->
    <div class="paper-watermark">RPS • VERITAS</div>

    <!-- Navigation Header (Official Document Header Style) -->
    <header :class="['doc-header-main', { scrolled: isScrolled, 'mobile-menu-open': isMobileMenuOpen }]">
      <div class="header-container-doc">
        <!-- Logo Section -->
        <a href="#" class="header-logo-block" @click="closeMobileMenu">
          <div class="header-logo-badge">
            <img v-if="settings?.header_logo_url" :src="settings.header_logo_url" class="header-logo-badge-img" alt="Logo" />
            <span v-else>{{ settings?.seal_initials || 'RPS' }}</span>
          </div>
          <div class="header-logo-text-group">
            <span class="header-logo-title">Dr. Rida Perwita Sari</span>
            <span class="header-logo-subtitle">AKUNTANSI · AUDIT · TATA KELOLA</span>
          </div>
        </a>

        <!-- Navigation Menu -->
        <nav :class="['header-nav-links', { 'mobile-active': isMobileMenuOpen }]">
          <a href="#about" @click="closeMobileMenu">Tentang Saya</a>
          <a href="#services" @click="closeMobileMenu">Bidang Fokus</a>
          <a href="#blog" @click="closeMobileMenu">Publikasi Karya</a>
          <a href="#contact" @click="closeMobileMenu">Kontak</a>
          <!-- Mobile Only CTA -->
          <a href="#contact" class="btn-header-cta mobile-only-cta" @click="closeMobileMenu">Hubungi Saya</a>
        </nav>

        <!-- Call to Action Button -->
        <div class="header-action-group">
          <a href="#contact" class="btn-header-cta">Hubungi Saya</a>
        </div>

        <!-- Hamburger Icon Button for Mobile -->
        <button :class="['mobile-menu-toggle', { 'is-active': isMobileMenuOpen }]" @click="toggleMobileMenu" aria-label="Toggle Menu">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>
    </header>

    <!-- Hero Section (Light Ledger Style) -->
    <section id="hero" class="hero-doc-section-light">
      <div class="hero-container-doc-light">
        <!-- Left Column: Content -->
        <div class="hero-content-doc-light">
          <!-- Tagline with gold line and uppercase text -->
          <div class="hero-tag-light">
            <span class="gold-line">—</span>
            <span class="tag-text">{{ settings?.hero_credentials || settings?.hero_tag || 'AKADEMISI · AUDITOR · KONSULTAN' }}</span>
          </div>
          
          <!-- Headline -->
          <h1 class="hero-title-doc-light" v-html="formattedHeroHeadline"></h1>
          
          <!-- Name sub-headline -->
          <h2 class="hero-name-sub">{{ settings?.hero_badge || 'Dr. Rida Perwita Sari, S.E., M.Aks.' }}</h2>
          
          <!-- Description -->
          <p class="hero-desc-light">
            {{ settings?.hero_description || 'Saya membantu institusi, lembaga publik, dan organisasi bisnis membangun tata kelola keuangan yang akuntabel — melalui audit, konsultasi, riset, dan pelatihan. Lebih dari 16 tahun pengalaman di bidang ekonomi, akuntansi, audit, dan forensik.' }}
          </p>
          
          <!-- Buttons -->
          <div class="hero-actions-light">
            <a href="#services" class="btn-light-primary">Lihat bidang fokus saya</a>
            <a href="#blog" class="btn-light-secondary">Baca publikasi</a>
          </div>
        </div>

        <!-- Right Column: Notary Seal Element -->
        <div class="hero-seal-wrapper-light">
          <div class="seal-large-doc">
            <img v-if="settings?.hero_image_url || settings?.hero_seal_image_url" :src="settings?.hero_image_url || settings?.hero_seal_image_url" class="seal-large-doc-img" alt="Hero Photo" />
            <div v-else class="seal-inner-circle-double">
              <span class="seal-initials-text">{{ settings?.seal_initials || 'RPS' }}</span>
              <div class="seal-gold-divider"></div>
              <div class="seal-credentials-block">
                <div class="seal-line">{{ settings?.seal_line1 || 'AK. · CA. · CPA.' }}</div>
                <div class="seal-line">{{ settings?.seal_line2 || 'CFRA. · CIPSAS. · DR.' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar at the bottom of Hero (Full-width Divider) -->
    <div class="hero-stats-bar-light">
      <div class="stats-bar-container">
        <div class="stat-bar-item">
          <span class="stat-bar-num">{{ settings?.stat_experience_num || '16+' }}</span>
          <span class="stat-bar-label">{{ settings?.stat_experience_label || 'Tahun pengalaman' }}</span>
        </div>
        <div class="stat-bar-item">
          <span class="stat-bar-num">{{ settings?.stat_certs_num || '14' }}</span>
          <span class="stat-bar-label">{{ settings?.stat_certs_label || 'Sertifikasi profesional' }}</span>
        </div>
        <div class="stat-bar-item">
          <span class="stat-bar-num">{{ settings?.stat_papers_num || '800+' }}</span>
          <span class="stat-bar-label">{{ settings?.stat_papers_label || 'Sitasi karya ilmiah' }}</span>
        </div>
        <div class="stat-bar-item">
          <span class="stat-bar-num">{{ settings?.stat_affiliations_num || '4' }}</span>
          <span class="stat-bar-label">{{ settings?.stat_affiliations_label || 'Afiliasi institusi' }}</span>
        </div>
      </div>
    </div>

    <!-- Tentang Saya Section (Seksi 01 — Tentang Saya) -->
    <section id="about" class="doc-section-about-clean">
      <div class="section-container-doc">
        <!-- Section Header -->
        <div class="section-header-about-clean">
          <div class="about-num-label">01 — {{ settings?.about_badge || 'Tentang Saya' }}</div>
          <h2 class="about-title-serif">{{ settings?.about_title || 'Satu kaki di ruang kelas, satu kaki di lapangan.' }}</h2>
        </div>

        <div class="about-two-col-layout">
          <!-- Portrait Photo with Frame -->
          <div class="about-image-wrapper-doc" v-if="settings?.about_image_url">
            <div class="photo-attachment-frame">
              <img :src="settings.about_image_url" class="about-img-doc" alt="Dr. Rida Perwita Sari" />
              <!-- Notary Stamp / Official Seal (Dynamic SVG Element overlay) -->
              <svg class="seal-of-credentials" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1" />
                <path id="seal-curve" d="M 18 50 A 32 32 0 1 1 82 50" fill="none" stroke="transparent" />
                <text font-size="7" font-weight="bold" fill="currentColor">
                  <textPath href="#seal-curve" startOffset="50%" text-anchor="middle">
                    * DR. RIDA PERWITA SARI *
                  </textPath>
                </text>
                <text x="50" y="52" font-size="8" font-weight="bold" fill="currentColor" text-anchor="middle">VERITAS</text>
                <text x="50" y="62" font-size="5" fill="currentColor" text-anchor="middle">OFFICIAL SEAL</text>
              </svg>
            </div>
          </div>

          <!-- Left Column: Biography & Degrees -->
          <div class="about-left-bio-col">
            <div class="about-bio-paragraphs">
              <p v-for="(paragraph, idx) in formattedAboutDescription" :key="idx" v-html="paragraph"></p>
            </div>

            <!-- Degrees List -->
            <div class="degrees-list-block">
              <div v-for="(deg, idx) in educationDegrees" :key="idx" class="degree-row-item">
                <span class="degree-title">{{ deg.title }}</span>
                <span class="degree-field">{{ deg.field }}</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Categorized Certifications -->
          <div class="about-right-certs-col">
            <div v-for="(cat, idx) in certCategories" :key="idx" class="cert-category-group">
              <h4 class="cert-group-label">{{ cat.title }}</h4>
              <div class="cert-badges-wrap">
                <span v-for="(badge, bIdx) in cat.list" :key="bIdx" class="cert-badge-tag">{{ badge }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-clean-section">
      <div class="section-container-doc">
        <!-- Section Header -->
        <div class="services-section-header-clean">
          <div class="services-num-label-clean">02 — Bidang Fokus</div>
          <h2 class="services-title-serif-clean">{{ settings?.services_title || 'Tujuh bidang fokus, tiga ranah kerja.' }}</h2>
          <p class="services-intro-desc-clean">{{ settings?.services_subtitle || 'Dari ruang audit hingga ruang kelas — setiap bidang fokus berangkat dari kombinasi kompetensi akademik dan jam terbang praktik.' }}</p>
        </div>

        <!-- Loop through our predefined categories in order -->
        <div 
          class="services-category-block-clean" 
          v-for="categoryName in ['Untuk Institusi & Organisasi', 'Untuk Pengembangan SDM', 'Untuk Akademisi & Peneliti']" 
          :key="categoryName"
        >
          <!-- Category Title Header with line extension -->
          <div class="services-cat-header-clean">
            <h3 class="services-cat-title-clean">{{ categoryName }}</h3>
            <div class="services-cat-line-clean"></div>
          </div>

          <!-- Ledgers/Table style Grid Container -->
          <div class="services-ledger-grid">
            <!-- Render actual service cards -->
            <div 
              v-for="(srv, sIdx) in (servicesByCategory[categoryName] || [])" 
              :key="srv.id" 
              class="service-ledger-card"
            >
              <div class="service-card-num">{{ String(getServiceGlobalIndex(srv)).padStart(2, '0') }}</div>
              <h4 class="service-card-title">{{ srv.title }}</h4>
              <p class="service-card-text">{{ srv.description }}</p>
            </div>

            <!-- Render solid decorative placeholder blocks to fill up the 3-column layout if needed -->
            <div 
              v-for="pIdx in getPlaceholderCount(categoryName)" 
              :key="'placeholder-' + pIdx" 
              class="service-ledger-placeholder"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Publication Section (Seksi 03: Publikasi & Karya) -->
    <section id="blog" class="publications-clean-section">
      <div class="section-container-doc">
        <!-- Section Header -->
        <div class="pub-section-header-clean">
          <div class="pub-num-label-clean">03 — Publikasi & Karya</div>
          <h2 class="pub-title-serif-clean">{{ settings?.publications_title || 'Riset yang berbicara melalui sitasi.' }}</h2>
        </div>

        <div class="pub-two-col-layout">
          <!-- Left Column: Dynamic Publications Cards & Note Box -->
          <div class="pub-left-list-col">
            <div class="pub-cards-list-wrap">
              <div 
                v-for="pub in publications" 
                :key="pub.id" 
                class="pub-clean-card"
              >
                <!-- Render card content wrapped in anchor if link is present, or just as a div -->
                <component 
                  :is="pub.link ? 'a' : 'div'" 
                  :href="pub.link || undefined" 
                  :target="pub.link ? '_blank' : undefined" 
                  class="pub-card-content-link"
                >
                  <span class="pub-clean-type">{{ pub.type.toUpperCase() }}</span>
                  <h4 class="pub-clean-title">{{ pub.title }} <span v-if="pub.link" class="link-arrow">↗</span></h4>
                  <p class="pub-clean-desc">{{ pub.description }}</p>
                </component>
              </div>
            </div>

            <!-- Note Box -->
            <div class="pub-clean-note-box">
              <div class="pub-note-accent-line"></div>
              <div class="pub-note-content-wrap">
                <p class="pub-note-text">{{ settings?.publications_note || 'Catatan: tautan Google Scholar, Scopus, SINTA, dan/atau ORCID sebaiknya ditambahkan di sini agar pengunjung dapat menelusuri publikasi lengkap secara langsung.' }}</p>
                <!-- Academic Profiles Badges -->
                <div class="academic-profile-links-wrap" v-if="settings?.scholar_id || settings?.sinta_id || settings?.scopus_id || settings?.orcid_id">
                  <a v-if="settings?.scholar_id" :href="resolveAcademicLink(settings.scholar_id, '')" target="_blank" class="academic-badge-link scholar-badge">
                    <span class="badge-icon">🎓</span> Google Scholar
                  </a>
                  <a v-if="settings?.sinta_id" :href="resolveAcademicLink(settings.sinta_id, 'https://sinta.kemdikbud.go.id/authors/detail?id=')" target="_blank" class="academic-badge-link sinta-badge">
                    <span class="badge-icon">🇮🇩</span> SINTA ID
                  </a>
                  <a v-if="settings?.scopus_id" :href="resolveAcademicLink(settings.scopus_id, 'https://www.scopus.com/authid/detail.uri?authorId=')" target="_blank" class="academic-badge-link scopus-badge">
                    <span class="badge-icon">🔍</span> Scopus ID
                  </a>
                  <a v-if="settings?.orcid_id" :href="resolveAcademicLink(settings.orcid_id, 'https://orcid.org/')" target="_blank" class="academic-badge-link orcid-badge">
                    <span class="badge-icon">🆔</span> ORCID
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Big Solid Dark Green Citation Stat Card -->
          <div class="pub-right-stats-col">
            <div class="pub-dark-stats-box">
              <div class="pub-stat-number">{{ settings?.publications_citation_num || '800+' }}</div>
              <div class="pub-stat-label">{{ settings?.publications_citation_label || 'Sitasi karya ilmiah' }}</div>
              <p class="pub-stat-desc">{{ settings?.citation_text || settings?.publications_citation_desc || 'Karya-karya ilmiah saya telah disitasi lebih dari 800 kali oleh peneliti lain — indikator kontribusi nyata bagi perkembangan ilmu akuntansi sektor publik dan audit, baik di tingkat nasional maupun internasional.' }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marquee Banner (Audit Marquee Ribbon) -->
    <div class="marquee-banner-doc">
      <div class="marquee-content-doc">
        <span>INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC &nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>

    <!-- Contact Section (Seksi 04: Kontak) -->
    <section id="contact" class="contact-clean-section">
      <div class="section-container-doc">
        <!-- Section Header -->
        <div class="contact-section-header-clean">
          <div class="contact-num-label-clean">04 — Kontak</div>
          <h2 class="contact-title-serif-clean">{{ settings?.contact_title || 'Mari berkolaborasi.' }}</h2>
          <p class="contact-intro-desc-clean">{{ settings?.contact_subtitle || 'Apakah Anda mewakili instansi yang membutuhkan jasa audit, organisasi yang ingin memperkuat tata kelola, atau penyelenggara acara yang mencari narasumber — saya terbuka untuk berdiskusi.' }}</p>
        </div>

        <div class="contact-two-col-layout">
          <!-- Left Column: Affiliations -->
          <div class="contact-affiliations-col-clean">
            <ul class="contact-aff-list-clean">
              <li v-for="(aff, idx) in contactAffiliationsList" :key="idx" class="contact-aff-item-clean">
                <span class="contact-aff-marker">■</span>
                <span class="contact-aff-text">{{ aff }}</span>
              </li>
            </ul>
          </div>

          <!-- Right Column: Premium Contact Form Container -->
          <div class="contact-form-col-clean">
            <div class="contact-form-container-clean">
              <!-- Notification Toast inside form card -->
              <div v-if="contactNotification.show" :class="['contact-toast-doc-clean', contactNotification.type]">
                <span class="toast-icon-doc-clean">{{ contactNotification.type === 'success' ? '✓' : '✗' }}</span>
                <span class="toast-msg-doc-clean">{{ contactNotification.message }}</span>
              </div>

              <form @submit.prevent="submitContactForm" class="contact-form-clean">
                <div class="form-group-clean">
                  <label class="form-label-clean">NAMA</label>
                  <input type="text" v-model="contactForm.name" class="form-input-clean" placeholder="Nama lengkap Anda" required />
                </div>

                <div class="form-group-clean">
                  <label class="form-label-clean">EMAIL</label>
                  <input type="email" v-model="contactForm.email" class="form-input-clean" placeholder="nama@institusi.com" required />
                </div>

                <div class="form-group-clean">
                  <label class="form-label-clean">TOPIK</label>
                  <input type="text" v-model="contactForm.topic" class="form-input-clean" placeholder="Audit / Konsultasi / Pelatihan / Lainnya" required />
                </div>

                <div class="form-group-clean">
                  <label class="form-label-clean">PESAN</label>
                  <textarea rows="4" v-model="contactForm.message" class="form-textarea-clean" placeholder="Tuliskan kebutuhan Anda..." required></textarea>
                </div>

                <button type="submit" class="btn-submit-clean" :disabled="submittingForm">
                  {{ submittingForm ? 'Mengirim...' : 'Kirim pesan' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Minimal Official Footer -->
    <footer class="footer-clean-doc">
      <div class="footer-container-clean-doc">
        <div class="footer-left-clean-doc">
          <p class="copyright-clean-doc">© 2026 Dr. Rida Perwita Sari</p>
        </div>
        <div class="footer-right-clean-doc">
          <a :href="settings?.contact_linkedin || '#'" target="_blank" class="footer-link-item">LinkedIn</a>
          <a :href="settings?.scholar_id || '#'" target="_blank" class="footer-link-item">Google Scholar</a>
          <a :href="'mailto:' + (settings?.contact_email || '')" class="footer-link-item">Email</a>
        </div>
      </div>
    </footer>

    <!-- Blog Detail Modal Backdrop (Doc Paper Detail Modal) -->
    <div v-if="activeBlogPost" class="blog-modal-backdrop-doc" @click.self="closeBlogPost">
      <div class="blog-modal-card-doc">
        <div class="modal-card-top-bar">
          <span>DOKUMEN PUBLIKASI RESMI - ARSIP RPS</span>
          <button class="btn-close-modal-doc" @click="closeBlogPost">×</button>
        </div>
        <div class="modal-header-doc">
          <span class="modal-date-doc">Diterbitkan: {{ formatDate(activeBlogPost.created_at) }}</span>
          <h2>{{ activeBlogPost.title }}</h2>
          <div class="modal-title-line"></div>
        </div>
        <div class="modal-body-doc">
          <div class="modal-banner-wrapper">
            <img :src="activeBlogPost.image_url" :alt="activeBlogPost.title" class="modal-banner-doc" />
          </div>
          <div class="modal-content-text-doc">
            <p v-for="(paragraph, idx) in activeBlogPost.content.split('\n')" :key="idx">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div class="modal-card-footer-doc">
          <span>Tanda Tangan Elektronik Bersertifikasi (Escrow)</span>
          <button class="btn-modal-close-bottom" @click="closeBlogPost">Tutup Dokumen</button>
        </div>
      </div>
    </div>

    <!-- About/Credentials Detail Modal Backdrop -->
    <div v-if="showAboutModal" class="blog-modal-backdrop-doc" @click.self="closeAboutModal">
      <div class="blog-modal-card-doc credential-modal-card">
        <div class="modal-card-top-bar">
          <span>BERKAS LAMPIRAN: AFIDAVIT KREDENSIAL LENGKAP - ARSIP RPS</span>
          <button class="btn-close-modal-doc" @click="closeAboutModal">×</button>
        </div>
        <div class="modal-header-doc">
          <span class="modal-date-doc">Status Dokumen: Terverifikasi Resmi</span>
          <h2>Kredensial, Sertifikasi & Kontribusi Ilmiah</h2>
          <div class="modal-title-line"></div>
        </div>
        <div class="modal-body-doc credential-modal-body">
          <div class="credential-columns-grid">
            <!-- Left Column: Pendidikan & Kontribusi Ilmiah -->
            <div class="credential-col-left">
              <div class="credential-section-block">
                <h3 class="credential-block-title">I. RIWAYAT PENDIDIKAN AKADEMIK</h3>
                <ul class="credential-list">
                  <li><strong>Doktor (S3)</strong> — Ilmu Ekonomi / Konsentrasi Akuntansi</li>
                  <li><strong>Magister Akuntansi (M.Aks.)</strong></li>
                  <li><strong>Sarjana Ekonomi (S.E.)</strong></li>
                </ul>
              </div>

              <div class="credential-section-block" style="margin-top: 2.5rem;">
                <h3 class="credential-block-title">II. KONTRIBUSI ILMIAH & AKADEMIK</h3>
                <ul class="credential-list">
                  <li>Lebih dari <strong>800 sitasi</strong> atas karya-karya ilmiah terpublikasi.</li>
                  <li>Publikasi jurnal internasional bereputasi, termasuk di <em>Journal of Financial Crime</em>.</li>
                  <li>Penulis buku <em>Pemeriksaan Akuntansi & Contoh Kasus di Indonesia</em>.</li>
                  <li>Reviewer aktif di jurnal ilmiah terakreditasi nasional maupun bereputasi internasional.</li>
                  <li>Pembimbing penelitian mahasiswa aktif tingkat S1 dan S2.</li>
                </ul>
              </div>
            </div>

            <!-- Right Column: 14 Sertifikasi Profesional -->
            <div class="credential-col-right">
              <h3 class="credential-block-title">III. SERTIFIKASI PROFESIONAL (14 KOMPETENSI)</h3>
              <p class="credential-intro">Memiliki sertifikasi resmi tingkat nasional dan internasional yang mencakup kepatuhan audit, forensik, tata kelola, dan risiko:</p>
              
              <div class="certification-subgrids">
                <div class="cert-category-box">
                  <h4>Akuntansi & Audit</h4>
                  <ul>
                    <li><strong>Ak.</strong> (Akuntan Resmi Negara)</li>
                    <li><strong>CA.</strong> (Chartered Accountant)</li>
                    <li><strong>CPA.</strong> (Certified Public Accountant)</li>
                    <li><strong>CFrA.</strong> (Certified Forensic Auditor)</li>
                  </ul>
                </div>

                <div class="cert-category-box">
                  <h4>Manajemen Risiko & Tata Kelola</h4>
                  <ul>
                    <li><strong>CERA.</strong></li>
                    <li><strong>CRA.</strong></li>
                    <li><strong>CRP.</strong></li>
                    <li><strong>GRCE.</strong></li>
                  </ul>
                </div>

                <div class="cert-category-box">
                  <h4>Sektor Publik Internasional</h4>
                  <ul>
                    <li><strong>CIPSAS.</strong></li>
                  </ul>
                </div>

                <div class="cert-category-box">
                  <h4>Bisnis Internasional</h4>
                  <ul>
                    <li><strong>CIBA.</strong></li>
                  </ul>
                </div>

                <div class="cert-category-box">
                  <h4>Manajemen Proyek</h4>
                  <ul>
                    <li><strong>CAPM.</strong></li>
                  </ul>
                </div>

                <div class="cert-category-box">
                  <h4>Mediasi</h4>
                  <ul>
                    <li><strong>Mediator Bersertifikat</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-card-footer-doc">
          <span>Kearsipan Kredensial Akademik UPN "Veteran" Jatim & KAP MNK</span>
          <button class="btn-modal-close-bottom" @click="closeAboutModal">Tutup Berkas</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { data: settings } = await useFetch('/api/settings')
const { data: projects } = await useFetch('/api/projects')
const { data: services } = await useFetch('/api/services')
const { data: blogs } = await useFetch('/api/blogs')
const { data: publications } = await useFetch('/api/publications')

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

if (process.client) {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}

const resolveAcademicLink = (val, prefix) => {
  if (!val) return '#'
  const cleanVal = val.trim()
  if (cleanVal.startsWith('http://') || cleanVal.startsWith('https://')) return cleanVal
  return prefix + cleanVal
}

const formattedHeroHeadline = computed(() => {
  const text = settings.value?.hero_title_highlight || 'Menjembatani riset akuntansi dengan praktik tata kelola yang akuntabel.'
  return text.replace(/riset/gi, '<span class="highlight-gold-italic">riset</span>')
})

const showAboutModal = ref(false)

const openAboutModal = () => {
  showAboutModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeAboutModal = () => {
  showAboutModal.value = false
  document.body.style.overflow = ''
}

const defaultAboutDescription = `Perjalanan saya di dunia akuntansi dimulai lebih dari 16 tahun lalu, dan sejak saat itu saya memilih untuk tidak berhenti hanya di satu peran. Saya adalah dosen Akuntansi Sektor Publik di Program Studi Akuntansi, Fakultas Ekonomi dan Bisnis, UPN “Veteran” Jawa Timur — tempat saya membimbing generasi akuntan dan auditor masa depan. Namun ruang kelas hanyalah satu bagian dari perjalanan saya.

Di sisi praktik, saya berperan sebagai auditor dan akuntan publik di KAP Mahsun, Nurdiono, Kukuh dan Rekan (KAP MNK & Rekan), serta sebagai praktisi dan tenaga ahli di Drastha Consulting dan Drastha Learning. Kombinasi ini memungkinkan saya menjembatani teori dan praktik secara langsung — sesuatu yang saya yakini menjadi kekuatan utama dalam memberikan layanan maupun pengajaran yang relevan dengan kebutuhan riil di lapangan.`

const formattedAboutDescription = computed(() => {
  const rawText = settings.value?.about_description || defaultAboutDescription
  return rawText.split('\n\n').map(p => {
    let text = p
    text = text.replace(/dosen Akuntansi Sektor Publik/gi, '<strong>dosen Akuntansi Sektor Publik</strong>')
    text = text.replace(/auditor dan akuntan publik/gi, '<strong>auditor dan akuntan publik</strong>')
    text = text.replace(/KAP Mahsun, Nurdiono, Kukuh dan Rekan \(KAP MNK & Rekan\)/gi, '<strong>KAP Mahsun, Nurdiono, Kukuh dan Rekan (KAP MNK & Rekan)</strong>')
    text = text.replace(/Drastha Consulting/gi, '<strong>Drastha Consulting</strong>')
    text = text.replace(/Drastha Learning/gi, '<strong>Drastha Learning</strong>')
    return text
  })
})

const educationDegrees = computed(() => {
  return [
    {
      title: settings.value?.about_degree1_title || 'Doktor (S3)',
      field: settings.value?.about_degree1_field || 'Ilmu Ekonomi / Akuntansi'
    },
    {
      title: settings.value?.about_degree2_title || 'Magister Akuntansi',
      field: settings.value?.about_degree2_field || 'M.Aks.'
    },
    {
      title: settings.value?.about_degree3_title || 'Sarjana Ekonomi',
      field: settings.value?.about_degree3_field || 'S.E.'
    }
  ]
})

const certCategories = computed(() => {
  return [
    {
      title: settings.value?.certs_category1_title || 'AKUNTANSI & AUDIT',
      list: (settings.value?.certs_category1_list || 'Ak., CA., CPA., CFrA.').split(',').map(s => s.trim())
    },
    {
      title: settings.value?.certs_category2_title || 'MANAJEMEN RISIKO & TATA KELOLA',
      list: (settings.value?.certs_category2_list || 'CERA., CRA., CRP., GRCE.').split(',').map(s => s.trim())
    },
    {
      title: settings.value?.certs_category3_title || 'SEKTOR PUBLIK & BISNIS INTERNASIONAL',
      list: (settings.value?.certs_category3_list || 'CIPSAS., CIBA.').split(',').map(s => s.trim())
    },
    {
      title: settings.value?.certs_category4_title || 'MANAJEMEN PROYEK & MEDIASI',
      list: (settings.value?.certs_category4_list || 'CAPM., Mediator Bersertifikat').split(',').map(s => s.trim())
    }
  ]
})

const publishedBlogs = computed(() => {
  if (!blogs.value) return []
  return blogs.value.filter(post => post.status === 'published')
})

const servicesByCategory = computed(() => {
  if (!services.value) return {}
  const groups = {}
  services.value.forEach(srv => {
    const cat = srv.category || 'Umum'
    if (!groups[cat]) {
      groups[cat] = []
    }
    groups[cat].push(srv)
  })
  return groups
})

const getServiceGlobalIndex = (srv) => {
  if (!services.value) return 0
  const idx = services.value.findIndex(s => s.id === srv.id)
  return idx !== -1 ? idx + 1 : 0
}

const getPlaceholderCount = (categoryName) => {
  const count = (servicesByCategory.value[categoryName] || []).length
  return count > 0 && count < 3 ? 3 - count : 0
}

const publicationsByType = computed(() => {
  if (!publications.value) return {}
  const groups = {}
  publications.value.forEach(pub => {
    const type = pub.type || 'Lainnya'
    if (!groups[type]) {
      groups[type] = []
    }
    groups[type].push(pub)
  })
  return groups
})

const activeBlogPost = ref(null)

const openBlogPost = (post) => {
  activeBlogPost.value = post
  document.body.style.overflow = 'hidden' // Lock background scrolling
}

const closeBlogPost = () => {
  activeBlogPost.value = null
  document.body.style.overflow = '' // Unlock scrolling
}

const getExcerpt = (text) => {
  if (!text) return ''
  const clean = text.replace(/[\n\r]+/g, ' ')
  return clean.length > 120 ? clean.substring(0, 117) + '...' : clean
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

useHead({
  title: 'Dr. Rida Perwita Sari, SE, MAks, Ak, CPA, CFrA, CIPSAS, GRCE',
  meta: [
    { name: 'description', content: 'Personal Branding & Professional Portfolio of Dr. Rida Perwita Sari - Expert Auditor, Academician, Forensic Accountant, and Public Sector Advisory Consultant.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400..700;1,400..700&display=swap' }
  ]
})

const contactForm = ref({
  name: '',
  email: '',
  institution: '',
  topic: '',
  message: ''
})
const submittingForm = ref(false)
const contactNotification = ref({ show: false, message: '', type: 'success' })

const submitContactForm = async () => {
  submittingForm.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: contactForm.value
    })
    contactNotification.value = {
      show: true,
      message: 'Korespondensi Anda telah terkirim secara resmi. Terima kasih atas pesan Anda.',
      type: 'success'
    }
    contactForm.value = {
      name: '',
      email: '',
      institution: '',
      topic: '',
      message: ''
    }
    setTimeout(() => {
      contactNotification.value.show = false
    }, 6000)
  } catch (error) {
    // Fallback to WhatsApp for static deployment!
    const waNumber = '6281250080809' // Default fallback phone number if not configured
    const rawPhone = settings.value?.contact_phone || waNumber
    let cleanPhone = rawPhone.replace(/[^0-9]/g, '')
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1)
    }
    
    const text = `Halo Ibu Rida,\n\nSaya *${contactForm.value.name}* (${contactForm.value.email}) ingin berkonsultasi mengenai:\n\n*Topik:* ${contactForm.value.topic}\n*Pesan:* ${contactForm.value.message}`
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
    
    window.open(waUrl, '_blank')
    
    contactNotification.value = {
      show: true,
      message: 'Membuka WhatsApp untuk mengirim pesan secara langsung...',
      type: 'success'
    }
    contactForm.value = {
      name: '',
      email: '',
      institution: '',
      topic: '',
      message: ''
    }
    setTimeout(() => {
      contactNotification.value.show = false
    }, 6000)
  } finally {
    submittingForm.value = false
  }
}

const contactAffiliationsList = computed(() => {
  if (!settings.value?.contact_affiliations) return []
  return settings.value.contact_affiliations.split('\n').filter(item => item.trim() !== '')
})
</script>

<style>
/* Global Reset and Document Styling */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  color: #3d3d3d;
  background-color: #FFFAF3; /* Cream ivory paper */
  line-height: 1.6;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

:root {
  --color-ink-dark: #0f2b1d; /* Hijau tinta gelap */
  --color-sage-secondary: #2c4a3b; /* Hijau sage sekunder */
  --color-paper-light: #FFFAF3; /* Kertas gading ivory */
  --color-bg-light: #FFFAF3; /* Latar belakang utama */
  --color-bronze-accent: #b8860b; /* Kuning perunggu / segel resmi */
  --color-text-body: #3d3d3d;
  --font-serif: 'Lora', serif;
  --font-sans: 'Inter', sans-serif;
}

/* Watermark Background */
.paper-watermark {
  position: fixed;
  font-family: var(--font-serif);
  font-size: 14vw;
  font-weight: 800;
  color: rgba(44, 74, 59, 0.02);
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-25deg);
  z-index: 0;
}

/* Buttons */
.btn-doc-primary {
  display: inline-block;
  background-color: var(--color-bronze-accent);
  color: var(--color-paper-light);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  border: 1px solid var(--color-bronze-accent);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(184, 134, 11, 0.15);
}

.btn-doc-primary:hover {
  background-color: transparent;
  color: var(--color-bronze-accent);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(184, 134, 11, 0.25);
}

.btn-doc-secondary {
  display: inline-block;
  background-color: transparent;
  color: var(--color-paper-light);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  border: 1px solid rgba(247, 244, 237, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-doc-secondary:hover {
  background-color: rgba(247, 244, 237, 0.08);
  border-color: var(--color-paper-light);
  transform: translateY(-2px);
}

/* Navigation Header Style */
.doc-header-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.2rem 4rem;
  z-index: 100;
  background-color: var(--color-paper-light);
  border-top: 3.5px solid var(--color-sage-secondary);
  border-bottom: 1px solid rgba(44, 74, 59, 0.1);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.doc-header-main.scrolled {
  background-color: rgba(255, 250, 243, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.8rem 4rem;
  box-shadow: 0 4px 20px rgba(15, 43, 29, 0.05);
}

.header-container-doc {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo-block {
  display: flex;
  align-items: center;
}

.header-logo-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--color-ink-dark);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  margin-right: 0.8rem;
  background-color: transparent;
}

.header-logo-badge::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  border: 1px solid var(--color-bronze-accent);
}

.header-logo-badge-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.header-logo-text-group {
  display: flex;
  flex-direction: column;
}

.header-logo-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  line-height: 1.2;
}

.header-logo-subtitle {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-sage-secondary);
  margin-top: 0.1rem;
}

.header-nav-links {
  display: flex;
  gap: 2.2rem;
}

.header-nav-links a {
  color: var(--color-ink-dark);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: color 0.3s;
}

.header-nav-links a:hover {
  color: var(--color-bronze-accent);
}

.btn-header-cta {
  display: inline-block;
  background-color: transparent;
  color: var(--color-ink-dark);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 0.5rem 1.2rem;
  border-radius: 2px;
  border: 1.5px solid var(--color-ink-dark);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-header-cta:hover {
  background-color: var(--color-ink-dark);
  color: var(--color-paper-light);
}

/* Hero Section (Light Ledger Style) */
.hero-doc-section-light {
  position: relative;
  background-color: var(--color-paper-light);
  padding: 10rem 4rem 3rem 4rem;
  color: var(--color-ink-dark);
  z-index: 2;
}

.hero-container-doc-light {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 4rem;
  align-items: center;
}

.hero-tag-light {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.hero-tag-light .gold-line {
  color: var(--color-bronze-accent);
  font-weight: bold;
}

.hero-tag-light .tag-text {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-bronze-accent);
  letter-spacing: 0.2em;
}

.hero-title-doc-light {
  font-family: var(--font-serif);
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--color-ink-dark);
}

.highlight-gold-italic {
  color: var(--color-bronze-accent);
  font-style: italic;
}

.hero-name-sub {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-ink-dark);
  margin-bottom: 1.5rem;
}

.hero-desc-light {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-text-body);
  margin-bottom: 2.5rem;
  max-width: 650px;
}

.hero-actions-light {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.btn-light-primary {
  display: inline-block;
  background-color: var(--color-ink-dark);
  color: var(--color-paper-light);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.9rem 2.2rem;
  border-radius: 2px;
  border: 1px solid var(--color-ink-dark);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-light-primary:hover {
  background-color: var(--color-bronze-accent);
  border-color: var(--color-bronze-accent);
  transform: translateY(-2px);
}

.btn-light-secondary {
  display: inline-block;
  background-color: transparent;
  color: var(--color-ink-dark);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.9rem 2.2rem;
  border-radius: 2px;
  border: 1px solid rgba(15, 43, 29, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-light-secondary:hover {
  border-color: var(--color-ink-dark);
  background-color: rgba(15, 43, 29, 0.02);
  transform: translateY(-2px);
}

.hero-seal-wrapper-light {
  display: flex;
  justify-content: center;
}

.seal-large-doc {
  width: 290px;
  height: 290px;
  border-radius: 50%;
  border: 0.8px solid rgba(15, 43, 29, 0.15);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(247, 244, 237, 0.4);
  margin: 0 auto;
}

.seal-large-doc::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 0.8px solid rgba(15, 43, 29, 0.25);
}

.seal-large-doc-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  z-index: 1;
}

.seal-inner-circle-double {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
}

.seal-initials-text {
  font-family: var(--font-serif);
  font-size: 3.8rem;
  font-weight: 400;
  color: var(--color-ink-dark);
  line-height: 1;
  letter-spacing: 0.05em;
}

.seal-gold-divider {
  width: 45px;
  height: 1.5px;
  background-color: var(--color-bronze-accent);
  margin: 0.8rem 0;
}

.seal-credentials-block {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-ink-dark);
  letter-spacing: 0.15em;
  line-height: 1.6;
}

.seal-line {
  white-space: nowrap;
}

/* Stats Bar */
.hero-stats-bar-light {
  width: 100%;
  background-color: #FFF2DB; /* Cream yellow highlight */
  border-top: 1.5px solid rgba(184, 134, 11, 0.35); /* Elegant gold/bronze top border */
  border-bottom: 1.5px solid rgba(184, 134, 11, 0.35); /* Elegant gold/bronze bottom border */
  padding: 2.2rem 2rem;
}

.stats-bar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
}

.stat-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-bar-item:not(:first-child) {
  border-left: 1.5px solid rgba(184, 134, 11, 0.25); /* Elegant vertical bronze dividers */
}

.stat-bar-num {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  line-height: 1.1;
  margin-bottom: 0.3rem;
}

.stat-bar-label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-body);
  letter-spacing: 0.02em;
}

/* Responsiveness for Stats Bar */
@media (max-width: 768px) {
  .stats-bar-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 0;
  }
  .stat-bar-item:not(:first-child) {
    border-left: none;
  }
  .stat-bar-item:nth-child(even) {
    border-left: 1.5px solid rgba(184, 134, 11, 0.25);
  }
}

@media (max-width: 480px) {
  .stats-bar-container {
    grid-template-columns: 1fr;
    gap: 1.5rem 0;
  }
  .stat-bar-item {
    border-left: none !important;
  }
  .stat-bar-item:not(:last-child) {
    border-bottom: 1.5px solid rgba(184, 134, 11, 0.15);
    padding-bottom: 1.5rem;
  }
}


/* Photo Attachment Frame (Official Document Style Photo) */
.photo-attachment-frame {
  position: relative;
  background: #ffffff;
  padding: 1.2rem 1.2rem 3.5rem 1.2rem;
  box-shadow: 0 15px 40px rgba(0,0,0,0.25);
  border: 1px solid rgba(0,0,0,0.08);
  transform: rotate(1deg);
  width: 100%;
  max-width: 350px;
}

.photo-attachment-frame.large {
  max-width: 400px;
  transform: rotate(-1.5deg);
  border: 1px solid rgba(44, 74, 59, 0.12);
  background: #faf9f6;
  box-shadow: 0 10px 30px rgba(44, 74, 59, 0.08);
}

.hero-img-doc, .about-img-doc {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: grayscale(15%) sepia(8%);
  border: 1px solid rgba(0,0,0,0.05);
}

/* Notary Stamp / Official Seal (Dynamic SVG Element) */
.seal-of-credentials {
  position: absolute;
  width: 110px;
  height: 110px;
  bottom: -25px;
  left: -25px;
  color: var(--color-bronze-accent);
  background-color: transparent;
  transform: rotate(-12deg);
  z-index: 5;
  filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.15));
  animation: rotateSlow 25s linear infinite;
  pointer-events: none;
}

@keyframes rotateSlow {
  from { transform: rotate(-12deg); }
  to { transform: rotate(348deg); }
}

.seal-svg {
  width: 100%;
  height: 100%;
}

.official-watermark-stamp {
  position: absolute;
  border: 2px solid rgba(184, 134, 11, 0.35);
  color: rgba(184, 134, 11, 0.35);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  padding: 0.3rem 0.8rem;
  text-transform: uppercase;
  transform: rotate(-25deg);
  bottom: 25px;
  right: 25px;
}

/* Projects - Numbered Clauses list */
.projects-document-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(44, 74, 59, 0.15);
  margin-top: 2rem;
}

.project-doc-row {
  display: grid;
  grid-template-columns: 1.5fr 6.5fr 2fr;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(44, 74, 59, 0.12);
  align-items: center;
  transition: background-color 0.3s;
}

.project-doc-row:hover {
  background-color: rgba(44, 74, 59, 0.02);
}

.doc-meta-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.doc-clause {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--color-ink-dark);
}

.doc-status-badge {
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  letter-spacing: 0.1em;
}

.doc-body-col h3 {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  margin-bottom: 0.6rem;
}

.doc-body-col p {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-text-body);
  max-width: 680px;
}

.doc-action-col {
  display: flex;
  justify-content: flex-end;
}

.btn-doc-row-action {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s, transform 0.3s;
}

.btn-doc-row-action:hover {
  color: var(--color-bronze-accent);
  transform: translateX(4px);
}

/* Services Section (Seksi 02 — Layanan) Styling */
.services-clean-section {
  padding: 6rem 4rem;
  background-color: var(--color-bg-light); /* Ivory/paper background */
  border-top: 1px solid rgba(44, 74, 59, 0.12);
}

.services-section-header-clean {
  margin-bottom: 3.5rem;
}

.services-num-label-clean {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.services-title-serif-clean {
  font-family: var(--font-serif);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  line-height: 1.25;
  margin: 0 0 1.2rem 0;
}

.services-intro-desc-clean {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text-main);
  max-width: 720px;
  margin: 0;
}

.services-category-block-clean {
  margin-bottom: 4rem;
}

.services-cat-header-clean {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.8rem;
}

.services-cat-title-clean {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-ink-dark);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  margin: 0;
}

.services-cat-line-clean {
  flex-grow: 1;
  height: 1.5px;
  background-color: rgba(184, 134, 11, 0.35); /* Subtle bronze line */
}

.services-ledger-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: transparent;
  border: 1px solid rgba(44, 74, 59, 0.18);
  border-radius: 2px;
}

.service-ledger-card {
  background-color: transparent;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  transition: all 0.25s ease;
}

.service-ledger-card:not(:first-child) {
  border-left: 1px solid rgba(44, 74, 59, 0.18);
}

.service-ledger-card:hover {
  background-color: rgba(44, 74, 59, 0.02);
}

.service-card-num {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  margin-bottom: 1.8rem;
}

.service-card-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  margin-bottom: 0.90rem;
}

.service-card-text {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-body);
  margin: 0;
}

.service-ledger-placeholder {
  background-color: #9ca8a0; /* Muted solid sage-green block matching the user image */
  transition: all 0.25s ease;
}

.service-ledger-placeholder:not(:first-child) {
  border-left: 1px solid rgba(44, 74, 59, 0.18);
}

/* Responsiveness for Services Section */
@media (max-width: 992px) {
  .services-ledger-grid {
    grid-template-columns: 1fr;
  }
  .service-ledger-card:not(:first-child) {
    border-left: none;
    border-top: 1px solid rgba(44, 74, 59, 0.18);
  }
  .service-ledger-placeholder {
    display: none; /* Hide placeholders on mobile stacked layout */
  }
}

@media (max-width: 768px) {
  .services-clean-section {
    padding: 4rem 2rem;
  }
  .services-title-serif-clean {
    font-size: 2.2rem;
  }
}

/* About Section (Seksi 01 — Tentang Saya) Styling */
.doc-section-about-clean {
  padding: 6rem 4rem;
  background-color: var(--color-bg-light); /* Ivory/paper background */
  border-top: 1px solid rgba(44, 74, 59, 0.12);
}

.section-header-about-clean {
  margin-bottom: 3.5rem;
}

.about-num-label {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.about-title-serif {
  font-family: var(--font-serif);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  line-height: 1.25;
  margin: 0;
}

.about-two-col-layout {
  display: grid;
  grid-template-columns: 280px 1.25fr 1fr;
  gap: 5rem;
  align-items: start;
}

.about-left-bio-col {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.about-bio-paragraphs {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-main);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 0;
}

.about-bio-paragraphs strong {
  color: var(--color-ink-dark);
  font-weight: 700;
}

.degrees-list-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.degree-row-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.85rem;
  border-bottom: 1.5px solid rgba(184, 134, 11, 0.2); /* Bronze border under degrees */
}

.degree-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink-dark);
}

.degree-field {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-text-body);
  font-style: italic;
}

.about-right-certs-col {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}

.cert-category-group {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.cert-group-label {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}

.cert-badges-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.cert-badge-tag {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-ink-dark);
  background-color: rgba(44, 74, 59, 0.03);
  border: 1px solid rgba(44, 74, 59, 0.15);
  padding: 0.55rem 1rem;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.cert-badge-tag:hover {
  background-color: var(--color-bronze-accent);
  color: #ffffff;
  border-color: var(--color-bronze-accent);
  transform: translateY(-1px);
}

/* Responsiveness for new About section */
@media (max-width: 992px) {
  .about-two-col-layout {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}

@media (max-width: 768px) {
  .doc-section-about-clean {
    padding: 4rem 2rem;
  }
  .about-title-serif {
    font-size: 2.2rem;
  }
}

/* Publications Section (Seksi 03 — Publikasi & Karya) Styling */
.publications-clean-section {
  padding: 6rem 4rem;
  background-color: var(--color-bg-light); /* Ivory/paper background */
  border-top: 1px solid rgba(44, 74, 59, 0.12);
}

.pub-section-header-clean {
  margin-bottom: 3.5rem;
}

.pub-num-label-clean {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.pub-title-serif-clean {
  font-family: var(--font-serif);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  line-height: 1.25;
  margin: 0;
}

.pub-two-col-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: stretch;
}

.pub-left-list-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
}

.pub-cards-list-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pub-clean-card {
  background-color: transparent;
  border: 1px solid rgba(44, 74, 59, 0.18);
  border-radius: 2px;
  transition: all 0.25s ease;
}

.pub-clean-card:hover {
  background-color: rgba(44, 74, 59, 0.02);
  border-color: var(--color-bronze-accent);
}

.pub-card-content-link {
  display: block;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
}

.pub-clean-type {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  letter-spacing: 0.08em;
  margin-bottom: 0.85rem;
  display: block;
}

.pub-clean-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  margin: 0 0 0.75rem 0;
}

.pub-clean-title .link-arrow {
  font-size: 0.95rem;
  margin-left: 0.25rem;
  color: var(--color-bronze-accent);
  transition: transform 0.25s ease;
  display: inline-block;
}

.pub-clean-card:hover .link-arrow {
  transform: translate(2px, -2px);
}

.pub-clean-desc {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-body);
  margin: 0;
}

.pub-clean-note-box {
  display: flex;
  align-items: stretch;
  background-color: #eae7df; /* Slightly darker paper/ivory background */
  border-radius: 2px;
  overflow: hidden;
}

.pub-note-accent-line {
  width: 4px;
  background-color: var(--color-bronze-accent);
  flex-shrink: 0;
}

.pub-note-text {
  font-family: var(--font-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text-body);
  padding: 0;
  margin: 0;
}

.pub-note-content-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.25rem 1.5rem;
  width: 100%;
}

.academic-profile-links-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.academic-badge-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--color-paper-light);
  color: var(--color-ink-dark);
  border: 1px solid rgba(44, 74, 59, 0.15);
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 20px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.academic-badge-link:hover {
  background-color: var(--color-sage-secondary);
  color: #ffffff;
  border-color: var(--color-sage-secondary);
  transform: translateY(-1.5px);
  box-shadow: 0 4px 10px rgba(44, 74, 59, 0.1);
}

.academic-badge-link .badge-icon {
  font-size: 0.95rem;
}

.pub-right-stats-col {
  display: flex;
}

.pub-dark-stats-box {
  background-color: #0f2b1d; /* Matches var(--color-ink-dark) or `#0F2B1D` */
  color: #faf9f6;
  padding: 4.5rem 3.5rem;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
}

.pub-stat-number {
  font-family: var(--font-serif);
  font-size: 5rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  line-height: 1;
  margin-bottom: 1rem;
}

.pub-stat-label {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.pub-stat-desc {
  font-family: var(--font-sans);
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(250, 249, 246, 0.75);
  max-width: 380px;
  margin: 0;
}

/* Responsiveness for Publications */
@media (max-width: 992px) {
  .pub-two-col-layout {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}

@media (max-width: 768px) {
  .publications-clean-section {
    padding: 4rem 2rem;
  }
  .pub-title-serif-clean {
    font-size: 2.2rem;
  }
  .pub-dark-stats-box {
    padding: 3rem 2rem;
  }
  .pub-stat-number {
    font-size: 4rem;
  }
}

/* Marquee ribbon */
.marquee-banner-doc {
  background-color: var(--color-bronze-accent);
  color: var(--color-paper-light);
  padding: 1.2rem 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(247, 244, 237, 0.2);
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.marquee-content-doc {
  display: flex;
  white-space: nowrap;
  animation: marquee 25s linear infinite;
}

.marquee-content-doc span {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}

@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-33.33%, 0, 0); }
}

/* Footer Section */
/* Footer Section */
.footer-clean-doc {
  background-color: #0f2b1d; /* Solid matching dark green background */
  color: #faf9f6;
  padding: 2.5rem 4rem;
  border-top: 1px solid rgba(250, 249, 246, 0.1);
  position: relative;
  z-index: 2;
}

.footer-container-clean-doc {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright-clean-doc {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: rgba(250, 249, 246, 0.45);
  margin: 0;
}

.footer-right-clean-doc {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.footer-link-item {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(250, 249, 246, 0.65);
  text-decoration: none;
  transition: color 0.25s ease;
}

.footer-link-item:hover {
  color: var(--color-bronze-accent);
}

/* Modal Paper Design */
.blog-modal-backdrop-doc {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 43, 29, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.blog-modal-card-doc {
  background-color: var(--color-paper-light);
  border: 2px solid var(--color-ink-dark);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0,0,0,0.45);
  animation: modalSlideUp 0.35s ease-out;
  position: relative;
}

@keyframes modalSlideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-card-top-bar {
  background-color: var(--color-ink-dark);
  color: var(--color-paper-light);
  padding: 0.8rem 1.8rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close-modal-doc {
  background: transparent;
  border: none;
  color: var(--color-paper-light);
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.3s;
}

.btn-close-modal-doc:hover {
  color: var(--color-bronze-accent);
}

.modal-header-doc {
  padding: 2.5rem 3rem 1rem 3rem;
}

.modal-date-doc {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
}

.modal-header-doc h2 {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-ink-dark);
  line-height: 1.25;
  margin-top: 0.5rem;
}

.modal-title-line {
  width: 100%;
  height: 1px;
  background-color: rgba(44, 74, 59, 0.15);
  margin-top: 1.5rem;
}

.modal-body-doc {
  padding: 1rem 3rem 2.5rem 3rem;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-banner-wrapper {
  margin-bottom: 2rem;
  width: 100%;
  border: 1px solid rgba(44, 74, 59, 0.12);
  padding: 0.5rem;
  background-color: #ffffff;
}

.modal-banner-doc {
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  filter: sepia(4%) grayscale(10%);
}

.modal-content-text-doc p {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  color: var(--color-text-body);
  line-height: 1.75;
  margin-bottom: 1.5rem;
  text-align: justify;
}

.modal-card-footer-doc {
  padding: 1.5rem 3rem;
  border-top: 1px solid rgba(44, 74, 59, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #faf9f6;
}

.modal-card-footer-doc span {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--color-sage-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.btn-modal-close-bottom {
  background-color: transparent;
  border: 1px solid var(--color-ink-dark);
  color: var(--color-ink-dark);
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-modal-close-bottom:hover {
  background-color: var(--color-ink-dark);
  color: var(--color-paper-light);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero-container-doc {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .hero-image-wrapper-doc {
    order: -1;
  }
  
  .about-grid-doc {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .about-image-wrapper-doc {
    display: flex;
    justify-content: center;
  }
  
  .footer-container-doc {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .doc-navbar {
    padding: 1.5rem 2rem;
  }
  
  .nav-links-doc {
    display: none; /* Hide standard links on mobile */
  }
  
  .hero-doc-section {
    padding: 10rem 2rem 6rem 2rem;
  }
  
  .hero-title-doc {
    font-size: 2.2rem;
  }
  
  .doc-section {
    padding: 5rem 2rem;
  }
  
  .project-doc-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .doc-action-col {
    justify-content: flex-start;
  }
  
  .services-document-grid, .skills-document-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-doc-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .blog-doc-action {
    justify-content: flex-start;
  }
  
  .footer-doc-section {
    padding: 5rem 2rem;
  }
  
  .footer-title-doc {
    font-size: 2.2rem;
  }
}

/* Academic Profiles styles */
.academic-profiles-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.academic-profile-card {
  background-color: var(--color-paper-light);
  border: 1px solid rgba(44, 74, 59, 0.12);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 2px;
  box-shadow: 0 4px 10px rgba(44, 74, 59, 0.02);
}

.academic-profile-card .profile-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--color-bronze-accent);
  letter-spacing: 0.15em;
}

.academic-profile-card .profile-val {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-ink-dark);
}

.academic-profile-card .profile-link {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-sage-secondary);
  text-decoration: underline;
  margin-top: 0.25rem;
  transition: color 0.3s;
}

.academic-profile-card .profile-link:hover {
  color: var(--color-bronze-accent);
}

@media (max-width: 768px) {
  .academic-profiles-bar {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* About/Credential Modal Specific styles */
.credential-modal-card {
  max-width: 950px;
  width: 90%;
}

.credential-modal-body {
  max-height: 70vh;
  overflow-y: auto;
  padding: 2.5rem;
}

.credential-columns-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
}

.credential-block-title {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-ink-dark);
  border-bottom: 2px solid var(--color-bronze-accent);
  padding-bottom: 0.5rem;
  margin-bottom: 1.2rem;
  letter-spacing: 0.05em;
}

.credential-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.credential-list li {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-main);
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.credential-list li::before {
  content: "■";
  position: absolute;
  left: 0;
  top: 0.1rem;
  color: var(--color-bronze-accent);
  font-size: 0.7rem;
}

.credential-intro {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-text-main);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.certification-subgrids {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.cert-category-box {
  background-color: rgba(44, 74, 59, 0.03);
  border: 1px solid rgba(44, 74, 59, 0.08);
  padding: 1.2rem;
  border-radius: 2px;
}

.cert-category-box h4 {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  margin-bottom: 0.75rem;
}

.cert-category-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cert-category-box ul li {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text-main);
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.4rem;
}

.cert-category-box ul li::before {
  content: "✔";
  position: absolute;
  left: 0;
  color: var(--color-sage-secondary);
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .credential-columns-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .certification-subgrids {
    grid-template-columns: 1fr;
  }
  
  .credential-modal-body {
    padding: 1.5rem;
  }
}

/* Services Category blocks */
.services-category-block {
  margin-bottom: 4rem;
}

.services-category-block:last-child {
  margin-bottom: 0;
}

.services-cat-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  border-bottom: 1px dashed rgba(184, 134, 11, 0.3);
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Publications Styles */
.citation-highlight-box {
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: rgba(184, 134, 11, 0.05);
  border: 1px solid rgba(184, 134, 11, 0.2);
  padding: 2rem;
  border-radius: 4px;
  margin-bottom: 3.5rem;
}

.citation-seal-icon {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-bronze-accent);
  border: 3px double var(--color-bronze-accent);
  padding: 0.5rem 1rem;
  border-radius: 50%;
  white-space: nowrap;
  min-width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.citation-body h3 {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--color-ink-dark);
  margin-bottom: 0.5rem;
}

.citation-body p {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text-main);
  line-height: 1.6;
}

.pub-type-block {
  margin-bottom: 3rem;
}

.pub-type-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  border-bottom: 2px solid var(--color-bronze-accent);
  padding-bottom: 0.4rem;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.pub-document-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pub-doc-row {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 2rem;
  border-bottom: 1px solid rgba(44, 74, 59, 0.12);
  padding-bottom: 1.5rem;
  align-items: center;
}

.pub-doc-row:last-child {
  border-bottom: none;
}

.pub-doc-badge {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  border: 1px solid var(--color-bronze-accent);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  text-align: center;
}

.pub-doc-content h3 {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-ink-dark);
  margin-bottom: 0.4rem;
}

.pub-doc-content p {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--color-text-main);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .pub-doc-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .citation-highlight-box {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}

/* Contact Section (Seksi 04 — Kontak) Styling */
.contact-clean-section {
  padding: 6rem 4rem;
  background-color: #0f2b1d; /* Deep dark green background matching mockup */
  color: #faf9f6;
  border-top: 1px solid rgba(250, 249, 246, 0.05);
}

.contact-section-header-clean {
  margin-bottom: 4rem;
  max-width: 800px;
}

.contact-num-label-clean {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-bronze-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.contact-title-serif-clean {
  font-family: var(--font-serif);
  font-size: 2.8rem;
  font-weight: 700;
  color: #faf9f6;
  line-height: 1.25;
  margin: 0 0 1.5rem 0;
}

.contact-intro-desc-clean {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(250, 249, 246, 0.7);
  margin: 0;
}

.contact-two-col-layout {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 6rem;
  align-items: start;
}

.contact-affiliations-col-clean {
  display: flex;
  flex-direction: column;
}

.contact-aff-list-clean {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.contact-aff-item-clean {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  line-height: 1.6;
  color: #faf9f6;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(250, 249, 246, 0.08);
}

.contact-aff-item-clean:last-child {
  border-bottom: none;
}

.contact-aff-marker {
  color: var(--color-bronze-accent);
  font-size: 0.8rem;
  line-height: 1;
}

.contact-aff-text {
  font-weight: 500;
}

.contact-form-col-clean {
  display: flex;
  flex-direction: column;
}

.contact-form-container-clean {
  border: 1px solid rgba(250, 249, 246, 0.12);
  padding: 3rem;
  border-radius: 2px;
  background-color: transparent;
}

.contact-form-clean {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group-clean {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-label-clean {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(250, 249, 246, 0.5);
  letter-spacing: 0.12em;
}

.form-input-clean,
.form-textarea-clean {
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(250, 249, 246, 0.2);
  padding: 1rem 1.25rem;
  border-radius: 2px;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: #faf9f6;
  outline: none;
  transition: all 0.25s ease;
}

.form-input-clean::placeholder,
.form-textarea-clean::placeholder {
  color: rgba(250, 249, 246, 0.35);
}

.form-input-clean:focus,
.form-textarea-clean:focus {
  border-color: var(--color-bronze-accent);
  box-shadow: 0 0 0 3px rgba(223, 177, 91, 0.08);
}

.form-textarea-clean {
  resize: vertical;
}

.btn-submit-clean {
  background-color: var(--color-bronze-accent);
  color: var(--color-ink-dark);
  border: none;
  padding: 1.1rem 2rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 2px;
  cursor: pointer;
  width: fit-content;
  transition: all 0.25s ease;
}

.btn-submit-clean:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-submit-clean:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.contact-toast-doc-clean {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 2px;
  margin-bottom: 2rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  animation: fadeInDown 0.3s ease;
}

.contact-toast-doc-clean.success {
  background-color: rgba(223, 177, 91, 0.1);
  border: 1px solid var(--color-bronze-accent);
  color: var(--color-bronze-accent);
}

.contact-toast-doc-clean.error {
  background-color: rgba(235, 94, 85, 0.1);
  border: 1px solid #eb5e55;
  color: #eb5e55;
}

.toast-icon-doc-clean {
  font-weight: bold;
  font-size: 1.1rem;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .contact-two-col-layout {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .contact-clean-section {
    padding: 4rem 2rem;
  }
  .contact-title-serif-clean {
    font-size: 2.2rem;
  }
  .contact-form-container-clean {
    padding: 2rem;
  }
}

/* ==========================================
   MOBILE & TABLET RESPONSIVE OVERRIDES
   ========================================== */

/* Hamburger menu toggle button style */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 105;
  outline: none;
}

.hamburger-bar {
  width: 100%;
  height: 2px;
  background-color: var(--color-ink-dark);
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-toggle.is-active .hamburger-bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-menu-toggle.is-active .hamburger-bar:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.mobile-menu-toggle.is-active .hamburger-bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-only-cta {
  display: none !important;
}

/* Tablet Overrides */
@media (max-width: 992px) {
  .doc-header-main {
    padding: 1.2rem 2rem;
  }
  
  .doc-header-main.scrolled {
    padding: 0.8rem 2rem;
  }

  .hero-doc-section-light {
    padding: 8rem 2rem 3rem 2rem;
  }

  .hero-container-doc-light {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-content-doc-light {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-tag-light {
    justify-content: center;
  }

  .hero-desc-light {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions-light {
    justify-content: center;
  }

  .hero-seal-wrapper-light {
    margin-top: 1rem;
  }
}

/* Mobile Phone Overrides */
@media (max-width: 768px) {
  /* Navigation header */
  .mobile-menu-toggle {
    display: flex;
  }

  .header-nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 290px;
    height: 100vh;
    background-color: var(--color-paper-light);
    border-left: 2px solid var(--color-ink-dark);
    box-shadow: -10px 0 35px rgba(15, 43, 29, 0.12);
    display: flex;
    flex-direction: column;
    padding: 6.5rem 2rem 2.5rem 2rem;
    gap: 1.8rem;
    transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 100;
  }

  .header-nav-links.mobile-active {
    right: 0;
  }

  .header-nav-links a {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-ink-dark);
    border-bottom: 1.5px dashed rgba(44, 74, 59, 0.1);
    padding-bottom: 0.8rem;
    display: block;
    width: 100%;
  }

  .header-nav-links a:hover {
    color: var(--color-bronze-accent);
  }

  .header-action-group {
    display: none !important; /* Hide desktop button */
  }

  .mobile-only-cta {
    display: inline-block !important;
    text-align: center;
    background-color: var(--color-ink-dark);
    color: var(--color-paper-light) !important;
    border: 1px solid var(--color-ink-dark);
    padding: 0.9rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 1rem;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .mobile-only-cta:hover {
    background-color: var(--color-bronze-accent);
    border-color: var(--color-bronze-accent);
  }

  /* Hero Section Title */
  .hero-title-doc-light {
    font-size: 2.2rem !important;
    line-height: 1.3;
  }

  .hero-actions-light {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  .hero-actions-light a {
    width: 100%;
    text-align: center;
  }

  /* Seal sizing on mobile */
  .seal-large-doc {
    width: 250px;
    height: 250px;
  }

  .seal-initials-text {
    font-size: 3.2rem;
  }

  /* Footer */
  .footer-container-clean-doc {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .footer-right-clean-doc {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  /* Detail Modals */
  .blog-modal-backdrop-doc {
    padding: 0.75rem;
  }

  .blog-modal-card-doc {
    max-height: 95vh;
  }

  .modal-card-top-bar {
    padding: 0.8rem 1.2rem;
  }

  .modal-header-doc {
    padding: 1.5rem 1.25rem 0.8rem 1.25rem;
  }

  .modal-header-doc h2 {
    font-size: 1.5rem;
  }

  .modal-body-doc {
    padding: 0.8rem 1.25rem 1.5rem 1.25rem;
  }

  .modal-content-text-doc p {
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .modal-card-footer-doc {
    padding: 1rem 1.25rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .modal-card-footer-doc span {
    font-size: 0.6rem;
  }

  .btn-modal-close-bottom {
    width: 100%;
    padding: 0.75rem 1rem;
  }
}
</style>
