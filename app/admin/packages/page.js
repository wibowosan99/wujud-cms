'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'title', label: 'Judul Paket', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', hint: 'Kosongkan agar dibuat otomatis dari judul.' },
  {
    name: 'category',
    label: 'Kategori',
    type: 'select',
    required: true,
    options: [
      { value: 'umroh', label: 'Umroh' },
      { value: 'haji', label: 'Haji' },
      { value: 'halal', label: 'Halal Holidays' },
    ],
  },
  { name: 'excerpt', label: 'Ringkasan Singkat', type: 'textarea', rows: 2 },
  { name: 'content', label: 'Deskripsi Lengkap', type: 'textarea', rows: 8 },
  { name: 'image', label: 'Gambar Utama', type: 'image' },
  { name: 'price', label: 'Harga', type: 'text', hint: "Contoh: 'Rp 32.500.000' atau 'Hubungi kami'" },
  { name: 'duration', label: 'Durasi', type: 'text', hint: "Contoh: '9 Hari 7 Malam'" },
  { name: 'departure_date', label: 'Tanggal Keberangkatan', type: 'text' },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'featured', label: 'Tampilkan sebagai Unggulan di Beranda', type: 'checkbox' },
  { name: 'published', label: 'Publikasikan', type: 'checkbox' },
];

export default function PackagesAdminPage() {
  return (
    <ModelManager
      model="packages"
      title="Paket Umroh & Haji"
      fields={fields}
      columns={['title', 'category', 'departure_date', 'published']}
      helpText="Kelola semua paket Umroh, Haji Khusus, dan Halal Holidays yang tampil di situs."
    />
  );
}
