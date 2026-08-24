'use client';

import { useEffect, useState } from 'react';

const FIELD_GROUPS = [
  {
    title: 'Identitas Situs',
    fields: [
      { key: 'site_name', label: 'Nama Situs' },
      { key: 'tagline', label: 'Tagline' },
      { key: 'about_short', label: 'Deskripsi Singkat (footer)', textarea: true },
    ],
  },
  {
    title: 'Kontak',
    fields: [
      { key: 'whatsapp_number', label: 'Nomor WhatsApp Utama', hint: 'Format: 62xxxxxxxxxx (tanpa tanda + atau spasi)' },
      {
        key: 'whatsapp_number_2',
        label: 'Nomor WhatsApp Kedua (opsional)',
        hint: 'Kosongkan jika hanya pakai 1 nomor. Jika diisi, sistem otomatis membagi rata klik "Hubungi Kami" secara acak ke salah satu dari 2 nomor ini (untuk bagi beban CS).',
      },
      { key: 'whatsapp_message', label: 'Pesan Default WhatsApp', textarea: true },
      { key: 'phone', label: 'Nomor Telepon' },
      { key: 'email', label: 'Email' },
      { key: 'address', label: 'Alamat' },
    ],
  },
  {
    title: 'Media Sosial',
    fields: [
      { key: 'instagram', label: 'Instagram (URL)' },
      { key: 'facebook', label: 'Facebook (URL)' },
      { key: 'youtube', label: 'YouTube (URL)' },
    ],
  },
];

const THEME_COLORS = [
  { key: 'theme_emerald', label: 'Warna Utama (Emerald)', fallback: '#0e4b3a' },
  { key: 'theme_emerald_deep', label: 'Warna Utama - Gelap (hover/aksen)', fallback: '#0a3629' },
  { key: 'theme_gold', label: 'Warna Aksen (Gold)', fallback: '#b9902f' },
  { key: 'theme_sand', label: 'Warna Background', fallback: '#f8f4ea' },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);

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
    if (res.ok) {
      setMessage('Pengaturan tersimpan. Muat ulang halaman publik untuk melihat perubahan warna/logo.');
    } else {
      setMessage('Gagal menyimpan pengaturan.');
    }
    setSaving(false);
  }

  async function handleLogoUpload(file) {
    if (!file) return;
    setUploadingLogo(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setSettings((s) => ({ ...s, logo: data.url }));
      } else {
        alert(data.error || 'Upload gagal');
      }
    } finally {
      setUploadingLogo(false);
    }
  }

  if (loading) return <p className="text-sm text-ink/50">Memuat...</p>;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-1">Pengaturan Situs</h1>
      <p className="text-sm text-ink/50 mb-6">
        Perubahan di sini berlaku untuk seluruh halaman publik (header, footer, tombol WhatsApp, dll).
      </p>

      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        {message && <div className="text-sm text-emerald bg-emerald-tint px-4 py-2.5">{message}</div>}

        {/* Tema & Branding */}
        <div className="bg-white border border-line p-6">
          <h2 className="font-display text-lg mb-1">Tema & Branding</h2>
          <p className="text-xs text-ink/40 mb-4">Ganti logo dan warna tampilan situs publik.</p>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-ink/70">Logo Situs</span>
              <div className="mt-1.5 flex items-center gap-4">
                {settings.logo ? (
                  <img
                    src={settings.logo}
                    alt="Logo saat ini"
                    className="h-14 w-14 object-contain border border-line bg-sand"
                  />
                ) : (
                  <div className="h-14 w-14 border border-dashed border-line flex items-center justify-center text-[10px] text-ink/30">
                    Belum ada
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                    className="text-xs"
                  />
                  {uploadingLogo && <p className="text-xs text-emerald mt-1">Mengunggah...</p>}
                  {settings.logo && (
                    <button
                      type="button"
                      onClick={() => setSettings((s) => ({ ...s, logo: '' }))}
                      className="text-xs text-ink/40 underline mt-1"
                    >
                      Hapus logo
                    </button>
                  )}
                </div>
              </div>
            </label>

            {THEME_COLORS.map((c) => (
              <label key={c.key} className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-ink/70">{c.label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings[c.key] || c.fallback}
                    onChange={(e) => setSettings((s) => ({ ...s, [c.key]: e.target.value }))}
                    className="h-9 w-14 border border-line cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings[c.key] || c.fallback}
                    onChange={(e) => setSettings((s) => ({ ...s, [c.key]: e.target.value }))}
                    className="w-24 border border-line px-2 py-1.5 text-xs font-mono focus:border-emerald outline-none"
                  />
                </div>
              </label>
            ))}

            <button
              type="button"
              onClick={() =>
                setSettings((s) => ({
                  ...s,
                  theme_emerald: '',
                  theme_emerald_deep: '',
                  theme_gold: '',
                  theme_sand: '',
                }))
              }
              className="text-xs text-ink/40 underline"
            >
              Kembalikan ke warna default
            </button>
          </div>
        </div>

        {FIELD_GROUPS.map((group) => (
          <div key={group.title} className="bg-white border border-line p-6">
            <h2 className="font-display text-lg mb-4">{group.title}</h2>
            <div className="space-y-4">
              {group.fields.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-sm font-medium text-ink/70">{f.label}</span>
                  {f.textarea ? (
                    <textarea
                      value={settings[f.key] ?? ''}
                      onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                      rows={3}
                      className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={settings[f.key] ?? ''}
                      onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                      className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
                    />
                  )}
                  {f.hint && <p className="text-xs text-ink/40 mt-1">{f.hint}</p>}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-60">
          {saving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
        </button>
      </form>
    </div>
  );
}
