'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'name', label: 'Nama', type: 'text', required: true },
  { name: 'whatsapp', label: 'No. WhatsApp', type: 'text', required: true },
  { name: 'email', label: 'Alamat Email', type: 'text' },
  { name: 'slug', label: 'Slug Halaman (URL)', type: 'text', hint: 'Halaman personal akan tampil di /a/[slug]' },
  { name: 'umroh_year', label: 'Bukti Alumni (mis. "Umroh Agustus 2024")', type: 'text' },
  { name: 'message', label: 'Pesan Personal di Halaman', type: 'textarea', rows: 3 },
  { name: 'photo', label: 'Foto', type: 'image' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: ['nonaktif', 'aktif'],
  },
  { name: 'start_date', label: 'Tanggal Mulai Berlaku (opsional)', type: 'date' },
  {
    name: 'end_date',
    label: 'Tanggal Berakhir (opsional)',
    type: 'date',
    hint: 'Setelah tanggal ini, halaman personal otomatis tidak bisa diakses walau status masih Aktif.',
  },
];

function buildWelcomeLink(affiliate) {
  const personalUrl = `https://wujudtour.com/a/${affiliate.slug}`;
  const text = [
    `Assalamualaikum ${affiliate.name.split(' ')[0]}! Selamat bergabung sebagai Affiliate Alumni Wujud Tour & Travel 🎉`,
    ``,
    `Halaman personal Anda sudah aktif di:`,
    personalUrl,
    ``,
    `Silakan bagikan halaman ini ke keluarga, teman, atau siapa saja yang berminat Umroh/Haji. Setiap jamaah yang closing lewat halaman Anda akan tercatat sebagai referral Anda.`,
    ``,
    `Terima kasih sudah bergabung, semoga menjadi ladang pahala untuk kita semua. 🤲`,
  ].join('\n');
  const clean = (affiliate.whatsapp || '').replace(/[^0-9]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export default function AffiliatesAdminPage() {
  return (
    <ModelManager
      model="affiliates"
      title="Affiliate Alumni"
      fields={fields}
      columns={['name', 'whatsapp', 'slug', 'status', 'end_date', 'visit_count']}
      helpText="Verifikasi manual bahwa pendaftar benar alumni jamaah Wujud Tour, lalu ubah status ke 'aktif' agar halaman personal mereka bisa diakses di /a/[slug]. Set 'nonaktif' kapan saja untuk langsung menutup akses."
      rowActions={(item) => [
        {
          href: `/admin/affiliate-commissions?affiliate_name=${encodeURIComponent(item.name)}`,
          label: 'Komisi',
        },
        {
          href: buildWelcomeLink(item),
          label: 'Kirim Welcome',
          external: true,
        },
      ]}
    />
  );
}
