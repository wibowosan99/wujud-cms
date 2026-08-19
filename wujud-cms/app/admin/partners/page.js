'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'name', label: 'Nama Mitra', type: 'text', required: true },
  { name: 'logo', label: 'Logo', type: 'image' },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'published', label: 'Tampilkan di Situs', type: 'checkbox' },
];

export default function PartnersAdminPage() {
  return (
    <ModelManager
      model="partners"
      title="Mitra"
      fields={fields}
      columns={['name', 'published']}
      helpText="Kelola logo mitra dan kolaborator yang tampil di Beranda."
    />
  );
}
