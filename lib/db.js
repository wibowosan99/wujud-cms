import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'cms.db');

let db;

function getDb() {
  if (db) return db;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('busy_timeout = 5000');
  migrate(db);
  return db;
}

function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'admin',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS hero_slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      subtitle TEXT,
      image TEXT,
      cta_label TEXT,
      cta_link TEXT,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL DEFAULT 'umroh', -- haji | umroh | halal_holiday
      excerpt TEXT,
      content TEXT,
      image TEXT,
      price TEXT,
      duration TEXT,
      departure_date TEXT,
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT,
      excerpt TEXT,
      content TEXT,
      image TEXT,
      published INTEGER DEFAULT 1,
      published_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT,
      photo TEXT,
      bio TEXT,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      source TEXT,
      quote TEXT,
      photo TEXT,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      logo TEXT,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS partner_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      brand_name TEXT,
      city TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'baru',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS affiliates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      umroh_year TEXT,
      message TEXT,
      photo TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT,
      content TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  seedIfEmpty(db);
}

function seedIfEmpty(db) {
  const userCount = db.prepare('SELECT COUNT(*) c FROM users').get().c;
  if (userCount === 0) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT OR IGNORE INTO users (username, password_hash, name, role) VALUES (?,?,?,?)')
      .run('admin', hash, 'Administrator', 'admin');
  }

  const settingsCount = db.prepare('SELECT COUNT(*) c FROM settings').get().c;
  if (settingsCount === 0) {
    const defaults = {
      site_name: 'Wujud Tour & Travel',
      tagline: 'Perjalanan Umroh & Haji Penuh Makna',
      whatsapp_number: '628119747717',
      whatsapp_message: 'Saya (Nama Anda) dari (Lokasi Anda), ingin bertanya tentang paket Umroh/Haji di Wujud Tour',
      email: 'info@wujudtour.com',
      phone: '0811-9747-717',
      address: 'Tangerang Selatan, Indonesia',
      logo: '',
      hero_note: '',
      instagram: '',
      facebook: '',
      youtube: '',
      about_short: 'Wujud Tour & Travel (PT Wujud Mitra Mandiri) adalah PPIU Umroh berizin resmi yang melayani jamaah dengan sepenuh hati.',
    };
    const stmt = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?,?)');
    for (const [k, v] of Object.entries(defaults)) stmt.run(k, v);
  }

  const statsCount = db.prepare('SELECT COUNT(*) c FROM stats').get().c;
  if (statsCount === 0) {
    const stmt = db.prepare('INSERT OR IGNORE INTO stats (label, value, sort_order) VALUES (?,?,?)');
    stmt.run('Penghargaan', '15+', 1);
    stmt.run('Jamaah Keberangkatan', '5K+', 2);
    stmt.run('Tahun Pengalaman', '10+', 3);
  }

  const pagesCount = db.prepare('SELECT COUNT(*) c FROM pages').get().c;
  if (pagesCount === 0) {
    const stmt = db.prepare('INSERT OR IGNORE INTO pages (slug, title, content) VALUES (?,?,?)');
    stmt.run(
      'about-us',
      'Tentang Kami',
      'Wujud Tour & Travel (PT Wujud Mitra Mandiri) adalah Penyelenggara Perjalanan Ibadah Umroh (PPIU) berizin resmi yang berbasis di Tangerang Selatan. Kami hadir untuk membantu setiap jamaah menjalankan ibadah dengan tenang, nyaman, dan penuh makna, mulai dari persiapan dokumen, bimbingan manasik, hingga pendampingan penuh selama perjalanan.\n\nDengan tim yang berpengalaman dan jaringan mitra terpercaya di Tanah Suci, kami berkomitmen memberikan pelayanan terbaik pada setiap langkah perjalanan ibadah Anda.'
    );
    stmt.run(
      'core-values',
      'Nilai-Nilai Kami',
      'Amanah — Kami menjaga kepercayaan jamaah dalam setiap aspek perjalanan.\n\nPelayanan Sepenuh Hati — Setiap jamaah mendapat perhatian dan pendampingan personal.\n\nTransparansi — Informasi biaya dan jadwal disampaikan secara jelas sejak awal.\n\nKenyamanan — Fasilitas dan akomodasi dipilih dengan standar terbaik untuk ibadah yang khusyuk.'
    );
    stmt.run(
      'our-awards',
      'Penghargaan Kami',
      'Wujud Tour & Travel telah dipercaya oleh ribuan jamaah dan mendapat apresiasi dari mitra maskapai serta penyedia akomodasi di Tanah Suci atas konsistensi pelayanan dan kepuasan jamaah.'
    );
    stmt.run(
      'layanan-kami',
      'Layanan Kami',
      'Kami menyediakan layanan Umroh reguler & plus, Haji Khusus, program Halal Holidays / halal tour ke berbagai destinasi, pengurusan dokumen perjalanan, serta layanan B2B white-label bagi mitra travel dan agen.'
    );
  }

  const packagesCount = db.prepare('SELECT COUNT(*) c FROM packages').get().c;
  if (packagesCount === 0) {
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO packages (title, slug, category, excerpt, content, image, price, duration, departure_date, featured, published, sort_order)
       VALUES (?,?,?,?,?,?,?,?,?,?,1,?)`
    );
    stmt.run(
      'Umroh Maulid Nabi',
      'umroh-maulid-nabi',
      'umroh',
      'Rasakan momen penuh berkah menyambut Maulid Nabi di Tanah Suci bersama Wujud Tour.',
      'Paket Umroh Maulid Nabi dirancang untuk jamaah yang ingin merasakan suasana penuh berkah menjelang peringatan Maulid Nabi Muhammad SAW. Termasuk akomodasi hotel bintang, transportasi ber-AC, bimbingan manasik, dan pendampingan tour leader berpengalaman selama di Makkah dan Madinah.',
      '',
      'Hubungi kami untuk harga terbaru',
      '9 Hari 7 Malam',
      '27 Agustus 2026',
      1,
      1
    );
    stmt.run(
      'Hainan Tour',
      'hainan-tour',
      'halal',
      'Jelajahi keindahan Pulau Hainan, Tiongkok, dengan itinerary halal-friendly bersama Wujud Tour.',
      'Paket Hainan Tour mengajak Anda menikmati keindahan pantai, kuliner, dan budaya Pulau Hainan dengan itinerary yang telah disesuaikan bagi wisatawan Muslim, termasuk akses ke restoran halal dan waktu ibadah yang terjaga.',
      '',
      'Hubungi kami untuk harga terbaru',
      '6 Hari 5 Malam',
      '2 Oktober 2026',
      1,
      2
    );
    stmt.run(
      'Umroh Reguler',
      'umroh-reguler',
      'umroh',
      'Program Umroh reguler dengan jadwal keberangkatan rutin setiap bulan.',
      'Umroh Reguler Wujud Tour hadir dengan jadwal keberangkatan rutin, cocok bagi jamaah yang ingin beribadah dengan fleksibilitas waktu dan harga yang kompetitif tanpa mengurangi kualitas pelayanan.',
      '',
      'Hubungi kami untuk harga terbaru',
      '9 Hari 7 Malam',
      'Jadwal rutin bulanan',
      0,
      3
    );
    stmt.run(
      'Haji Khusus',
      'haji-khusus',
      'haji',
      'Layanan Haji Khusus dengan masa tunggu lebih singkat dan fasilitas premium.',
      'Program Haji Khusus Wujud Tour bekerja sama dengan mitra resmi di Arab Saudi untuk memberikan pengalaman ibadah haji yang nyaman, dengan akomodasi dekat Masjidil Haram dan pendampingan penuh dari pembimbing ibadah berpengalaman.',
      '',
      'Hubungi kami untuk harga terbaru',
      '25-27 Hari',
      'Sesuai kuota tahunan',
      0,
      4
    );
  }

  const articlesCount = db.prepare('SELECT COUNT(*) c FROM articles').get().c;
  if (articlesCount === 0) {
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO articles (title, slug, category, excerpt, content, image, published)
       VALUES (?,?,?,?,?,?,1)`
    );
    stmt.run(
      'Tips Mempersiapkan Fisik Sebelum Umroh',
      'tips-mempersiapkan-fisik-sebelum-umroh',
      'Tips Umroh',
      'Persiapan fisik yang baik akan membuat ibadah Umroh Anda lebih khusyuk dan nyaman.',
      'Ibadah Umroh membutuhkan stamina yang baik karena banyak aktivitas fisik seperti tawaf dan sa\u2019i. Mulailah membiasakan jalan kaki rutin beberapa minggu sebelum keberangkatan, jaga pola tidur, dan konsultasikan kondisi kesehatan Anda ke dokter jika memiliki riwayat penyakit tertentu.',
      ''
    );
    stmt.run(
      'Perbedaan Umroh Reguler dan Umroh Plus',
      'perbedaan-umroh-reguler-dan-umroh-plus',
      'Panduan',
      'Kenali perbedaan fasilitas dan itinerary antara Umroh Reguler dan Umroh Plus.',
      'Umroh Reguler umumnya berfokus pada ibadah di Makkah dan Madinah dengan jadwal padat, sementara Umroh Plus menambahkan kunjungan ke negara lain seperti Turki atau Mesir setelah rangkaian ibadah selesai, cocok bagi jamaah yang ingin sekaligus berwisata.',
      ''
    );
  }

  const teamCount = db.prepare('SELECT COUNT(*) c FROM team_members').get().c;
  if (teamCount === 0) {
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO team_members (name, position, photo, bio, sort_order, published) VALUES (?,?,?,?,?,1)`
    );
    stmt.run('Tim Wujud Tour', 'Founder & Direktur', '', '', 1);
  }

  const testiCount = db.prepare('SELECT COUNT(*) c FROM testimonials').get().c;
  if (testiCount === 0) {
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO testimonials (name, source, quote, photo, sort_order, published) VALUES (?,?,?,?,?,1)`
    );
    stmt.run('Jamaah Wujud Tour', 'Umroh 2026', 'Pelayanan sangat ramah, jadwal tepat waktu, dan pendampingan selama ibadah sangat membantu.', '', 1);
  }

  const heroCount = db.prepare('SELECT COUNT(*) c FROM hero_slides').get().c;
  if (heroCount === 0) {
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO hero_slides (title, subtitle, image, cta_label, cta_link, sort_order, published) VALUES (?,?,?,?,?,?,1)`
    );
    stmt.run(
      'Perjalanan Ibadah yang Penuh Makna',
      'Wujud Tour & Travel mendampingi setiap langkah ibadah Umroh dan Haji Anda dengan pelayanan sepenuh hati.',
      '',
      'Hubungi Kami',
      '#contact',
      1
    );
  }
}

export default getDb;
