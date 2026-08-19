'use client';

import { useEffect, useState } from 'react';

const FIELD_GROUPS = [
  {
    title: 'Identitas Situs',
    fields: [
      { key: 'site_name', label: 'Nama Situs' },
      { key: 'tagline', label: 'Tagline' },
      { key: 'about_short', label: 'Deskripsi Singkat (footer)', textarea: true },
      { key: 'logo', label: 'URL Logo (opsional)' },
    ],
  },
  {
    title: 'Kontak',
    fields: [
      { key: 'whatsapp_number', label: 'Nomor WhatsApp', hint: 'Format: 62xxxxxxxxxx (tanpa tanda + atau spasi)' },
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

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

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
      setMessage('Pengaturan tersimpan.');
    } else {
      setMessage('Gagal menyimpan pengaturan.');
    }
    setSaving(false);
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
