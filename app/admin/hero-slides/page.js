'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'title', label: 'Judul Utama (Headline)', type: 'text', required: true },
  { name: 'subtitle', label: 'Subjudul', type: 'textarea', rows: 2 },
  { name: 'image', label: 'Gambar Latar', type: 'image' },
  { name: 'cta_label', label: 'Teks Tombol', type: 'text' },
  { name: 'cta_link', label: 'Link Tombol', type: 'text' },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'published', label: 'Tampilkan di Beranda', type: 'checkbox' },
];

export default function HeroSlidesAdminPage() {
  return (
    <ModelManager
      model="hero_slides"
      title="Hero Beranda"
      fields={fields}
      columns={['title', 'published']}
      helpText="Kelola tampilan utama (hero) di halaman Beranda. Slide pertama yang aktif akan ditampilkan."
    />
  );
}
