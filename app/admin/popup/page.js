'use client';

import { useEffect, useState } from 'react';

export default function PopupAdminPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => setSettings(d.settings || {}))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setMessage(res.ok ? 'Pengaturan popup tersimpan.' : 'Gagal menyimpan.');
    setSaving(false);
  }

  async function handleImageUpload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) setSettings((s) => ({ ...s, popup_image: data.url }));
      else alert(data.error || 'Upload gagal');
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <p className="text-sm text-ink/50">Memuat...</p>;

  const active = !!Number(settings.popup_active || 0);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-1">Popup Promosi Beranda</h1>
      <p className="text-sm text-ink/50 mb-6">
        Popup ini muncul di tengah layar hanya di halaman Beranda. Pengunjung yang sudah menutupnya
        tidak akan melihatnya lagi selama sesi kunjungan yang sama.
      </p>

      <form onSubmit={handleSave} className="space-y-6 max-w-xl">
        {message && <div className="text-sm text-emerald bg-emerald-tint px-4 py-2.5">{message}</div>}

        <div className="bg-white border border-line p-6 space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setSettings((s) => ({ ...s, popup_active: e.target.checked ? 1 : 0 }))}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-ink/70">Aktifkan Popup</span>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink/70">Judul</span>
            <input
              type="text"
              value={settings.popup_title ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, popup_title: e.target.value }))}
              className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink/70">Isi Pesan</span>
            <textarea
              rows={3}
              value={settings.popup_message ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, popup_message: e.target.value }))}
              className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink/70">Gambar (opsional)</span>
            <div className="mt-1.5 flex items-center gap-4">
              {settings.popup_image ? (
                <img src={settings.popup_image} alt="Popup" className="h-20 w-32 object-cover border border-line" />
              ) : (
                <div className="h-20 w-32 border border-dashed border-line flex items-center justify-center text-[10px] text-ink/30">
                  Belum ada
                </div>
              )}
              <div>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="text-xs" />
                {uploading && <p className="text-xs text-emerald mt-1">Mengunggah...</p>}
                {settings.popup_image && (
                  <button type="button" onClick={() => setSettings((s) => ({ ...s, popup_image: '' }))} className="text-xs text-ink/40 underline mt-1">
                    Hapus gambar
                  </button>
                )}
              </div>
            </div>
          </label>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-ink/70">Teks Tombol (opsional)</span>
              <input
                type="text"
                placeholder="mis. Lihat Promo"
                value={settings.popup_cta_label ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, popup_cta_label: e.target.value }))}
                className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/70">Link Tombol</span>
              <input
                type="text"
                placeholder="mis. /paket atau https://wa.me/..."
                value={settings.popup_cta_link ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, popup_cta_link: e.target.value }))}
                className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-ink/70">Tayang Mulai (opsional)</span>
              <input
                type="date"
                value={settings.popup_start_date ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, popup_start_date: e.target.value }))}
                className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink/70">Tayang Sampai (opsional)</span>
              <input
                type="date"
                value={settings.popup_end_date ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, popup_end_date: e.target.value }))}
                className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none bg-white"
              />
              <p className="text-xs text-ink/40 mt-1">Kosongkan kedua tanggal jika ingin tayang terus selama Aktif dicentang.</p>
            </label>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-60">
          {saving ? 'Menyimpan...' : 'Simpan Popup'}
        </button>
      </form>
    </div>
  );
}
