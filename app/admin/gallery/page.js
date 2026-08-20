'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'title', label: 'Judul / Keterangan', type: 'text' },
  { name: 'image', label: 'Foto', type: 'image', required: true },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'published', label: 'Tampilkan di Situs', type: 'checkbox' },
];

export default function GalleryAdminPage() {
  return (
    <ModelManager
      model="gallery_images"
      title="Galeri"
      fields={fields}
      columns={['title', 'published']}
      helpText="Unggah foto momen jamaah yang tampil di halaman Galeri."
    />
  );
}
