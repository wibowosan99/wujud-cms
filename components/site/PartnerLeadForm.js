'use client';

import { useState } from 'react';

const JAMAAH_OPTIONS = [
  { value: '', label: 'Pilih estimasi' },
  { value: '1-5', label: '1 - 5 orang' },
  { value: '6-15', label: '6 - 15 orang' },
  { value: '16-30', label: '16 - 30 orang' },
  { value: '31+', label: '31 orang ke atas' },
];

const PARTNER_TYPES = [
  {
    value: 'individu',
    title: 'Individu / Pemula',
    desc: 'Punya jaringan jamaah, belum punya travel sendiri',
  },
  {
    value: 'travel_agency',
    title: 'Travel Agency',
    desc: 'Sudah punya travel, butuh mitra operasional yang lebih kuat',
  },
];

function buildWaLink(number, form) {
  const clean = (number || '').replace(/[^0-9]/g, '');
  const typeLabel = PARTNER_TYPES.find((t) => t.value === form.partner_type)?.title || '-';
  const text = [
    `Halo, saya ingin mendaftar sebagai mitra Umroh White Label Wujud Tour.`,
    ``,
    `Nama: ${form.name}`,
    `Kota/Wilayah: ${form.city || '-'}`,
    `Nama Travel/Brand: ${form.brand_name || '-'}`,
    `Estimasi Jamaah: ${form.jamaah_estimate || '-'}`,
    `Tipe Mitra: ${typeLabel}`,
    form.message ? `Pesan: ${form.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export default function PartnerLeadForm({ whatsappNumber }) {
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    brand_name: '',
    city: '',
    jamaah_estimate: '',
    partner_type: 'travel_agency',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/partner-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('done');
        if (whatsappNumber) {
          window.open(buildWaLink(whatsappNumber, form), '_blank');
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="bg-emerald-tint border border-emerald/20 p-8 text-center">
        <p className="font-display text-xl text-emerald-deep">Pendaftaran Terkirim!</p>
        <p className="mt-2 text-sm text-ink/70">
          WhatsApp seharusnya sudah terbuka di tab baru dengan pesan siap kirim. Kalau belum
          terbuka, tim kami tetap akan menghubungi Anda dalam 1x24 jam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Nama Lengkap *</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">No. WhatsApp *</span>
          <input
            type="text"
            required
            placeholder="08xx-xxxx-xxxx"
            value={form.whatsapp}
            onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
            className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Kota / Wilayah *</span>
          <input
            type="text"
            required
            placeholder="Contoh: Bandung, Jawa Barat"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Nama Travel/Brand yang Diinginkan</span>
          <input
            type="text"
            value={form.brand_name}
            onChange={(e) => setForm((f) => ({ ...f, brand_name: e.target.value }))}
            className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink/70">Estimasi Jumlah Jamaah yang Ingin Dibawa *</span>
        <select
          required
          value={form.jamaah_estimate}
          onChange={(e) => setForm((f) => ({ ...f, jamaah_estimate: e.target.value }))}
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none bg-white"
        >
          {JAMAAH_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      <div>
        <span className="text-sm font-medium text-ink/70">Tipe Mitra *</span>
        <div className="mt-2 space-y-3">
          {PARTNER_TYPES.map((t) => (
            <label
              key={t.value}
              className={`flex items-start gap-3 border p-4 cursor-pointer transition-colors ${
                form.partner_type === t.value ? 'border-emerald bg-emerald-tint' : 'border-line'
              }`}
            >
              <input
                type="radio"
                name="partner_type"
                value={t.value}
                checked={form.partner_type === t.value}
                onChange={(e) => setForm((f) => ({ ...f, partner_type: e.target.value }))}
                className="mt-1"
              />
              <span>
                <span className="block font-medium text-ink">{t.title}</span>
                <span className="block text-sm text-ink/60">{t.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink/70">Pesan Tambahan (opsional)</span>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
        />
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-600">Gagal mengirim, silakan coba lagi.</p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full justify-center disabled:opacity-60">
        {status === 'sending' ? 'Mengirim...' : 'Daftar & Konsultasi via WhatsApp'}
      </button>
    </form>
  );
}
