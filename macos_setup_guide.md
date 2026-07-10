# 🍎 Panduan Setup & Jalankan Website Portfolio di macOS (Macbook)

Panduan ini menjelaskan langkah demi langkah untuk menginstal, menjalankan, dan membangun proyek website portfolio ini pada perangkat macOS (Macbook Air/Pro, baik chip Intel maupun Apple Silicon M1/M2/M3/M4).

---

## 📋 Prasyarat (Prerequisites)
Sebelum memulai, pastikan macOS Anda telah terpasang:
1. **Terminal**: Aplikasi bawaan Mac untuk menjalankan baris perintah.
2. **Git**: Alat pengelola repositori kode.
3. **Node.js (v22+)**: Runtime Javascript untuk menjalankan Nuxt.

---

## 🛠️ Langkah 1: Instalasi Node.js di macOS

Terdapat dua cara yang direkomendasikan untuk menginstal Node.js di Mac:

### Cara A: Menggunakan NVM (Node Version Manager) — *Sangat Direkomendasikan*
NVM mempermudah Anda berganti versi Node.js tanpa konflik izin akses.

1. Buka aplikasi **Terminal** di Mac Anda (bisa dicari melalui Spotlight dengan menekan `Cmd + Space` lalu ketik "Terminal").
2. Jalankan perintah berikut untuk mengunduh dan menginstal NVM:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```
3. Tutup Terminal Anda dan buka kembali, atau jalankan perintah berikut untuk memuat ulang konfigurasi:
   ```bash
   source ~/.zshrc
   ```
4. Instal Node.js versi 22 (versi stabil yang direkomendasikan):
   ```bash
   nvm install 22
   nvm use 22
   ```
5. Pastikan instalasi berhasil dengan memeriksa versi:
   ```bash
   node -v
   npm -v
   ```

### Cara B: Menggunakan Homebrew (Jika Sudah Terpasang)
Jika Mac Anda sudah menggunakan Homebrew (Package Manager macOS), cukup jalankan:
```bash
brew install node@22
brew link --overwrite node@22
```

---

## 📥 Langkah 2: Kloning Repositori Kode

Di Terminal Mac Anda, masuk ke direktori tempat Anda ingin menyimpan proyek (misalnya folder `Documents` atau `Developer`), lalu kloning repositori GitHub Anda:

```bash
# Masuk ke folder Documents
cd ~/Documents

# Kloning repositori
git clone https://github.com/KawaiEdu/rida_portfolio.git

# Masuk ke dalam direktori proyek
cd rida_portfolio
```

---

## 📦 Langkah 3: Install Dependensi & Setup Environment

1. **Install seluruh paket dependensi**:
   ```bash
   npm install
   ```
   *(Karena macOS memiliki toolchain kompilasi yang baik secara bawaan, proses `better-sqlite3` akan ter-compile secara otomatis tanpa kendala).*

2. **Buat file konfigurasi `.env`**:
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Secara default, konfigurasi port dan secret key sudah terisi di dalam file `.env`).*

---

## 🚀 Langkah 4: Jalankan Website Secara Lokal

### Running Mode Development
Untuk mulai mengedit kode atau melihat perubahan secara real-time (hot-reload):
```bash
npm run dev
```
Setelah perintah berhasil dijalankan, buka browser (Safari, Chrome, atau Firefox) dan akses:
👉 **`http://localhost:3000`**

### Running Mode Production (Preview Lokal)
Untuk menguji performa website dalam mode produksi sebelum dideploy:
```bash
# 1. Build aplikasi
npm run build

# 2. Preview aplikasi yang sudah di-build
npm run preview
```

---

## 🐳 Langkah 5: Menjalankan Menggunakan Docker di macOS (Opsional)

Jika Anda ingin menjalankan website dalam container terisolasi menggunakan Docker:

1. Unduh dan instal **[Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)** (pilih versi yang sesuai dengan tipe prosesor Mac Anda: Apple Chip M1/M2/M3 atau Intel Chip).
2. Buka aplikasi **Docker Desktop** hingga statusnya berubah menjadi *Running* (ikon paus di menu bar berwarna hijau).
3. Di Terminal macOS Anda, jalankan perintah berikut di folder proyek:
   ```bash
   docker compose up -d
   ```
4. Aplikasi Docker Anda akan berjalan di latar belakang. Anda dapat mengakses website di:
   👉 **`http://localhost:3030`** (atau port lain sesuai dengan konfigurasi `docker-compose.yml` Anda).
5. Untuk mematikan container docker:
   ```bash
   docker compose down
   ```
