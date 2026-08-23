'use client';

import ModelManager from '@/components/admin/ModelManager';

const fields = [
  { name: 'name', label: 'Nama', type: 'text', required: true },
  { name: 'whatsapp', label: 'No. WhatsApp', type: 'text', required: true },
  { name: 'brand_name', label: 'Nama Travel/Brand Diinginkan', type: 'text' },
  { name: 'city', label: 'Kota', type: 'text' },
  { name: 'message', label: 'Pesan Tambahan', type: 'textarea', rows: 3 },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: ['baru', 'dihubungi', 'aktif', 'ditolak'],
  },
];

export default function PartnerLeadsAdminPage() {
  return (
    <ModelManager
      model="partner_leads"
      title="Pendaftar White Label"
      fields={fields}
      columns={['name', 'whatsapp', 'brand_name', 'status']}
      helpText="Daftar calon mitra yang mengajukan pendaftaran program Umroh White Label lewat website. Update status setelah dihubungi."
    />
  );
}
