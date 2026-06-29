<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>PORTFOLIO</h2>
        <span class="user-role">Administrator</span>
      </div>
      
      <nav class="sidebar-menu">
        <button 
          @click="activeTab = 'settings'" 
          :class="['menu-item', { active: activeTab === 'settings' }]"
        >
          <span class="icon">⚙️</span> Pengaturan Konten
        </button>
        <button 
          @click="activeTab = 'projects'" 
          :class="['menu-item', { active: activeTab === 'projects' }]"
        >
          <span class="icon">💼</span> Kelola Proyek
        </button>
        <button 
          @click="activeTab = 'blogs'" 
          :class="['menu-item', { active: activeTab === 'blogs' }]"
        >
          <span class="icon">✍️</span> Kelola Blog
        </button>
        <button 
          @click="activeTab = 'publications'" 
          :class="['menu-item', { active: activeTab === 'publications' }]"
        >
          <span class="icon">📚</span> Kelola Publikasi
        </button>
        <button 
          @click="activeTab = 'inbox'" 
          :class="['menu-item', { active: activeTab === 'inbox' }]"
        >
          <span class="icon">📥</span> Pesan Masuk
        </button>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">
          Keluar 🚪
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Header Bar -->
      <header class="content-header">
        <div class="header-title">
          <h1>{{ tabTitle }}</h1>
          <p>Kelola dan update isi website Anda secara real-time</p>
        </div>
        <div class="header-actions">
          <a href="/" target="_blank" class="btn-preview">Pratinjau Website 👁️</a>
        </div>
      </header>

      <!-- Global Notifications -->
      <div v-if="notification.message" :class="['notification', notification.type]">
        {{ notification.message }}
      </div>

      <!-- Tab Content: Settings -->
      <section v-if="activeTab === 'settings'" class="tab-panel">
        <div class="card">
          <h2>Informasi Utama (Hero Section)</h2>
          <form @submit.prevent="saveSettings" class="grid-form">
            <div class="form-group span-2">
              <label>Headline (Nama)</label>
              <input type="text" v-model="settings.hero_title_highlight" required />
            </div>
            <div class="form-group span-2">
              <label>Sub-headline (Gelar/Profesi)</label>
              <input type="text" v-model="settings.hero_badge" required />
            </div>
            <div class="form-group span-4">
              <label>Pernyataan Fokus / Pengalaman</label>
              <input type="text" v-model="settings.hero_credentials" required />
            </div>
            <div class="form-group span-4">
              <label>Pengantar Singkat Hero</label>
              <textarea rows="4" v-model="settings.hero_description" required></textarea>
            </div>
            <div class="form-group span-2">
              <label>Inisial Stempel Hero (Contoh: RPS)</label>
              <input type="text" v-model="settings.seal_initials" required />
            </div>
            <div class="form-group span-2">
              <label>Kredensial Stempel Baris 1 (Contoh: AK. · CA. · CPA.)</label>
              <input type="text" v-model="settings.seal_line1" required />
            </div>
            <div class="form-group span-2">
              <label>Kredensial Stempel Baris 2 (Contoh: CFRA. · CIPSAS. · DR.)</label>
              <input type="text" v-model="settings.seal_line2" required />
            </div>
            
            <div class="form-group span-2">
              <label>Foto Hero (Profil Utama)</label>
              <div class="image-uploader">
                <img :src="settings.hero_image_url || '/images/rida_profile.jpg'" class="preview-img" alt="Hero Photo" />
                <div class="upload-controls">
                  <input type="file" @change="uploadHeroPhoto" accept="image/*" id="hero-upload" class="hidden-input" />
                  <label for="hero-upload" class="btn-secondary">Ganti Foto Hero 📁</label>
                  <p class="file-info">Rekomendasi format JPG/PNG.</p>
                </div>
              </div>
            </div>

            <div class="form-group span-2">
              <label>Logo Header (Opsional - Menggantikan Teks)</label>
              <div class="image-uploader">
                <img v-if="settings.header_logo_url" :src="settings.header_logo_url" class="preview-img" alt="Header Logo" />
                <div v-else class="preview-circle-placeholder">{{ settings.seal_initials || 'RPS' }}</div>
                <div class="upload-controls">
                  <input type="file" @change="uploadHeaderLogo" accept="image/*" id="header-logo-upload" class="hidden-input" />
                  <label for="header-logo-upload" class="btn-secondary">Ganti Logo Header 📁</label>
                  <button v-if="settings.header_logo_url" type="button" @click="settings.header_logo_url = ''" class="btn-danger-sm">Reset ke Teks</button>
                  <p class="file-info">Format JPG/PNG/WEBP. Jika kosong, inisial di header akan tampil.</p>
                </div>
              </div>
            </div>

            <div class="form-group span-2">
              <label>Stempel Hero (Opsional - Menggantikan Stempel Teks)</label>
              <div class="image-uploader">
                <img v-if="settings.hero_seal_image_url" :src="settings.hero_seal_image_url" class="preview-img" alt="Hero Seal" />
                <div v-else class="preview-circle-placeholder">{{ settings.seal_initials || 'RPS' }}</div>
                <div class="upload-controls">
                  <input type="file" @change="uploadHeroSeal" accept="image/*" id="hero-seal-upload" class="hidden-input" />
                  <label for="hero-seal-upload" class="btn-secondary">Ganti Stempel Hero 📁</label>
                  <button v-if="settings.hero_seal_image_url" type="button" @click="settings.hero_seal_image_url = ''" class="btn-danger-sm">Reset ke Teks</button>
                  <p class="file-info">Format JPG/PNG/WEBP. Jika kosong, stempel/seal text akan tampil.</p>
                </div>
              </div>
            </div>
            
            <div class="form-group span-2">
              <label>Email Kontak</label>
              <input type="email" v-model="settings.contact_email" required />
              <label style="margin-top: 1rem;">No. WhatsApp / Telepon</label>
              <input type="text" v-model="settings.contact_phone" required />
            </div>

            <div class="span-4 border-top">
              <h2>Profil Eksekutif (Tentang Saya)</h2>
            </div>
            
            <div class="form-group span-2">
              <label>Badge Profil</label>
              <input type="text" v-model="settings.about_badge" required />
              <label style="margin-top: 1rem;">Judul Profil</label>
              <input type="text" v-model="settings.about_title" required />
            </div>
            
            <div class="form-group span-2">
              <label>Foto Profil Deskripsi</label>
              <div class="image-uploader">
                <img :src="settings.about_image_url || '/images/rida_profile.jpg'" class="preview-img" alt="About Photo" />
                <div class="upload-controls">
                  <input type="file" @change="uploadAboutPhoto" accept="image/*" id="about-upload" class="hidden-input" />
                  <label for="about-upload" class="btn-secondary">Ganti Foto Profil 📁</label>
                  <p class="file-info">Rekomendasi format JPG/PNG.</p>
                </div>
              </div>
            </div>

            <div class="form-group span-4">
              <label>Deskripsi Profil Lengkap</label>
              <textarea rows="4" v-model="settings.about_description" required></textarea>
            </div>

            <div class="span-4 border-top">
              <h2>Profil Akademik & Riset</h2>
            </div>
            
            <div class="form-group span-2">
              <label>SINTA ID</label>
              <input type="text" v-model="settings.sinta_id" placeholder="Masukkan ID SINTA" />
            </div>
            
            <div class="form-group span-2">
              <label>Scopus Author ID</label>
              <input type="text" v-model="settings.scopus_id" placeholder="Masukkan ID Author Scopus" />
            </div>
            
            <div class="form-group span-2">
              <label>Tautan Profil Google Scholar</label>
              <input type="text" v-model="settings.scholar_id" placeholder="https://scholar.google.com/citations?user=..." />
            </div>
            
            <div class="form-group span-2">
              <label>ORCID ID</label>
              <input type="text" v-model="settings.orcid_id" placeholder="Masukkan ID ORCID (Contoh: 0000-0002-xxxx-xxxx)" />
            </div>

            <div class="form-group span-4">
              <label>Keterangan / Narasi Rekam Jejak Sitasi</label>
              <textarea rows="3" v-model="settings.citation_text" placeholder="Masukkan keterangan tentang jumlah sitasi riset..."></textarea>
            </div>

            <div class="span-4 border-top">
              <h2>Statistik Pencapaian</h2>
            </div>
            
            <div class="form-group">
              <label>Stat 1 (Angka)</label>
              <input type="text" v-model="settings.stat_experience_num" required />
              <label style="margin-top: 0.5rem;">Stat 1 (Label)</label>
              <input type="text" v-model="settings.stat_experience_label" required />
            </div>
            <div class="form-group">
              <label>Stat 2 (Angka)</label>
              <input type="text" v-model="settings.stat_projects_num" required />
              <label style="margin-top: 0.5rem;">Stat 2 (Label)</label>
              <input type="text" v-model="settings.stat_projects_label" required />
            </div>
            <div class="form-group">
              <label>Stat 3 (Angka)</label>
              <input type="text" v-model="settings.stat_papers_num" required />
              <label style="margin-top: 0.5rem;">Stat 3 (Label)</label>
              <input type="text" v-model="settings.stat_papers_label" required />
            </div>

            <div class="span-4 border-top">
              <h2>Kontak & Saluran Kolaborasi</h2>
            </div>
            
            <div class="form-group span-2">
              <label>Judul Kolaborasi</label>
              <input type="text" v-model="settings.contact_title" required />
            </div>

            <div class="form-group span-2">
              <label>LinkedIn Profil URL</label>
              <input type="text" v-model="settings.contact_linkedin" placeholder="https://linkedin.com/in/username" />
            </div>

            <div class="form-group span-4">
              <label>Sub-judul Kolaborasi / Ajakan Diskusi</label>
              <textarea rows="2" v-model="settings.contact_subtitle" required></textarea>
            </div>

            <div class="form-group span-4">
              <label>Daftar Afiliasi (Satu per Baris)</label>
              <textarea rows="4" v-model="settings.contact_affiliations" placeholder="Masukkan satu afiliasi profesional per baris..." required></textarea>
            </div>

            <div class="span-4 action-bar">
              <button type="submit" class="btn-save" :disabled="savingSettings">
                {{ savingSettings ? 'Menyimpan...' : 'Simpan Semua Perubahan' }}
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Tab Content: Projects -->
      <section v-if="activeTab === 'projects'" class="tab-panel">
        <div class="flex-row">
          <!-- Project List -->
          <div class="card flex-grow">
            <div class="card-header">
              <h2>Daftar Proyek</h2>
              <button @click="resetProjectForm" class="btn-primary">Tambah Proyek Baru ➕</button>
            </div>
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Judul Proyek</th>
                    <th>Deskripsi Ringkas</th>
                    <th>Desain Visual</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="proj in projects" :key="proj.id">
                    <td><strong>{{ proj.title }}</strong></td>
                    <td class="text-truncate">{{ proj.description }}</td>
                    <td><span class="badge-style" :class="proj.visual_class">{{ proj.visual_class }}</span></td>
                    <td class="table-actions">
                      <button @click="editProject(proj)" class="btn-edit">Edit ✏️</button>
                      <button @click="deleteProject(proj.id)" class="btn-delete">Hapus 🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Project Form -->
          <div class="card form-card" id="project-form-card">
            <h2>{{ projectForm.id ? 'Edit Proyek' : 'Tambah Proyek' }}</h2>
            <form @submit.prevent="saveProject" class="stack-form">
              <div class="form-group">
                <label>Judul Proyek</label>
                <input type="text" v-model="projectForm.title" placeholder="Contoh: E-Governance Audit" required />
              </div>
              <div class="form-group">
                <label>Deskripsi Proyek</label>
                <textarea rows="4" v-model="projectForm.description" placeholder="Deskripsi singkat mengenai pengerjaan proyek..." required></textarea>
              </div>
              <div class="form-group">
                <label>Desain Kartu / Visual Style</label>
                <select v-model="projectForm.visual_class" required>
                  <option value="p-visual-1">Visual Pink / Orange Gradient (Gaya 1)</option>
                  <option value="p-visual-2">Visual Teal / Blue Gradient (Gaya 2)</option>
                  <option value="p-visual-3">Visual Gold / Yellow Polygon (Gaya 3)</option>
                  <option value="p-visual-4">Visual Red / Orange Path (Gaya 4)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tautan Proyek / Anchor Link</label>
                <input type="text" v-model="projectForm.link" placeholder="Contoh: #project1 atau URL lengkap" required />
              </div>
              <div class="form-actions">
                <button type="button" @click="resetProjectForm" class="btn-cancel">Batal</button>
                <button type="submit" class="btn-save" :disabled="savingProject">
                  {{ savingProject ? 'Menyimpan...' : 'Simpan Proyek' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Tab Content: Blogs -->
      <section v-if="activeTab === 'blogs'" class="tab-panel">
        <div class="flex-row">
          <!-- Blog List -->
          <div class="card flex-grow">
            <div class="card-header">
              <h2>Daftar Artikel Blog</h2>
              <button @click="resetBlogForm" class="btn-primary">Tulis Artikel Baru ➕</button>
            </div>
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Judul Artikel</th>
                    <th>Slug URL</th>
                    <th>Status</th>
                    <th>Tanggal Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="post in blogs" :key="post.id">
                    <td><strong>{{ post.title }}</strong></td>
                    <td><code>{{ post.slug }}</code></td>
                    <td>
                      <span :class="['badge-status', post.status]">
                        {{ post.status === 'published' ? 'Published' : 'Draft' }}
                      </span>
                    </td>
                    <td>{{ formatDate(post.created_at) }}</td>
                    <td class="table-actions">
                      <button @click="editBlog(post)" class="btn-edit">Edit ✏️</button>
                      <button @click="deleteBlog(post.id)" class="btn-delete">Hapus 🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Blog Form -->
          <div class="card form-card large-form" id="blog-form-card">
            <h2>{{ blogForm.id ? 'Edit Artikel' : 'Tulis Artikel Baru' }}</h2>
            <form @submit.prevent="saveBlog" class="stack-form">
              <div class="form-group">
                <label>Judul Artikel</label>
                <input 
                  type="text" 
                  v-model="blogForm.title" 
                  @input="generateSlug"
                  placeholder="Contoh: Tantangan Audit Keuangan BUMN" 
                  required 
                />
              </div>
              <div class="form-group">
                <label>Slug URL (Otomatis)</label>
                <input type="text" v-model="blogForm.slug" placeholder="tantangan-audit-keuangan-bumn" required />
              </div>
              <div class="form-group">
                <label>Gambar Banner / Cover URL</label>
                <div class="image-uploader">
                  <img :src="blogForm.image_url || '/images/blog_1.jpg'" class="preview-img rect" alt="Blog Cover" />
                  <div class="upload-controls">
                    <input type="file" @change="uploadBlogCover" accept="image/*" id="blog-upload" class="hidden-input" />
                    <label for="blog-upload" class="btn-secondary">Pilih Gambar 📷</label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Konten Artikel</label>
                <textarea rows="10" v-model="blogForm.content" placeholder="Tulis isi artikel lengkap di sini..." required></textarea>
              </div>
              <div class="form-group">
                <label>Status Publikasi</label>
                <select v-model="blogForm.status" required>
                  <option value="draft">Draft (Disembunyikan)</option>
                  <option value="published">Published (Ditampilkan)</option>
                </select>
              </div>
              <div class="form-actions">
                <button type="button" @click="resetBlogForm" class="btn-cancel">Batal</button>
                <button type="submit" class="btn-save" :disabled="savingBlog">
                  {{ savingBlog ? 'Menyimpan...' : 'Simpan Artikel' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Tab Content: Publications -->
      <section v-if="activeTab === 'publications'" class="tab-panel">
        <div class="flex-row">
          <!-- Publications List -->
          <div class="card flex-grow">
            <div class="card-header">
              <h2>Daftar Publikasi & Karya</h2>
              <button @click="resetPublicationForm" class="btn-primary">Tambah Publikasi Baru ➕</button>
            </div>
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Judul Publikasi</th>
                    <th>Tipe</th>
                    <th>Tautan</th>
                    <th>Keterangan / Narasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pub in publications" :key="pub.id">
                    <td><strong>{{ pub.title }}</strong></td>
                    <td>
                      <span class="badge-status published">{{ pub.type }}</span>
                    </td>
                    <td>
                      <a v-if="pub.link" :href="pub.link" target="_blank" class="text-link">{{ pub.link }}</a>
                      <span v-else class="text-muted">-</span>
                    </td>
                    <td>{{ pub.description || '-' }}</td>
                    <td class="table-actions">
                      <button @click="editPublication(pub)" class="btn-edit">Edit ✏️</button>
                      <button @click="deletePublication(pub.id)" class="btn-delete">Hapus 🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Publications Form -->
          <div class="card form-card" id="pub-form-card">
            <h2>{{ pubForm.id ? 'Edit Publikasi' : 'Tambah Publikasi Baru' }}</h2>
            <form @submit.prevent="savePublication" class="stack-form">
              <div class="form-group">
                <label>Judul Publikasi</label>
                <input 
                  type="text" 
                  v-model="pubForm.title" 
                  placeholder="Contoh: Pemeriksaan Akuntansi & Contoh Kasus di Indonesia" 
                  required 
                />
              </div>
              <div class="form-group">
                <label>Tipe Publikasi</label>
                <select v-model="pubForm.type" required>
                  <option value="Buku">Buku</option>
                  <option value="Artikel Jurnal Terpilih">Artikel Jurnal Terpilih</option>
                </select>
              </div>
              <div class="form-group">
                <label>Tautan / Link Publikasi (Opsional)</label>
                <input type="url" v-model="pubForm.link" placeholder="Contoh: https://example.com/publikasi" />
              </div>
              <div class="form-group">
                <label>Keterangan / Narasi</label>
                <textarea rows="4" v-model="pubForm.description" placeholder="Penjelasan singkat atau detail publikasi..."></textarea>
              </div>
              <div class="form-actions">
                <button type="button" @click="resetPublicationForm" class="btn-cancel">Batal</button>
                <button type="submit" class="btn-save" :disabled="savingPub">
                  {{ savingPub ? 'Menyimpan...' : 'Simpan Publikasi' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Tab Content: Inbox / Pesan Masuk -->
      <section v-if="activeTab === 'inbox'" class="tab-panel">
        <div class="card">
          <div class="card-header">
            <h2>Daftar Pesan Masuk / Korespondensi</h2>
            <button @click="fetchMessages" class="btn-secondary">Perbarui 🔄</button>
          </div>

          <div v-if="messages.length === 0" class="empty-state" style="text-align: center; padding: 3rem; color: var(--color-text-main);">
            <p>Belum ada pesan korespondensi yang masuk.</p>
          </div>

          <div v-else class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Pengirim</th>
                  <th>Alamat Surel</th>
                  <th>Institusi</th>
                  <th>Topik</th>
                  <th>Uraian Pesan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="msg in messages" :key="msg.id">
                  <td style="white-space: nowrap;">{{ formatDate(msg.created_at) }}</td>
                  <td><strong>{{ msg.name }}</strong></td>
                  <td><a :href="'mailto:' + msg.email" class="text-link">{{ msg.email }}</a></td>
                  <td>{{ msg.institution || '-' }}</td>
                  <td><span class="badge-status published">{{ msg.topic || 'Lainnya' }}</span></td>
                  <td>
                    <div class="message-text-bubble" style="max-width: 300px; max-height: 80px; overflow-y: auto; font-size: 0.85rem; line-height: 1.4; color: var(--color-text-main);">
                      {{ msg.message }}
                    </div>
                  </td>
                  <td class="table-actions">
                    <button @click="deleteMessage(msg.id)" class="btn-delete">Hapus 🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth'
})

const activeTab = ref('settings')
const notification = ref({ message: '', type: '' })

const tabTitle = computed(() => {
  if (activeTab.value === 'settings') return 'Pengaturan Konten Utama'
  if (activeTab.value === 'projects') return 'Pengelolaan Proyek Portofolio'
  if (activeTab.value === 'blogs') return 'Pengelolaan Artikel & Publikasi'
  if (activeTab.value === 'publications') return 'Pengelolaan Publikasi Ilmiah & Buku'
  return 'Kotak Masuk Pesan Korespondensi'
})

const triggerNotification = (message, type = 'success') => {
  notification.value = { message, type }
  setTimeout(() => {
    notification.value = { message: '', type: '' }
  }, 4000)
}

// ----------------------------------------------------
// 1. Settings Logic
// ----------------------------------------------------
const settings = ref({
  hero_badge: '',
  hero_title_highlight: '',
  hero_credentials: '',
  hero_description: '',
  profile_image_url: '',
  hero_image_url: '',
  header_logo_url: '',
  hero_seal_image_url: '',
  seal_initials: '',
  seal_line1: '',
  seal_line2: '',
  about_image_url: '',
  about_badge: '',
  about_title: '',
  about_description: '',
  stat_experience_num: '',
  stat_experience_label: '',
  stat_projects_num: '',
  stat_projects_label: '',
  stat_papers_num: '',
  stat_papers_label: '',
  contact_email: '',
  contact_phone: '',
  sinta_id: '',
  scopus_id: '',
  scholar_id: '',
  orcid_id: '',
  citation_text: '',
  contact_title: '',
  contact_subtitle: '',
  contact_affiliations: '',
  contact_linkedin: ''
})
const savingSettings = ref(false)

const loadSettings = async () => {
  try {
    const data = await $fetch('/api/settings')
    if (data) {
      settings.value = { ...settings.value, ...data }
    }
  } catch (error) {
    triggerNotification('Gagal memuat pengaturan website', 'error')
  }
}

const saveSettings = async () => {
  savingSettings.value = true
  try {
    await $fetch('/api/settings', {
      method: 'POST',
      body: settings.value
    })
    triggerNotification('Pengaturan website berhasil disimpan!')
  } catch (error) {
    triggerNotification('Gagal menyimpan pengaturan', 'error')
  } finally {
    savingSettings.value = false
  }
}

const uploadHeroPhoto = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (response.success) {
      settings.value.hero_image_url = response.url
      triggerNotification('Foto hero berhasil diunggah! Ingat untuk menyimpan seluruh pengaturan.')
    }
  } catch (error) {
    triggerNotification('Gagal mengunggah foto hero', 'error')
  }
}

const uploadHeaderLogo = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (response.success) {
      settings.value.header_logo_url = response.url
      triggerNotification('Logo header berhasil diunggah! Ingat untuk menyimpan seluruh pengaturan.')
    }
  } catch (error) {
    triggerNotification('Gagal mengunggah logo header', 'error')
  }
}

const uploadHeroSeal = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (response.success) {
      settings.value.hero_seal_image_url = response.url
      triggerNotification('Stempel hero berhasil diunggah! Ingat untuk menyimpan seluruh pengaturan.')
    }
  } catch (error) {
    triggerNotification('Gagal mengunggah stempel hero', 'error')
  }
}

const uploadAboutPhoto = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (response.success) {
      settings.value.about_image_url = response.url
      triggerNotification('Foto profil deskripsi berhasil diunggah! Ingat untuk menyimpan seluruh pengaturan.')
    }
  } catch (error) {
    triggerNotification('Gagal mengunggah foto profil deskripsi', 'error')
  }
}

// ----------------------------------------------------
// 2. Projects Logic
// ----------------------------------------------------
const projects = ref([])
const savingProject = ref(false)
const projectForm = ref({
  id: null,
  title: '',
  description: '',
  visual_class: 'p-visual-1',
  link: '#'
})

const loadProjects = async () => {
  try {
    projects.value = await $fetch('/api/projects')
  } catch (error) {
    triggerNotification('Gagal memuat daftar proyek', 'error')
  }
}

const resetProjectForm = () => {
  projectForm.value = {
    id: null,
    title: '',
    description: '',
    visual_class: 'p-visual-1',
    link: '#'
  }
}

const editProject = (proj) => {
  projectForm.value = { ...proj }
  const formCard = document.getElementById('project-form-card')
  if (formCard) formCard.scrollIntoView({ behavior: 'smooth' })
}

const saveProject = async () => {
  savingProject.value = true
  try {
    await $fetch('/api/projects', {
      method: 'POST',
      body: projectForm.value
    })
    triggerNotification(projectForm.value.id ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil ditambahkan!')
    resetProjectForm()
    await loadProjects()
  } catch (error) {
    triggerNotification('Gagal menyimpan proyek', 'error')
  } finally {
    savingProject.value = false
  }
}

const deleteProject = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return
  try {
    await $fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    })
    triggerNotification('Proyek berhasil dihapus!')
    await loadProjects()
  } catch (error) {
    triggerNotification('Gagal menghapus proyek', 'error')
  }
}

// ----------------------------------------------------
// 3. Blogs Logic
// ----------------------------------------------------
const blogs = ref([])
const savingBlog = ref(false)
const blogForm = ref({
  id: null,
  title: '',
  slug: '',
  content: '',
  image_url: '/images/blog_1.jpg',
  status: 'draft'
})

const loadBlogs = async () => {
  try {
    blogs.value = await $fetch('/api/blogs')
  } catch (error) {
    triggerNotification('Gagal memuat daftar blog', 'error')
  }
}

const resetBlogForm = () => {
  blogForm.value = {
    id: null,
    title: '',
    slug: '',
    content: '',
    image_url: '/images/blog_1.jpg',
    status: 'draft'
  }
}

const generateSlug = () => {
  if (blogForm.value.id) return // Don't auto-regenerate on edit unless cleared
  blogForm.value.slug = blogForm.value.title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
}

const editBlog = (post) => {
  blogForm.value = { ...post }
  const formCard = document.getElementById('blog-form-card')
  if (formCard) formCard.scrollIntoView({ behavior: 'smooth' })
}

const saveBlog = async () => {
  savingBlog.value = true
  try {
    await $fetch('/api/blogs', {
      method: 'POST',
      body: blogForm.value
    })
    triggerNotification(blogForm.value.id ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil dibuat!')
    resetBlogForm()
    await loadBlogs()
  } catch (error) {
    triggerNotification(error.data?.statusMessage || 'Gagal menyimpan artikel', 'error')
  } finally {
    savingBlog.value = false
  }
}

const uploadBlogCover = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (response.success) {
      blogForm.value.image_url = response.url
      triggerNotification('Gambar banner berhasil diunggah!')
    }
  } catch (error) {
    triggerNotification('Gagal mengunggah gambar banner', 'error')
  }
}

const deleteBlog = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return
  try {
    await $fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    })
    triggerNotification('Artikel berhasil dihapus!')
    await loadBlogs()
  } catch (error) {
    triggerNotification('Gagal menghapus artikel', 'error')
  }
}

// ----------------------------------------------------
// 3b. Publications Logic
// ----------------------------------------------------
const publications = ref([])
const savingPub = ref(false)
const pubForm = ref({
  id: null,
  title: '',
  type: 'Buku',
  link: '',
  description: ''
})

const loadPublications = async () => {
  try {
    publications.value = await $fetch('/api/publications')
  } catch (error) {
    triggerNotification('Gagal memuat daftar publikasi', 'error')
  }
}

const resetPublicationForm = () => {
  pubForm.value = {
    id: null,
    title: '',
    type: 'Buku',
    link: '',
    description: ''
  }
}

const editPublication = (pub) => {
  pubForm.value = { ...pub }
  const formCard = document.getElementById('pub-form-card')
  if (formCard) formCard.scrollIntoView({ behavior: 'smooth' })
}

const savePublication = async () => {
  savingPub.value = true
  try {
    await $fetch('/api/publications', {
      method: 'POST',
      body: pubForm.value
    })
    triggerNotification(pubForm.value.id ? 'Publikasi berhasil diperbarui!' : 'Publikasi baru berhasil dibuat!')
    resetPublicationForm()
    await loadPublications()
  } catch (error) {
    triggerNotification(error.data?.statusMessage || 'Gagal menyimpan publikasi', 'error')
  } finally {
    savingPub.value = false
  }
}

const deletePublication = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus publikasi ini?')) return
  try {
    await $fetch(`/api/publications/${id}`, {
      method: 'DELETE'
    })
    triggerNotification('Publikasi berhasil dihapus!')
    await loadPublications()
  } catch (error) {
    triggerNotification('Gagal menghapus publikasi', 'error')
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// ----------------------------------------------------
// 3c. Contact Messages (Inbox) Logic
// ----------------------------------------------------
const messages = ref([])

const fetchMessages = async () => {
  try {
    messages.value = await $fetch('/api/contact')
  } catch (error) {
    triggerNotification('Gagal memuat pesan korespondensi', 'error')
  }
}

const deleteMessage = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus pesan korespondensi ini?')) return
  try {
    await $fetch(`/api/contact/${id}`, {
      method: 'DELETE'
    })
    triggerNotification('Pesan berhasil dihapus!')
    await fetchMessages()
  } catch (error) {
    triggerNotification('Gagal menghapus pesan', 'error')
  }
}

// ----------------------------------------------------
// 4. Logout
// ----------------------------------------------------
const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    navigateTo('/admin/login')
  } catch (error) {
    triggerNotification('Gagal keluar', 'error')
  }
}

// Initialization
onMounted(async () => {
  await Promise.all([
    loadSettings(),
    loadProjects(),
    loadBlogs(),
    loadPublications(),
    fetchMessages()
  ])
})
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #121413; /* Deep Dark Green-Black */
  color: #f1f3ee;
  font-family: 'Outfit', sans-serif;
}

/* Sidebar Styling */
.sidebar {
  width: 280px;
  background-color: #1e201e;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
}

.sidebar-header {
  margin-bottom: 3rem;
}

.sidebar-header h2 {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #e5a93c;
}

.user-role {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex-grow: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  padding: 1rem 1.2rem;
  text-align: left;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.menu-item:hover,
.menu-item.active {
  background-color: rgba(229, 169, 60, 0.1);
  color: #e5a93c;
}

.menu-item.active {
  box-shadow: inset 3px 0 0 #e5a93c;
}

.btn-logout {
  width: 100%;
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
  color: #ff6b6b;
  padding: 0.8rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-logout:hover {
  background: #ff6b6b;
  color: #121413;
}

/* Main Content area */
.main-content {
  flex-grow: 1;
  padding: 3rem;
  overflow-y: auto;
  max-height: 100vh;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.header-title h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.3rem;
}

.header-title p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
}

.btn-preview {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-preview:hover {
  background-color: #e5a93c;
  color: #121413;
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #e5a93c;
  color: #121413;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background-color: #c68d27;
  transform: translateY(-1px);
}

/* Notification banner */
.notification {
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  font-weight: 600;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background-color: rgba(40, 167, 69, 0.15);
  border: 1px solid rgba(40, 167, 69, 0.3);
  color: #2ecc71;
}

.notification.error {
  background-color: rgba(220, 53, 69, 0.15);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #ff6b6b;
}

/* Tab Panels */
.tab-panel {
  animation: fadeIn 0.4s ease-out;
}

.card {
  background-color: #1e201e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  margin-bottom: 2rem;
}

.card h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #e5a93c;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h2 {
  margin-bottom: 0;
}

/* Grid Form Layout */
.grid-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.span-2 { grid-column: span 2; }
.span-4 { grid-column: span 4; }

.border-top {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 2rem;
  margin-top: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.03em;
}

.form-group input,
.form-group textarea,
.form-group select {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  color: #ffffff;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #e5a93c;
  background-color: rgba(255,255,255,0.06);
}

/* Image Upload Widget */
.image-uploader {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: rgba(255,255,255,0.02);
  border: 1px dashed rgba(255,255,255,0.1);
  padding: 1.2rem;
  border-radius: 16px;
}

.preview-img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #2e4f3b;
  border: 2px solid #e5a93c;
}

.preview-img.rect {
  border-radius: 12px;
  width: 140px;
  height: 80px;
}

.upload-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hidden-input {
  display: none;
}

.btn-secondary {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.preview-circle-placeholder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: #e5a93c;
  background-color: rgba(255,255,255,0.02);
}

.btn-danger-sm {
  background-color: rgba(220, 53, 69, 0.15);
  color: #ff6b6b;
  border: 1px solid rgba(220, 53, 69, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  margin-top: 0.2rem;
}

.btn-danger-sm:hover {
  background-color: #ff6b6b;
  color: #121413;
}

.file-info {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
}

.action-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-save {
  background-color: #e5a93c;
  color: #121413;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.9rem 2.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-save:hover:not(:disabled) {
  background-color: #c68d27;
  transform: translateY(-2px);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Split Form Layout */
.flex-row {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.flex-grow {
  flex: 1.6;
}

.form-card {
  flex: 1;
  position: sticky;
  top: 2rem;
}

.large-form {
  flex: 1.2;
}

.stack-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background-color: rgba(255,255,255,0.05);
}

/* Tables styling */
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: rgba(255,255,255,0.02);
  border-bottom: 2px solid rgba(255,255,255,0.05);
  padding: 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}

td {
  padding: 1.2rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 0.95rem;
}

.text-truncate {
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge-style {
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-weight: 700;
}

.p-visual-1 { background-color: rgba(253, 251, 247, 0.1); color: #FFAE9B; }
.p-visual-2 { background-color: rgba(230, 254, 240, 0.1); color: #50E3C2; }
.p-visual-3 { background-color: rgba(250, 242, 232, 0.1); color: #F5A623; }
.p-visual-4 { background-color: rgba(253, 234, 234, 0.1); color: #D0021B; }

.badge-status {
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-weight: 700;
}

.badge-status.published {
  background-color: rgba(46, 204, 113, 0.15);
  color: #2ecc71;
}

.badge-status.draft {
  background-color: rgba(255, 255, 255, 0.08);
  color: rgba(255,255,255,0.6);
}

.table-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit {
  background-color: rgba(229, 169, 60, 0.15);
  border: 1px solid rgba(229, 169, 60, 0.3);
  color: #e5a93c;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-edit:hover {
  background-color: #e5a93c;
  color: #121413;
}

.btn-delete {
  background-color: rgba(220, 53, 69, 0.15);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #ff6b6b;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-delete:hover {
  background-color: #ff6b6b;
  color: #121413;
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
