'use client';

import { useState } from 'react';

export default function AffiliateRegisterForm() {
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '', umroh_year: '', message: '' });
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/affiliates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('done');
        setForm({ name: '', whatsapp: '', email: '', umroh_year: '', message: '' });
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
          Tim kami akan memverifikasi data keberangkatan Anda dan menghubungi Anda via WhatsApp
          dalam 1x24 jam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line p-6 sm:p-8 space-y-4">
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
            placeholder="08xxxxxxxxxx"
            value={form.whatsapp}
            onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
            className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-ink/70">Alamat Email (opsional)</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-ink/70">Kapan & Paket Apa Umroh Anda Bersama Kami? *</span>
        <input
          type="text"
          required
          placeholder="Contoh: Umroh Agustus 2024, paket Umroh Reguler"
          value={form.umroh_year}
          onChange={(e) => setForm((f) => ({ ...f, umroh_year: e.target.value }))}
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
        />
        <p className="text-xs text-ink/40 mt-1">Digunakan tim kami untuk verifikasi data keberangkatan Anda.</p>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink/70">Pesan Personal untuk Halaman Anda (opsional)</span>
        <textarea
          rows={3}
          placeholder="Contoh: Assalamualaikum, saya alumni Umroh 2024 bersama Wujud Tour..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1.5 w-full border border-line px-3 py-2.5 text-sm focus:border-emerald outline-none"
        />
      </label>
      {status === 'error' && <p className="text-sm text-red-600">Gagal mengirim, silakan coba lagi.</p>}
      <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {status === 'sending' ? 'Mengirim...' : 'Daftar Sebagai Affiliate'}
      </button>
    </form>
  );
}
