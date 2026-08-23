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

function formatRupiah(n) {
  return 'Rp' + Number(n || 0).toLocaleString('id-ID');
}

function CommissionSummary(items) {
  const total = items.reduce((sum, it) => sum + Number(it.amount || 0), 0);
  const paid = items
    .filter((it) => it.payout_status === 'sudah_dicairkan')
    .reduce((sum, it) => sum + Number(it.amount || 0), 0);
  const unpaid = total - paid;

  const cards = [
    { label: 'Total Komisi', value: total, color: 'text-emerald-deep' },
    { label: 'Sudah Dicairkan', value: paid, color: 'text-emerald' },
    { label: 'Belum Dicairkan', value: unpaid, color: 'text-gold' },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.label} className="bg-white border border-line p-5">
          <p className="text-xs text-ink/45 eyebrow">{c.label}</p>
          <p className={`font-display text-2xl mt-1.5 ${c.color}`}>{formatRupiah(c.value)}</p>
          <p className="text-xs text-ink/40 mt-1">{items.length} transaksi tercatat</p>
        </div>
      ))}
    </div>
  );
}

export default function AffiliateCommissionsAdminPage() {
  return (
    <ModelManager
      model="affiliate_commissions"
      title="Komisi Affiliate"
      fields={fields}
      columns={['affiliate_name', 'jamaah_name', 'amount', 'payout_status']}
      helpText="Catat setiap jamaah yang berhasil closing lewat affiliate tertentu (input manual berdasarkan info dari admin/WhatsApp)."
      renderSummary={CommissionSummary}
    />
  );
}
