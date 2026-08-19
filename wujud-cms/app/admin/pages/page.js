'use client';

import { useEffect, useState } from 'react';

const LABELS = {
  'about-us': 'Tentang Kami',
  'core-values': 'Nilai-Nilai Kami',
  'our-awards': 'Penghargaan Kami',
  'layanan-kami': 'Layanan Kami',
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlug, setActiveSlug] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/pages')
      .then((r) => r.json())
      .then((d) => setPages(d.items || []))
      .finally(() => setLoading(false));
  }, []);

  function openPage(page) {
    setActiveSlug(page.slug);
    setForm({ title: page.title || '', content: page.content || '' });
    setMessage('');
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const res = await fetch(`/api/admin/pages/${activeSlug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setPages((prev) => prev.map((p) => (p.slug === activeSlug ? data.item : p)));
      setMessage('Tersimpan.');
    } else {
      setMessage('Gagal menyimpan.');
    }
    setSaving(false);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-1">Halaman Statis</h1>
      <p className="text-sm text-ink/50 mb-6">
        Kelola isi teks untuk halaman Tentang Kami, Nilai-Nilai, Penghargaan, dan Layanan Kami.
      </p>

      {loading ? (
        <p className="text-sm text-ink/50">Memuat...</p>
      ) : (
        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <div className="bg-white border border-line">
            {pages.map((p) => (
              <button
                key={p.slug}
                onClick={() => openPage(p)}
                className={`w-full text-left px-4 py-3 text-sm border-b border-line last:border-b-0 ${
                  activeSlug === p.slug ? 'bg-emerald-tint text-emerald font-medium' : 'text-ink/70 hover:bg-sand/60'
                }`}
              >
                {LABELS[p.slug] || p.slug}
              </button>
            ))}
          </div>

          <div className="bg-white border border-line p-6">
            {!activeSlug ? (
              <p className="text-sm text-ink/50">Pilih halaman di sebelah kiri untuk mulai mengedit.</p>
            ) : (
              <form onSubmit={handleSave}>
                {message && (
                  <div className="mb-4 text-sm text-emerald bg-emerald-tint px-4 py-2.5">{message}</div>
                )}
                <label className="block mb-4">
                  <span className="text-sm font-medium text-ink/70">Judul Halaman</span>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                    className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
                  />
                </label>
                <label className="block mb-5">
                  <span className="text-sm font-medium text-ink/70">Isi Konten</span>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm((s) => ({ ...s, content: e.target.value }))}
                    rows={14}
                    className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none font-mono"
                  />
                  <p className="text-xs text-ink/40 mt-1">
                    Gunakan baris kosong ganda untuk memisahkan paragraf. Untuk halaman Nilai-Nilai, pisahkan tiap poin
                    dengan format &quot;Judul &mdash; Deskripsi&quot;.
                  </p>
                </label>
                <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-60">
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
