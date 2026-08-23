'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'name', label: 'Nama', type: 'text', required: true },
  { name: 'whatsapp', label: 'No. WhatsApp', type: 'text', required: true },
  { name: 'slug', label: 'Slug Halaman (URL)', type: 'text', hint: 'Halaman personal akan tampil di /a/[slug]' },
  { name: 'umroh_year', label: 'Bukti Alumni (mis. "Umroh Agustus 2024")', type: 'text' },
  { name: 'message', label: 'Pesan Personal di Halaman', type: 'textarea', rows: 3 },
  { name: 'photo', label: 'Foto', type: 'image' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: ['pending', 'approved', 'rejected'],
  },
];

export default function AffiliatesAdminPage() {
  return (
    <ModelManager
      model="affiliates"
      title="Affiliate Alumni"
      fields={fields}
      columns={['name', 'whatsapp', 'slug', 'status']}
      helpText="Verifikasi manual bahwa pendaftar benar alumni jamaah Wujud Tour, lalu ubah status ke 'approved' agar halaman personal mereka aktif di /a/[slug]."
    />
  );
}
