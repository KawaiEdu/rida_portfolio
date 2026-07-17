const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Hostinger Production Build Prep...');

// 1. Run standard Nuxt build
try {
  console.log('📦 Running npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Nuxt build failed:', error);
  process.exit(1);
}

// 2. Define source and destination paths
const srcDir = path.join(__dirname, '.output');
const destDir = path.join(__dirname, 'dist-hostinger');
const destPublicHtml = path.join(destDir, 'public_html');
const destBackend = path.join(destDir, 'backend');

// Helper to recursively copy directories
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean and recreate destination directories
if (fs.existsSync(destDir)) {
  console.log('🧹 Cleaning old build directory...');
  fs.rmSync(destDir, { recursive: true, force: true });
}
fs.mkdirSync(destDir, { recursive: true });
fs.mkdirSync(destPublicHtml, { recursive: true });
fs.mkdirSync(destBackend, { recursive: true });

// 3. Copy static files (.output/public -> dist-hostinger/public_html)
console.log('📂 Copying public static assets to public_html...');
if (fs.existsSync(path.join(srcDir, 'public'))) {
  copyDirSync(path.join(srcDir, 'public'), destPublicHtml);
}

// 4. Create .htaccess file in public_html
console.log('📝 Creating .htaccess file in public_html...');
const htaccessContent = `# ----------------------------------------------------------------------
# Htaccess file for Nuxt 3 on Hostinger Shared Hosting
# Place this file inside your domain's public_html directory
# ----------------------------------------------------------------------

<IfModule mod_rewrite.c>
    RewriteEngine On

    # 1. Serve static files directly from public_html if they exist
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # 2. Rewrite all other dynamic requests (pages, API, admin) to the Node.js port.
    # Note: Replace '3000' with the port allocated by Hostinger Node.js Dashboard.
    RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
</IfModule>
`;
fs.writeFileSync(path.join(destPublicHtml, '.htaccess'), htaccessContent);

// 5. Copy backend server files (.output/server -> dist-hostinger/backend/.output/server)
console.log('⚙️ Copying server files to backend...');
if (fs.existsSync(path.join(srcDir, 'server'))) {
  copyDirSync(path.join(srcDir, 'server'), path.join(destBackend, '.output', 'server'));
}

// 6. Copy package.json to backend
console.log('📄 Copying package.json to backend...');
fs.copyFileSync(path.join(__dirname, 'package.json'), path.join(destBackend, 'package.json'));

// 7. Create app.js entrypoint in backend
console.log('🔌 Creating app.js startup file in backend...');
const appJsContent = `// Entry point for Hostinger Node.js Application Manager
import('./.output/server/index.mjs');
`;
fs.writeFileSync(path.join(destBackend, 'app.js'), appJsContent);

console.log('\n✨ Build preparation successful! ✨');
console.log('==================================================');
console.log('File hasil build Anda berada di folder: "dist-hostinger"');
console.log('--------------------------------------------------');
console.log('📁 dist-hostinger/public_html -> UPLOAD semua isinya ke folder "public_html" Hostinger.');
console.log('📁 dist-hostinger/backend     -> UPLOAD semua isinya ke folder Node.js backend Anda.');
console.log('==================================================\n');
