# Wujud Tour & Travel — Website + CMS

Website resmi Wujud Tour & Travel (PT Wujud Mitra Mandiri), dibangun dengan struktur mengikuti esqtours.com,
lengkap dengan CMS admin panel agar semua konten (paket, artikel, tim, testimoni, galeri, dsb.) bisa
diperbarui sendiri tanpa perlu sentuh kode.

## Teknologi

- **Next.js 14** (App Router) — frontend publik + admin panel dalam satu aplikasi
- **SQLite** (`better-sqlite3`) — database, satu file, tidak perlu server database terpisah
- **JWT (jose) + bcrypt** — autentikasi admin
- **Tailwind CSS v4** — styling

## Menjalankan di Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` untuk situs publik, dan `http://localhost:3000/admin` untuk admin panel.

Database `data/cms.db` akan otomatis dibuat & diisi data contoh (seed) saat pertama kali dijalankan.

### Login Admin Default

```
Username: admin
Password: admin123
```

**Segera ganti password ini** setelah login pertama, lewat menu **Akun Saya** di admin panel.

## Struktur Konten yang Bisa Dikelola dari Admin Panel

| Menu Admin        | Keterangan                                                        |
|--------------------|--------------------------------------------------------------------|
| Hero / Beranda     | Judul utama, subjudul, gambar latar, tombol CTA di halaman depan  |
| Paket Umroh & Haji | Semua paket (kategori: Umroh / Haji / Halal Holidays)              |
| Artikel            | Tips, panduan, dan berita                                          |
| Galeri             | Foto-foto momen jamaah                                             |
| Halaman Statis     | Isi teks: Tentang Kami, Nilai-Nilai, Penghargaan, Layanan Kami     |
| Tim                | Profil pimpinan / tim yang tampil di halaman Tentang Kami          |
| Testimoni          | Ulasan jamaah yang tampil di Beranda                                |
| Mitra              | Logo mitra/kolaborator                                              |
| Statistik          | Angka pencapaian (jumlah jamaah, tahun pengalaman, dst.)           |
| Pengaturan Situs   | Nama situs, nomor WhatsApp, email, alamat, media sosial            |

Semua gambar diunggah lewat form admin dan otomatis tersimpan di `public/uploads/`.

## Environment Variables

Salin `.env.example` menjadi `.env` lalu isi:

```
AUTH_SECRET=isi-dengan-string-acak-panjang-dan-rahasia
```

`AUTH_SECRET` wajib diganti sebelum deploy ke production — jangan gunakan nilai default.

## Build untuk Production

```bash
npm run build
npm run start
```

## Deployment

Karena aplikasi ini butuh Node.js server (bukan situs statis) untuk menjalankan API, autentikasi, dan
database SQLite, **tidak bisa langsung di-deploy ke Netlify** seperti situs company profile sebelumnya.
Pilihan hosting yang cocok:

- **Railway / Render / Fly.io** — mendukung Next.js + volume persisten.
- **VPS** (mis. DigitalOcean, Biznet, dsb.) — jalankan dengan `pm2` atau `systemd`, lalu reverse-proxy
  lewat Nginx/Caddy.
- **VPS + Docker** — bisa dibuatkan `Dockerfile` bila diperlukan.

### Deploy ke Railway (rekomendasi termudah)

1. Push project ini ke sebuah repository GitHub (lihat langkah di atas kalau belum tahu caranya).
2. Di Railway: **New Project** → **Deploy from GitHub repo** → pilih repo ini.
3. Railway otomatis mendeteksi Next.js dan menjalankan `npm install` + `npm run build` + `npm run start`.
4. Buka tab **Variables**, tambahkan:
   - `AUTH_SECRET` — isi string acak yang panjang (wajib, jangan pakai nilai default).
   - `DB_PATH=/app/data/cms.db`
   - `UPLOAD_DIR=/app/data/uploads`
5. Buka tab **Settings** → **Volumes** → **Add Volume**, isi Mount Path dengan `/app/data`.
   Railway hanya mengizinkan satu volume per service, jadi database dan folder upload foto
   sengaja diletakkan dalam satu folder volume yang sama (`/app/data`) supaya keduanya sama-sama
   permanen dan tidak hilang saat redeploy.
6. Redeploy service (Railway biasanya otomatis redeploy setelah variable/volume ditambahkan).
7. Setelah selesai, Railway memberi URL publik (mis. `nama-project.up.railway.app`) — buka URL itu,
   lalu masuk ke `/admin` dan segera ganti password default.

Yang penting: pastikan folder database dan upload disimpan di **volume/disk persisten**, bukan storage
sementara — kalau tidak, isi database dan foto yang diupload akan hilang setiap kali aplikasi
di-restart/redeploy.

## Struktur Folder Penting

```
app/                    # Halaman publik & admin (App Router)
  admin/                 # Semua halaman admin panel
  api/                   # API routes (auth, CRUD konten, upload)
  paket/, artikel/, ...  # Halaman publik
components/
  site/                  # Komponen situs publik (Header, Footer, dst.)
  admin/                 # Komponen admin (ModelManager, AdminChrome)
lib/
  db.js                  # Koneksi database + skema + seed data awal
  models.js              # Helper query generik per model
  auth.js                # Sesi login (JWT + cookie)
  data.js                # Helper untuk halaman publik (hanya data published)
  upload.js              # Simpan file upload ke public/uploads
data/cms.db              # File database SQLite (dibuat otomatis, jangan di-commit ke git)
public/uploads/          # File gambar yang diunggah lewat admin
```
