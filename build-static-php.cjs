const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Static PHP Build Prep...');

// 1. Run static Nuxt generate
try {
  console.log('📦 Running npm run generate...');
  execSync('npm run generate', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Nuxt static build failed:', error);
  process.exit(1);
}

// 2. Define source and destination paths
const srcDir = path.join(__dirname, '.output', 'public');
const destDir = path.join(__dirname, 'dist-static');
const destApiDir = path.join(destDir, 'api');

// Helper to recursively copy directories
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    let stat;
    try {
      stat = fs.statSync(srcPath);
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean and recreate destination directory
if (fs.existsSync(destDir)) {
  console.log('🧹 Cleaning old build directory...');
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });
fs.mkdirSync(destApiDir, { recursive: true });

// 3. Copy static files (.output/public -> dist-static/)
console.log('📂 Copying static assets to dist-static...');
if (fs.existsSync(srcDir)) {
  copyDirSync(srcDir, destDir);
}

// 4. Create root .htaccess file in dist-static
console.log('📝 Creating root .htaccess file...');
const rootHtaccessContent = `# ----------------------------------------------------------------------
# Htaccess file for Nuxt 3 Static Site with PHP API Backend
# Place this file inside your domain's public_html directory
# ----------------------------------------------------------------------

<IfModule mod_rewrite.c>
    RewriteEngine On

    # 1. Route all /api/* requests to the PHP API handler
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^api/(.*)$ api/index.php?route=$1 [QSA,L]

    # 2. Serve static HTML/JS/CSS files directly if they exist
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # 3. Handle Nuxt HTML routing fallback (HTML5 History Mode)
    RewriteRule ^(.*)$ index.html [L]
</IfModule>
`;
fs.writeFileSync(path.join(destDir, '.htaccess'), rootHtaccessContent);

// 5. Create .htaccess inside api/ directory to block direct download of SQLite database
console.log('🔒 Creating secure .htaccess file inside api/ directory...');
const apiHtaccessContent = `<Files "*.db">
    Order Deny,Allow
    Deny from all
</Files>
`;
fs.writeFileSync(path.join(destApiDir, '.htaccess'), apiHtaccessContent);

// 6. Write PHP API Router (api/index.php)
console.log('⚙️ Generating PHP API Router (api/index.php)...');
const phpRouterContent = `<?php
// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json");

// Handle preflight options requests
if (\$_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Get database connection
\$db_file = __DIR__ . '/sqlite.db';
\$db_exists = file_exists(\$db_file);

try {
    \$db = new PDO("sqlite:" . \$db_file);
    \$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    \$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException \$e) {
    http_response_code(500);
    echo json_encode(["statusMessage" => "Database connection failed: " . \$e->getMessage()]);
    exit;
}

// 2. Initialize Database if new
if (!\$db_exists) {
    \$db->exec("
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
    ");

    // Seed default admin: admin / admin123
    \$defaultPasswordHash = password_hash('admin123', PASSWORD_BCRYPT);
    \$stmt = \$db->prepare("INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)");
    \$stmt->execute(['admin', \$defaultPasswordHash]);

    // Seed settings
    \$defaultSettings = [
        ['hero_badge', 'Dr. Rida Perwita Sari, S.E., M.Aks.'],
        ['hero_title_highlight', 'Menjembatani riset akuntansi dengan praktik tata kelola yang akuntabel.'],
        ['hero_credentials', 'Menghubungkan dunia riset, audit, dan praktik tata kelola keuangan publik melalui lebih dari 16 tahun pengalaman di bidang ekonomi, akuntansi, audit, dan forensik.'],
        ['hero_description', 'Saya membantu institusi, lembaga publik, dan organisasi bisnis membangun tata kelola keuangan yang akuntabel — melalui audit, konsultasi, riset, dan pelatihan. Lebih dari 16 tahun pengalaman di bidang ekonomi, akuntansi, audit, dan forensik.'],
        ['hero_image_url', '/images/rida_profile.jpg'],
        ['hero_tag', 'AKADEMISI · AUDITOR · KONSULTAN'],
        ['seal_line1', 'AK. · CA. · CPA.'],
        ['seal_line2', 'CFRA. · CIPSAS. · DR.'],
        ['about_image_url', '/images/rida_profile.jpg'],
        ['about_badge', 'PROFIL EKSEKUTIF'],
        ['about_title', 'Satu kaki di ruang kelas, satu kaki di lapangan.'],
        ['about_description', "Perjalanan saya di dunia akuntansi dimulai lebih dari 16 tahun lalu, dan sejak saat itu saya memilih untuk tidak berhenti hanya di satu peran. Saya adalah dosen Akuntansi Sektor Publik di Program Studi Akuntansi, Fakultas Ekonomi dan Bisnis, UPN “Veteran” Jawa Timur — tempat saya membimbing generasi akuntan dan auditor masa depan. Namun ruang kelas hanyalah satu bagian dari perjalanan saya.\\n\\nDi sisi praktik, saya berperan sebagai auditor dan akuntan publik di KAP Mahsun, Nurdiono, Kukuh dan Rekan (KAP MNK & Rekan), serta sebagai praktisi dan tenaga ahli di Drastha Consulting dan Drastha Learning. Kombinasi ini memungkinkan saya menjembatani teori dan praktik secara langsung — sesuatu yang saya yakini menjadi kekuatan utama dalam memberikan layanan maupun pengajaran yang relevan dengan kebutuhan riil di lapangan."],
        ['about_degree1_title', 'Doktor (S3)'],
        ['about_degree1_field', 'Ilmu Ekonomi / Akuntansi'],
        ['about_degree2_title', 'Magister Akuntansi'],
        ['about_degree2_field', 'M.Aks.'],
        ['about_degree3_title', 'Sarjana Ekonomi'],
        ['about_degree3_field', 'S.E.'],
        ['certs_category1_title', 'AKUNTANSI & AUDIT'],
        ['certs_category1_list', 'Ak., CA., CPA., CFrA.'],
        ['certs_category2_title', 'MANAJEMEN RISIKO & TATA KELOLA'],
        ['certs_category2_list', 'CERA., CRA., CRP., GRCE.'],
        ['certs_category3_title', 'SEKTOR PUBLIK & BISNIS INTERNASIONAL'],
        ['certs_category3_list', 'CIPSAS., CIBA.'],
        ['certs_category4_title', 'MANAJEMEN PROYEK & MEDIASI'],
        ['certs_category4_list', 'CAPM., Mediator Bersertifikat'],
        ['stat_experience_num', '16+'],
        ['stat_experience_label', 'Tahun pengalaman'],
        ['stat_certs_num', '14'],
        ['stat_certs_label', 'Sertifikasi profesional'],
        ['stat_projects_num', '100+'],
        ['stat_projects_label', 'Proyek Audit & Konsultasi'],
        ['stat_papers_num', '800+'],
        ['stat_papers_label', 'Sitasi karya ilmiah'],
        ['stat_affiliations_num', '4'],
        ['stat_affiliations_label', 'Afiliasi institusi'],
        ['contact_email', 'rida.perwita@example.com'],
        ['contact_phone', '+62 812-3456-7890'],
        ['sinta_id', ''],
        ['scopus_id', ''],
        ['scholar_id', ''],
        ['orcid_id', ''],
        ['citation_text', 'Karya-karya ilmiah saya telah disitasi lebih dari 800 kali oleh peneliti lain — sebuah indikator bahwa riset yang saya lakukan memberikan kontribusi nyata bagi perkembangan ilmu akuntansi sektor publik dan audit di Indonesia maupun internasional.'],
        ['contact_title', 'Mari berkolaborasi.'],
        ['contact_subtitle', 'Apakah Anda mewakili instansi yang membutuhkan jasa audit, organisasi yang ingin memperkuat tata kelola, atau penyelenggara acara yang mencari narasumber — saya terbuka untuk berdiskusi.'],
        ['contact_affiliations', "UPN “Veteran” Jawa Timur — Fakultas Ekonomi dan Bisnis\\nKAP Mahsun, Nurdiono, Kukuh dan Rekan\\nDrastha Consulting\\nDrastha Learning"],
        ['contact_linkedin', 'https://linkedin.com/in/rida-perwita-sari'],
        ['seal_text_top', 'AUDITING • GOVERNANCE • TRUST'],
        ['seal_text_bottom', '* KREDENSIAL RESMI *'],
        ['seal_initials', 'RPS'],
        ['seal_line1', 'AK. · CA. · CPA.'],
        ['seal_line2', 'CFRA. · CIPSAS. · DR.'],
        ['site_watermark', 'RPS • VERITAS'],
        ['marquee_text', 'INDEPENDENCE ✦ ACCURACY ✦ INTEGRITY ✦ FORENSIC AUDITING ✦ CIPSAS COMPLIANCE ✦ ENTERPRISE GRC'],
        ['services_title', 'Tujuh bidang fokus, tiga ranah kerja.'],
        ['services_subtitle', 'Dari ruang audit hingga ruang kelas — setiap bidang fokus berangkat dari kombinasi kompetensi akademik dan jam terbang praktik.'],
        ['publications_title', 'Riset yang berbicara melalui sitasi.'],
        ['publications_citation_num', '800+'],
        ['publications_citation_label', 'Sitasi karya ilmiah'],
        ['publications_citation_desc', 'Karya-karya ilmiah saya telah disitasi lebih dari 800 kali oleh peneliti lain — indikator kontribusi nyata bagi perkembangan ilmu akuntansi sektor publik dan audit, baik di tingkat nasional maupun internasional.'],
        ['publications_note', 'Catatan: tautan Google Scholar, Scopus, SINTA, dan/atau ORCID sebaiknya ditambahkan di sini agar pengunjung dapat menelusuri publikasi lengkap secara langsung.']
    ];

    \$stmt = \$db->prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
    foreach (\$defaultSettings as \$setting) {
        \$stmt->execute(\$setting);
    }

    // Seed default projects
    \$defaultProjects = [
        ['E-Governance Audit Framework', 'Designing comprehensive audit protocols for municipal and regional public sector organizations, enhancing compliance and accountability.', 'p-visual-1', '#project1'],
        ['Forensic Audit & Asset Recovery', 'Specialized forensic investigation program targeting internal corporate financial fraud and developing control frameworks to prevent asset dissipation.', 'p-visual-2', '#project2'],
        ['GRC Strategy Implementation', 'Building high-performing Governance, Risk, Compliance, and Ethical frameworks tailored for state-owned enterprises (BUMN) and private conglomerates.', 'p-visual-3', '#project3'],
        ['CIPSAS Compliance Roadmaps', 'Designing comprehensive transitions for public sector institutions adapting to International Public Sector Accounting Standards.', 'p-visual-4', '#project4']
    ];
    \$stmt = \$db->prepare("INSERT INTO projects (title, description, visual_class, link) VALUES (?, ?, ?, ?)");
    foreach (\$defaultProjects as \$proj) {
        \$stmt->execute(\$proj);
    }

    // Seed default services
    \$defaultServices = [
        ['Audit & Akuntan Publik', 'Layanan audit laporan keuangan dan jasa atestasi lainnya melalui KAP Mahsun, Nurdiono, Kukuh dan Rekan, dengan pendekatan yang menggabungkan standar profesi dan pemahaman mendalam atas konteks sektor publik maupun bisnis.', 'Untuk Institusi & Organisasi', 1, 'chart'],
        ['Konsultasi Bisnis & Tata Kelola', 'Pendampingan strategis untuk organisasi yang ingin memperkuat sistem akuntansi, manajemen risiko, dan tata kelola keuangan — melalui Drastha Consulting.', 'Untuk Institusi & Organisasi', 0, 'boxes'],
        ['Audit Forensik & Investigasi', 'Sebagai Certified Forensic Auditor (CFrA), saya membantu mengidentifikasi indikasi kecurangan (fraud) dan memberikan dukungan investigasi keuangan yang sistematis dan berbasis bukti.', 'Untuk Institusi & Organisasi', 0, 'cross'],
        ['Pelatihan & Capacity Building', 'Program pelatihan akuntansi, audit, dan tata kelola keuangan publik untuk instansi pemerintah, BUMN/BUMD, maupun korporasi — diselenggarakan melalui Drastha Learning.', 'Untuk Pengembangan SDM', 1, 'circles'],
        ['Narasumber & Pembicara', 'Mengisi seminar, workshop, dan forum ilmiah dengan topik seputar akuntansi sektor publik, audit, manajemen risiko, dan tata kelola.', 'Untuk Pengembangan SDM', 0, 'chat'],
        ['Bimbingan Penelitian & Penulisan Ilmiah', 'Pendampingan penyusunan artikel ilmiah, tesis, dan disertasi di bidang akuntansi dan audit.', 'Untuk Akademisi & Peneliti', 0, 'paper'],
        ['Jasa Review Jurnal Ilmiah', 'Sebagai reviewer jurnal terakreditasi nasional dan bereputasi internasional, saya membuka kolaborasi dengan pengelola jurnal yang membutuhkan mitra bestari di bidang akuntansi sektor publik dan audit.', 'Untuk Akademisi & Peneliti', 0, 'magnify']
    ];
    \$stmt = \$db->prepare("INSERT INTO services (title, description, category, is_highlighted, visual_svg_type) VALUES (?, ?, ?, ?, ?)");
    foreach (\$defaultServices as \$srv) {
        \$stmt->execute(\$srv);
    }

    // Seed default blogs
    \$defaultBlogs = [
        ['Pentingnya Audit Kepatuhan di Sektor Publik', 'pentingnya-audit-kepatuhan-di-sektor-publik', "Audit kepatuhan merupakan instrumen krusial bagi instansi pemerintah dan BUMN untuk memastikan seluruh aktivitas operasional berjalan sesuai regulasi yang berlaku.\\n\\nDalam artikel ini, kita akan membahas:\\n1. Mengapa kepatuhan hukum mencegah kebocoran anggaran.\\n2. Bagaimana standar GRCE (Governance, Risk, Compliance, and Ethics) membantu manajemen publik.\\n3. Peran audit investigatif dalam mendeteksi fraud sejak dini.\\n\\nDiharapkan melalui audit kepatuhan yang rutin, transparansi laporan keuangan daerah dapat terus dipertahankan secara akuntabel.", '/images/blog_1.jpg', 'published'],
        ['Transisi Menuju Standar Akuntansi CIPSAS di Indonesia', 'transisi-menuju-standar-akuntansi-cipsas', "Adaptasi terhadap International Public Sector Accounting Standards (IPSAS) atau CIPSAS menjadi agenda reformasi akuntansi sektor publik yang menuntut kesiapan kapasitas SDM dan teknologi informasi.\\n\\nTantangan utama terletak pada:\\n- Konversi pencatatan kas menuju akrual penuh.\\n- Penilaian aset tetap milik negara yang kompleks.\\n- Harmonisasi sistem pelaporan keuangan daerah.\\n\\nSimak langkah strategis mitigasi risikonya di artikel lengkap ini.", '/images/blog_2.jpg', 'published']
    ];
    \$stmt = \$db->prepare("INSERT INTO blogs (title, slug, content, image_url, status) VALUES (?, ?, ?, ?, ?)");
    foreach (\$defaultBlogs as \$blg) {
        \$stmt->execute(\$blg);
    }

    // Seed default publications
    \$defaultPubs = [
        ['Pemeriksaan Akuntansi & Contoh Kasus di Indonesia', 'Buku', '', 'Referensi praktik audit dengan pendekatan studi kasus kontekstual Indonesia.'],
        ['Journal of Financial Crime', 'Artikel Jurnal Internasional', 'https://www.emerald.com/insight/publication/issn/1359-0790', 'Publikasi internasional di ranah akuntansi forensik dan kejahatan keuangan.']
    ];
    \$stmt = \$db->prepare("INSERT INTO publications (title, type, link, description) VALUES (?, ?, ?, ?)");
    foreach (\$defaultPubs as \$pub) {
        \$stmt->execute(\$pub);
    }
}

// JWT helper functions
define('JWT_SECRET', 'rida-secret-key-default-987654321');

function jwt_sign(\$payload) {
    \$header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
    \$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(\$header));
    \$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode(\$payload)));
    \$signature = hash_hmac('sha256', \$base64UrlHeader . "." . \$base64UrlPayload, JWT_SECRET, true);
    \$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(\$signature));
    return \$base64UrlHeader . "." . \$base64UrlPayload . "." . \$base64UrlSignature;
}

function jwt_verify(\$token) {
    \$parts = explode('.', \$token);
    if (count(\$parts) !== 3) return false;
    list(\$base64UrlHeader, \$base64UrlPayload, \$base64UrlSignature) = \$parts;
    \$signature = hash_hmac('sha256', \$base64UrlHeader . "." . \$base64UrlPayload, JWT_SECRET, true);
    \$base64UrlExpectedSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(\$signature));
    if (hash_equals(\$base64UrlExpectedSignature, \$base64UrlSignature)) {
        \$payloadJson = base64_decode(str_replace(['-', '_'], ['+', '/'], \$base64UrlPayload));
        return json_decode(\$payloadJson, true);
    }
    return false;
}

function check_auth() {
    \$token = \$_COOKIE['admin_token'] ?? null;
    if (!\$token) {
        http_response_code(401);
        echo json_encode(['statusMessage' => 'Unauthorized']);
        exit;
    }
    \$decoded = jwt_verify(\$token);
    if (!\$decoded) {
        http_response_code(401);
        echo json_encode(['statusMessage' => 'Sesi tidak valid']);
        exit;
    }
    return \$decoded;
}

// Router matching
\$route = \$_GET['route'] ?? '';
\$method = \$_SERVER['REQUEST_METHOD'];
\$body = json_decode(file_get_contents('php://input'), true) ?? [];

// Helper response functions
function json_response(\$data, \$status = 200) {
    http_response_code(\$status);
    echo json_encode(\$data);
    exit;
}

function error_response(\$message, \$status = 400) {
    http_response_code(\$status);
    echo json_encode(['statusMessage' => \$message]);
    exit;
}

// Route dispatcher
switch (\$route) {
    case 'auth/login':
        if (\$method !== 'POST') error_response('Method not allowed', 405);
        \$username = \$body['username'] ?? '';
        \$password = \$body['password'] ?? '';
        if (!\$username || !\$password) error_response('Username dan password wajib diisi');
        
        \$stmt = \$db->prepare("SELECT * FROM users WHERE username = ?");
        \$stmt->execute([\$username]);
        \$user = \$stmt->fetch();
        
        if (!\$user || !password_verify(\$password, \$user['password'])) {
            error_response('Username atau password salah', 401);
        }
        
        \$token = jwt_sign(['id' => \$user['id'], 'username' => \$user['username']]);
        
        // Set HTTP-Only Cookie
        setcookie('admin_token', \$token, [
            'expires' => time() + 60*60*24*7, // 7 days
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        
        json_response([
            'success' => true,
            'user' => ['id' => \$user['id'], 'username' => \$user['username']]
        ]);
        break;

    case 'auth/me':
        if (\$method !== 'GET') error_response('Method not allowed', 405);
        \$user = check_auth();
        json_response([
            'authenticated' => true,
            'user' => ['id' => \$user['id'], 'username' => \$user['username']]
        ]);
        break;

    case 'auth/logout':
        if (\$method !== 'POST') error_response('Method not allowed', 405);
        setcookie('admin_token', '', [
            'expires' => time() - 3600,
            'path' => '/'
        ]);
        json_response(['success' => true]);
        break;

    case 'settings':
        if (\$method === 'GET') {
            \$rows = \$db->query("SELECT * FROM settings")->fetchAll();
            \$settings = [];
            foreach (\$rows as \$row) {
                \$settings[\$row['key']] = \$row['value'];
            }
            json_response(\$settings);
        } elseif (\$method === 'POST') {
            check_auth();
            \$stmt = \$db->prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
            foreach (\$body as \$key => \$val) {
                \$stmt->execute([\$key, strval(\$val)]);
            }
            json_response(['success' => true]);
        }
        break;

    case 'services':
        if (\$method === 'GET') {
            \$rows = \$db->query("SELECT * FROM services ORDER BY id ASC")->fetchAll();
            json_response(\$rows);
        }
        break;

    case 'projects':
        if (\$method === 'GET') {
            \$rows = \$db->query("SELECT * FROM projects ORDER BY id DESC")->fetchAll();
            json_response(\$rows);
        } elseif (\$method === 'POST') {
            check_auth();
            \$title = \$body['title'] ?? '';
            \$description = \$body['description'] ?? '';
            \$visual_class = \$body['visual_class'] ?? 'p-visual-1';
            \$link = \$body['link'] ?? '';
            
            if (!\$title || !\$description) error_response('Judul dan deskripsi wajib diisi');
            
            if (isset(\$body['id'])) {
                \$stmt = \$db->prepare("UPDATE projects SET title = ?, description = ?, visual_class = ?, link = ? WHERE id = ?");
                \$stmt->execute([\$title, \$description, \$visual_class, \$link, \$body['id']]);
            } else {
                \$stmt = \$db->prepare("INSERT INTO projects (title, description, visual_class, link) VALUES (?, ?, ?, ?)");
                \$stmt->execute([\$title, \$description, \$visual_class, \$link]);
            }
            json_response(['success' => true]);
        }
        break;

    case 'publications':
        if (\$method === 'GET') {
            \$rows = \$db->query("SELECT * FROM publications ORDER BY id DESC")->fetchAll();
            json_response(\$rows);
        } elseif (\$method === 'POST') {
            check_auth();
            \$title = \$body['title'] ?? '';
            \$type = \$body['type'] ?? 'Artikel Jurnal';
            \$link = \$body['link'] ?? '';
            \$description = \$body['description'] ?? '';
            
            if (!\$title) error_response('Judul wajib diisi');
            
            if (isset(\$body['id'])) {
                \$stmt = \$db->prepare("UPDATE publications SET title = ?, type = ?, link = ?, description = ? WHERE id = ?");
                \$stmt->execute([\$title, \$type, \$link, \$description, \$body['id']]);
            } else {
                \$stmt = \$db->prepare("INSERT INTO publications (title, type, link, description) VALUES (?, ?, ?, ?)");
                \$stmt->execute([\$title, \$type, \$link, \$description]);
            }
            json_response(['success' => true]);
        }
        break;

    case 'blogs':
        if (\$method === 'GET') {
            \$rows = \$db->query("SELECT * FROM blogs ORDER BY created_at DESC")->fetchAll();
            json_response(\$rows);
        } elseif (\$method === 'POST') {
            check_auth();
            \$title = \$body['title'] ?? '';
            \$slug = \$body['slug'] ?? '';
            \$content = \$body['content'] ?? '';
            \$image_url = \$body['image_url'] ?? '';
            \$status = \$body['status'] ?? 'draft';
            
            if (!\$title || !\$content) error_response('Judul dan konten wajib diisi');
            if (!\$slug) \$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', \$title)));
            
            if (isset(\$body['id'])) {
                \$stmt = \$db->prepare("UPDATE blogs SET title = ?, slug = ?, content = ?, image_url = ?, status = ? WHERE id = ?");
                \$stmt->execute([\$title, \$slug, \$content, \$image_url, \$status, \$body['id']]);
            } else {
                \$stmt = \$db->prepare("INSERT INTO blogs (title, slug, content, image_url, status) VALUES (?, ?, ?, ?, ?)");
                \$stmt->execute([\$title, \$slug, \$content, \$image_url, \$status]);
            }
            json_response(['success' => true]);
        }
        break;

    case 'contact':
        if (\$method === 'GET') {
            check_auth();
            \$rows = \$db->query("SELECT * FROM contact_messages ORDER BY created_at DESC")->fetchAll();
            json_response(\$rows);
        } elseif (\$method === 'POST') {
            \$name = \$body['name'] ?? '';
            \$email = \$body['email'] ?? '';
            \$institution = \$body['institution'] ?? '';
            \$topic = \$body['topic'] ?? '';
            \$message = \$body['message'] ?? '';
            
            if (!\$name || !\$email || !\$message) error_response('Nama, email, dan pesan wajib diisi');
            
            \$stmt = \$db->prepare("INSERT INTO contact_messages (name, email, institution, topic, message) VALUES (?, ?, ?, ?, ?)");
            \$stmt->execute([\$name, \$email, \$institution, \$topic, \$message]);
            json_response(['success' => true]);
        }
        break;

    case 'upload':
        if (\$method !== 'POST') error_response('Method not allowed', 405);
        check_auth();
        
        if (!isset(\$_FILES['file'])) error_response('Tidak ada berkas yang diunggah');
        
        \$file = \$_FILES['file'];
        if (\$file['error'] !== UPLOAD_ERR_OK) error_response('Gagal mengunggah berkas: ' . \$file['error']);
        
        \$ext = strtolower(pathinfo(\$file['name'], PATHINFO_EXTENSION));
        \$allowed = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array(\$ext, \$allowed)) error_response('Tipe berkas tidak didukung');
        
        \$upload_dir = __DIR__ . '/../uploads';
        if (!file_exists(\$upload_dir)) {
            mkdir(\$upload_dir, 0755, true);
        }
        
        \$new_name = 'upload-' . time() . '-' . rand(1000, 9999) . '.' . \$ext;
        \$dest = \$upload_dir . '/' . \$new_name;
        
        if (move_uploaded_file(\$file['tmp_name'], \$dest)) {
            json_response([
                'success' => true,
                'url' => '/uploads/' . \$new_name
            ]);
        } else {
            error_response('Gagal menyimpan berkas di server');
        }
        break;
}

// Handle dynamic path deletes (e.g. DELETE projects/5)
if (preg_match('/^(projects|publications|blogs|contact)\/([0-9]+)$/', \$route, \$matches)) {
    check_auth();
    if (\$method === 'DELETE') {
        \$table = \$matches[1];
        if (\$table === 'contact') \$table = 'contact_messages';
        \$id = intval(\$matches[2]);
        
        \$stmt = \$db->prepare("DELETE FROM \$table WHERE id = ?");
        \$stmt->execute([\$id]);
        json_response(['success' => true]);
    }
}

// Handle dynamic path GET (e.g. GET blogs/my-slug)
if (preg_match('/^blogs\/([a-zA-Z0-9-]+)$/', \$route, \$matches)) {
    if (\$method === 'GET') {
        \$slug = \$matches[1];
        \$stmt = \$db->prepare("SELECT * FROM blogs WHERE slug = ?");
        \$stmt->execute([\$slug]);
        \$blog = \$stmt->fetch();
        if (\$blog) {
            json_response(\$blog);
        } else {
            error_response('Blog tidak ditemukan', 404);
        }
    }
}

error_response('Route not found', 404);
`;
fs.writeFileSync(path.join(destApiDir, 'index.php'), phpRouterContent);

console.log('\n✨ Static PHP Build preparation successful! ✨');
console.log('==================================================');
console.log('File hasil build Anda berada di folder: "dist-static"');
console.log('--------------------------------------------------');
console.log('Cukup unggah SEMUA isi folder "dist-static" langsung ke folder "public_html" Hostinger.');
console.log('==================================================\n');
