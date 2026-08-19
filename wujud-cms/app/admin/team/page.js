'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'name', label: 'Nama', type: 'text', required: true },
  { name: 'position', label: 'Jabatan', type: 'text' },
  { name: 'photo', label: 'Foto', type: 'image' },
  { name: 'bio', label: 'Bio Singkat', type: 'textarea', rows: 3 },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'published', label: 'Tampilkan di Situs', type: 'checkbox' },
];

export default function TeamAdminPage() {
  return (
    <ModelManager
      model="team_members"
      title="Tim"
      fields={fields}
      columns={['name', 'position', 'published']}
      helpText="Kelola profil pimpinan dan tim yang tampil di halaman Tentang Kami dan Beranda."
    />
  );
}
