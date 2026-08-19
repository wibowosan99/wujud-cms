'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'title', label: 'Judul Artikel', type: 'text', required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text', hint: 'Kosongkan agar dibuat otomatis dari judul.' },
  { name: 'category', label: 'Kategori', type: 'text', hint: "Contoh: 'Tips Umroh', 'Panduan', 'Berita'" },
  { name: 'excerpt', label: 'Ringkasan Singkat', type: 'textarea', rows: 2 },
  { name: 'content', label: 'Isi Artikel', type: 'textarea', rows: 10 },
  { name: 'image', label: 'Gambar Sampul', type: 'image' },
  { name: 'published', label: 'Publikasikan', type: 'checkbox' },
];

export default function ArticlesAdminPage() {
  return (
    <ModelManager
      model="articles"
      title="Artikel"
      fields={fields}
      columns={['title', 'category', 'published_at', 'published']}
      helpText="Tulis tips, panduan, dan berita seputar Umroh dan Haji."
    />
  );
}
