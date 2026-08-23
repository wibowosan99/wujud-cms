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
    label: 'Status Verifikasi',
    type: 'select',
    options: ['pending', 'approved', 'rejected'],
  },
  { name: 'active', label: 'Aktifkan Halaman Personal', type: 'checkbox' },
  {
    name: 'valid_until',
    label: 'Masa Berlaku Sampai (opsional)',
    type: 'text',
    hint: 'Format YYYY-MM-DD, mis. 2026-12-31. Kosongkan jika tidak ada batas waktu.',
  },
];

export default function AffiliatesAdminPage() {
  return (
    <ModelManager
      model="affiliates"
      title="Affiliate Alumni"
      fields={fields}
      columns={['name', 'whatsapp', 'slug', 'status', 'active', 'valid_until']}
      helpText="Verifikasi manual bahwa pendaftar benar alumni jamaah Wujud Tour, lalu ubah status ke 'approved' agar halaman personal mereka aktif di /a/[slug]."
    />
  );
}
