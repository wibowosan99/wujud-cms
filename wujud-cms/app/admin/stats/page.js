'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'label', label: 'Label', type: 'text', required: true, hint: "Contoh: 'Jamaah Keberangkatan'" },
  { name: 'value', label: 'Nilai', type: 'text', required: true, hint: "Contoh: '5K+' atau '10+'" },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
];

export default function StatsAdminPage() {
  return (
    <ModelManager
      model="stats"
      title="Statistik"
      fields={fields}
      columns={['label', 'value']}
      helpText="Angka pencapaian yang tampil di Beranda dan halaman Penghargaan."
    />
  );
}
