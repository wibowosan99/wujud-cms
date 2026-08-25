'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'name', label: 'Nama Kantor (mis. "Kantor Pusat", "Cabang Bandung")', type: 'text', required: true },
  { name: 'is_headquarters', label: 'Ini Kantor Pusat', type: 'checkbox' },
  { name: 'address', label: 'Alamat Lengkap', type: 'textarea', rows: 3 },
  { name: 'phone', label: 'Nomor Telepon (opsional)', type: 'text' },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'published', label: 'Tampilkan di Situs', type: 'checkbox' },
];

export default function BranchesAdminPage() {
  return (
    <ModelManager
      model="branches"
      title="Kantor Pusat & Cabang"
      fields={fields}
      columns={['name', 'is_headquarters', 'address']}
      helpText="Kelola daftar kantor pusat dan cabang yang tampil di halaman Kontak dan footer situs."
    />
  );
}
