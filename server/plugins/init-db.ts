import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import bcrypt from 'bcryptjs'
import { useDb } from '../utils/db'

export default defineNitroPlugin(() => {
  const db = useDb()

  // 1. Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      visual_class TEXT NOT NULL,
      link TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      is_highlighted INTEGER DEFAULT 0,
      visual_svg_type TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS publications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      link TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      institution TEXT,
      topic TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      short_name TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 2. Seed default admin user if empty
  const userCheck = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
  if (userCheck.count === 0) {
    const defaultPasswordHash = bcrypt.hashSync('admin123', 10)
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', defaultPasswordHash)
    console.log('[Init DB] Default admin user created: admin / admin123')
  }

  // 3. Seed default settings if empty
  const defaultSettings = [
    { key: 'hero_badge', value: 'Dr. Rida Perwita Sari, S.E., M.Aks.' },
    { key: 'hero_title_highlight', value: 'Menjembatani riset akuntansi dengan praktik tata kelola yang akuntabel.' },
    { key: 'hero_credentials', value: 'Menghubungkan dunia riset, audit, dan praktik tata kelola keuangan publik melalui lebih dari 16 tahun pengalaman di bidang ekonomi, akuntansi, audit, dan forensik.' },
    { key: 'hero_description', value: 'Saya membantu institusi, lembaga publik, dan organisasi bisnis membangun tata kelola keuangan yang akuntabel — melalui audit, konsultasi, riset, dan pelatihan. Lebih dari 16 tahun pengalaman di bidang ekonomi, akuntansi, audit, dan forensik.' },
    { key: 'hero_image_url', value: '/images/rida_profile.jpg' },
    { key: 'hero_tag', value: 'AKADEMISI · AUDITOR · KONSULTAN' },
    { key: 'seal_line1', value: 'AK. · CA. · CPA.' },
    { key: 'seal_line2', value: 'CFRA. · CIPSAS. · DR.' },
    { key: 'about_image_url', value: '/images/rida_profile.jpg' },
    { key: 'about_badge', value: 'PROFIL EKSEKUTIF' },
    { key: 'about_title', value: 'Satu kaki di ruang kelas, satu kaki di lapangan.' },
    { key: 'about_description', value: 'Perjalanan saya di dunia akuntansi dimulai lebih dari 16 tahun lalu, dan sejak saat itu saya memilih untuk tidak berhenti hanya di satu peran. Saya adalah dosen Akuntansi Sektor Publik di Program Studi Akuntansi, Fakultas Ekonomi dan Bisnis, UPN “Veteran” Jawa Timur — tempat saya membimbing generasi akuntan dan auditor masa depan. Namun ruang kelas hanyalah satu bagian dari perjalanan saya.\n\nDi sisi praktik, saya berperan sebagai auditor dan akuntan publik di KAP Mahsun, Nurdiono, Kukuh dan Rekan (KAP MNK & Rekan), serta sebagai praktisi dan tenaga ahli di Drastha Consulting dan Drastha Learning. Kombinasi ini memungkinkan saya menjembatani teori dan praktik secara langsung — sesuatu yang saya yakini menjadi kekuatan utama dalam memberikan layanan maupun pengajaran yang relevan dengan kebutuhan riil di lapangan.' },
    { key: 'about_degree1_title', value: 'Doktor (S3)' },
    { key: 'about_degree1_field', value: 'Ilmu Ekonomi / Akuntansi' },
    { key: 'about_degree2_title', value: 'Magister Akuntansi' },
    { key: 'about_degree2_field', value: 'M.Aks.' },
    { key: 'about_degree3_title', value: 'Sarjana Ekonomi' },
    { key: 'about_degree3_field', value: 'S.E.' },
    { key: 'certs_category1_title', value: 'AKUNTANSI & AUDIT' },
    { key: 'certs_category1_list', value: 'Ak., CA., CPA., CFrA.' },
    { key: 'certs_category2_title', value: 'MANAJEMEN RISIKO & TATA KELOLA' },
    { key: 'certs_category2_list', value: 'CERA., CRA., CRP., GRCE.' },
    { key: 'certs_category3_title', value: 'SEKTOR PUBLIK & BISNIS INTERNASIONAL' },
    { key: 'certs_category3_list', value: 'CIPSAS., CIBA.' },
    { key: 'certs_category4_title', value: 'MANAJEMEN PROYEK & MEDIASI' },
    { key: 'certs_category4_list', value: 'CAPM., Mediator Bersertifikat' },
    { key: 'stat_experience_num', value: '16+' },
    { key: 'stat_experience_label', value: 'Tahun pengalaman' },
    { key: 'stat_certs_num', value: '14' },
    { key: 'stat_certs_label', value: 'Sertifikasi profesional' },
    { key: 'stat_projects_num', value: '100+' },
    { key: 'stat_projects_label', value: 'Proyek Audit & Konsultasi' },
    { key: 'stat_papers_num', value: '800+' },
    { key: 'stat_papers_label', value: 'Sitasi karya ilmiah' },
    { key: 'stat_affiliations_num', value: '4' },
    { key: 'stat_affiliations_label', value: 'Afiliasi institusi' },
    { key: 'contact_email', value: 'rida.perwita@example.com' },
    { key: 'contact_phone', value: '+62 812-3456-7890' },
    { key: 'sinta_id', value: '' },
    { key: 'scopus_id', value: '' },
    { key: 'scholar_id', value: '' },
    { key: 'orcid_id', value: '' },
    { key: 'citation_text', value: 'Karya-karya ilmiah saya telah disitasi lebih dari 800 kali oleh peneliti lain — sebuah indikator bahwa riset yang saya lakukan memberikan kontribusi nyata bagi perkembangan ilmu akuntansi sektor publik dan audit di Indonesia maupun internasional.' },
    { key: 'contact_title', value: 'Mari berkolaborasi.' },
    { key: 'contact_subtitle', value: 'Apakah Anda mewakili instansi yang membutuhkan jasa audit, organisasi yang ingin memperkuat tata kelola, atau penyelenggara acara yang mencari narasumber — saya terbuka untuk berdiskusi.' },
    { key: 'contact_affiliations', value: 'UPN “Veteran” Jawa Timur — Fakultas Ekonomi dan Bisnis\nKAP Mahsun, Nurdiono, Kukuh dan Rekan\nDrastha Consulting\nDrastha Learning' },
    { key: 'contact_linkedin', value: 'https://linkedin.com/in/rida-perwita-sari' },
    { key: 'seal_text_top', value: 'AUDITING • GOVERNANCE • TRUST' },
    { key: 'seal_text_bottom', value: '* KREDENSIAL RESMI *' },
    { key: 'seal_initials', value: 'RPS' },
    { key: 'seal_line1', value: 'AK. · CA. · CPA.' },
    { key: 'seal_line2', value: 'CFRA. · CIPSAS. · DR.' },
    { key: 'site_watermark', value: 'RPS • VERITAS' },
    { key: 'marquee_text', value: 'INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC' },
    { key: 'services_title', value: 'Tujuh bidang fokus, tiga ranah kerja.' },
    { key: 'services_subtitle', value: 'Dari ruang audit hingga ruang kelas — setiap bidang fokus berangkat dari kombinasi kompetensi akademik dan jam terbang praktik.' },
    { key: 'publications_title', value: 'Riset yang berbicara melalui sitasi.' },
    { key: 'publications_citation_num', value: '800+' },
    { key: 'publications_citation_label', value: 'Sitasi karya ilmiah' },
    { key: 'publications_citation_desc', value: 'Karya-karya ilmiah saya telah disitasi lebih dari 800 kali oleh peneliti lain — indikator kontribusi nyata bagi perkembangan ilmu akuntansi sektor publik dan audit, baik di tingkat nasional maupun internasional.' },
    { key: 'publications_note', value: 'Catatan: tautan Google Scholar, Scopus, SINTA, dan/atau ORCID sebaiknya ditambahkan di sini agar pengunjung dapat menelusuri publikasi lengkap secara langsung.' }
  ]

  const insertSetting = db.prepare(`
    INSERT INTO settings (key, value) 
    VALUES (?, ?)
    ON CONFLICT(key) DO NOTHING
  `)
  const transaction = db.transaction((settingsList) => {
    for (const s of settingsList) {
      insertSetting.run(s.key, s.value)
    }
  })
  transaction(defaultSettings)
  console.log('[Init DB] Default settings verified/seeded.')

  // 4. Seed default projects if empty
  const projectsCheck = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number }
  if (projectsCheck.count === 0) {
    const defaultProjects = [
      {
        title: 'E-Governance Audit Framework',
        description: 'Designing comprehensive audit protocols for municipal and regional public sector organizations, enhancing compliance and accountability.',
        visual_class: 'p-visual-1',
        link: '#project1'
      },
      {
        title: 'Forensic Audit & Asset Recovery',
        description: 'Specialized forensic investigation program targeting internal corporate financial fraud and developing control frameworks to prevent asset dissipation.',
        visual_class: 'p-visual-2',
        link: '#project2'
      },
      {
        title: 'GRC Strategy Implementation',
        description: 'Building high-performing Governance, Risk, Compliance, and Ethical frameworks tailored for state-owned enterprises (BUMN) and private conglomerates.',
        visual_class: 'p-visual-3',
        link: '#project3'
      },
      {
        title: 'CIPSAS Compliance Roadmaps',
        description: 'Designing comprehensive transitions for public sector institutions adapting to International Public Sector Accounting Standards.',
        visual_class: 'p-visual-4',
        link: '#project4'
      }
    ]

    const insertProject = db.prepare('INSERT INTO projects (title, description, visual_class, link) VALUES (?, ?, ?, ?)')
    const transaction = db.transaction((projectsList) => {
      for (const p of projectsList) {
        insertProject.run(p.title, p.description, p.visual_class, p.link)
      }
    })
    transaction(defaultProjects)
    console.log('[Init DB] Default projects seeded.')
  }

  // 5. Seed default services if empty
  const servicesCheck = db.prepare('SELECT COUNT(*) as count FROM services').get() as { count: number }
  if (servicesCheck.count === 0) {
    const defaultServices = [
      {
        title: 'Audit & Akuntan Publik',
        description: 'Layanan audit laporan keuangan dan jasa atestasi lainnya melalui KAP Mahsun, Nurdiono, Kukuh dan Rekan, dengan pendekatan yang menggabungkan standar profesi dan pemahaman mendalam atas konteks sektor publik maupun bisnis.',
        category: 'Untuk Institusi & Organisasi',
        is_highlighted: 1,
        visual_svg_type: 'chart'
      },
      {
        title: 'Konsultasi Bisnis & Tata Kelola',
        description: 'Pendampingan strategis untuk organisasi yang ingin memperkuat sistem akuntansi, manajemen risiko, dan tata kelola keuangan — melalui Drastha Consulting.',
        category: 'Untuk Institusi & Organisasi',
        is_highlighted: 0,
        visual_svg_type: 'boxes'
      },
      {
        title: 'Audit Forensik & Investigasi',
        description: 'Sebagai Certified Forensic Auditor (CFrA), saya membantu mengidentifikasi indikasi kecurangan (fraud) dan memberikan dukungan investigasi keuangan yang sistematis dan berbasis bukti.',
        category: 'Untuk Institusi & Organisasi',
        is_highlighted: 0,
        visual_svg_type: 'cross'
      },
      {
        title: 'Pelatihan & Capacity Building',
        description: 'Program pelatihan akuntansi, audit, dan tata kelola keuangan publik untuk instansi pemerintah, BUMN/BUMD, maupun korporasi — diselenggarakan melalui Drastha Learning.',
        category: 'Untuk Pengembangan SDM',
        is_highlighted: 1,
        visual_svg_type: 'circles'
      },
      {
        title: 'Narasumber & Pembicara',
        description: 'Mengisi seminar, workshop, dan forum ilmiah dengan topik seputar akuntansi sektor publik, audit, manajemen risiko, dan tata kelola.',
        category: 'Untuk Pengembangan SDM',
        is_highlighted: 0,
        visual_svg_type: 'chat'
      },
      {
        title: 'Bimbingan Penelitian & Penulisan Ilmiah',
        description: 'Pendampingan penyusunan artikel ilmiah, tesis, dan disertasi di bidang akuntansi dan audit.',
        category: 'Untuk Akademisi & Peneliti',
        is_highlighted: 0,
        visual_svg_type: 'paper'
      },
      {
        title: 'Jasa Review Jurnal Ilmiah',
        description: 'Sebagai reviewer jurnal terakreditasi nasional dan bereputasi internasional, saya membuka kolaborasi dengan pengelola jurnal yang membutuhkan mitra bestari di bidang akuntansi sektor publik dan audit.',
        category: 'Untuk Akademisi & Peneliti',
        is_highlighted: 0,
        visual_svg_type: 'magnify'
      }
    ]

    const insertService = db.prepare('INSERT INTO services (title, description, category, is_highlighted, visual_svg_type) VALUES (?, ?, ?, ?, ?)')
    const transaction = db.transaction((servicesList) => {
      for (const s of servicesList) {
        insertService.run(s.title, s.description, s.category, s.is_highlighted, s.visual_svg_type)
      }
    })
    transaction(defaultServices)
    console.log('[Init DB] Default services seeded.')
  }

  // 6. Seed default blogs if empty
  const blogsCheck = db.prepare('SELECT COUNT(*) as count FROM blogs').get() as { count: number }
  if (blogsCheck.count === 0) {
    const defaultBlogs = [
      {
        title: 'Pentingnya Audit Kepatuhan di Sektor Publik',
        slug: 'pentingnya-audit-kepatuhan-di-sektor-publik',
        content: `Audit kepatuhan merupakan instrumen krusial bagi instansi pemerintah dan BUMN untuk memastikan seluruh aktivitas operasional berjalan sesuai regulasi yang berlaku.\n\nDalam artikel ini, kita akan membahas:\n1. Mengapa kepatuhan hukum mencegah kebocoran anggaran.\n2. Bagaimana standar GRCE (Governance, Risk, Compliance, and Ethics) membantu manajemen publik.\n3. Peran audit investigatif dalam mendeteksi fraud sejak dini.\n\nDiharapkan melalui audit kepatuhan yang rutin, transparansi laporan keuangan daerah dapat terus dipertahankan secara akuntabel.`,
        image_url: '/images/blog_1.jpg',
        status: 'published'
      },
      {
        title: 'Transisi Menuju Standar Akuntansi CIPSAS di Indonesia',
        slug: 'transisi-menuju-standar-akuntansi-cipsas',
        content: `Adaptasi terhadap International Public Sector Accounting Standards (IPSAS) atau CIPSAS menjadi agenda reformasi akuntansi sektor publik yang menuntut kesiapan kapasitas SDM dan teknologi informasi.\n\nTantangan utama terletak pada:\n- Konversi pencatatan kas menuju akrual penuh.\n- Penilaian aset tetap milik negara yang kompleks.\n- Harmonisasi sistem pelaporan keuangan daerah.\n\nSimak langkah strategis mitigasi risikonya di artikel lengkap ini.`,
        image_url: '/images/blog_2.jpg',
        status: 'published'
      }
    ]

    const insertBlog = db.prepare('INSERT INTO blogs (title, slug, content, image_url, status) VALUES (?, ?, ?, ?, ?)')
    const transaction = db.transaction((blogsList) => {
      for (const b of blogsList) {
        insertBlog.run(b.title, b.slug, b.content, b.image_url, b.status)
      }
    })
    transaction(defaultBlogs)
    console.log('[Init DB] Default blogs seeded.')
  }

  // 7. Seed default publications if empty
  const publicationsCheck = db.prepare('SELECT COUNT(*) as count FROM publications').get() as { count: number }
  if (publicationsCheck.count === 0) {
    const defaultPublications = [
      {
        title: 'Pemeriksaan Akuntansi & Contoh Kasus di Indonesia',
        type: 'Buku',
        link: '',
        description: 'Referensi praktik audit dengan pendekatan studi kasus kontekstual Indonesia.'
      },
      {
        title: 'Journal of Financial Crime',
        type: 'Artikel Jurnal Internasional',
        link: 'https://www.emerald.com/insight/publication/issn/1359-0790',
        description: 'Publikasi internasional di ranah akuntansi forensik dan kejahatan keuangan.'
      }
    ]

    const insertPub = db.prepare('INSERT INTO publications (title, type, link, description) VALUES (?, ?, ?, ?)')
    const transaction = db.transaction((pubList) => {
      for (const p of pubList) {
        insertPub.run(p.title, p.type, p.link, p.description)
      }
    })
    transaction(defaultPublications)
    console.log('[Init DB] Default publications seeded.')
  }

  // 8. Seed default certifications if empty
  const certificationsCheck = db.prepare('SELECT COUNT(*) as count FROM certifications').get() as { count: number }
  if (certificationsCheck.count === 0) {
    const defaultCertifications = [
      {
        short_name: 'CPA',
        title: 'Auditing & Assurance',
        description: 'Certified Public Accountant (Ikatan Akuntan Publik Indonesia - IAPI)'
      },
      {
        short_name: 'CFrA',
        title: 'Forensic Auditing',
        description: 'Certified Forensic Auditor (Badan Nasional Sertifikasi Profesi - BNSP)'
      },
      {
        short_name: 'IPSAS',
        title: 'Public Accounting',
        description: 'Certified International Public Sector Accounting Standards (CIPSAS)'
      },
      {
        short_name: 'GRCE',
        title: 'Governance & Compliance',
        description: 'Governance, Risk, and Compliance Certified Expert'
      }
    ]

    const insertCert = db.prepare('INSERT INTO certifications (short_name, title, description) VALUES (?, ?, ?)')
    const transaction = db.transaction((certList) => {
      for (const c of certList) {
        insertCert.run(c.short_name, c.title, c.description)
      }
    })
    transaction(defaultCertifications)
    console.log('[Init DB] Default certifications seeded.')
  }
})
