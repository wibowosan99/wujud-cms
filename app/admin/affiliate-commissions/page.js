'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'affiliate_name', label: 'Nama Affiliate', type: 'text', required: true },
  { name: 'jamaah_name', label: 'Nama Jamaah yang Closing', type: 'text' },
  { name: 'package_name', label: 'Paket yang Dibeli', type: 'text' },
  { name: 'amount', label: 'Nominal Komisi (Rp)', type: 'number' },
  { name: 'closed_at', label: 'Tanggal Closing', type: 'date' },
  {
    name: 'payout_status',
    label: 'Status Pencairan',
    type: 'select',
    options: ['belum_dicairkan', 'sudah_dicairkan'],
  },
  { name: 'payout_date', label: 'Tanggal Dicairkan (jika sudah)', type: 'date' },
  { name: 'notes', label: 'Catatan Tambahan', type: 'textarea', rows: 2 },
];

export default function AffiliateCommissionsAdminPage() {
  return (
    <ModelManager
      model="affiliate_commissions"
      title="Komisi Affiliate"
      fields={fields}
      columns={['affiliate_name', 'jamaah_name', 'amount', 'payout_status']}
      helpText="Catat setiap jamaah yang berhasil closing lewat affiliate tertentu (input manual berdasarkan info dari admin/WhatsApp). Gunakan daftar ini untuk memantau total closing per affiliate dan status pencairan komisinya."
    />
  );
}
