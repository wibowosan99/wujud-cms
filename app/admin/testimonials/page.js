'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'name', label: 'Nama Jamaah', type: 'text', required: true },
  { name: 'source', label: 'Sumber / Program', type: 'text', hint: "Contoh: 'Umroh Reguler 2026'" },
  { name: 'quote', label: 'Kutipan Testimoni', type: 'textarea', rows: 3, required: true },
  { name: 'photo', label: 'Foto (opsional)', type: 'image' },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'published', label: 'Tampilkan di Situs', type: 'checkbox' },
];

export default function TestimonialsAdminPage() {
  return (
    <ModelManager
      model="testimonials"
      title="Testimoni"
      fields={fields}
      columns={['name', 'source', 'published']}
      helpText="Kelola testimoni jamaah yang tampil di halaman Beranda."
    />
  );
}
