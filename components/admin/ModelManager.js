'use client';

import { useEffect, useState, useCallback } from 'react';

function emptyFromFields(fields) {
  const obj = {};
  for (const f of fields) obj[f.name] = f.type === 'checkbox' ? 0 : f.type === 'number' ? 0 : '';
  return obj;
}

export default function ModelManager({ model, title, fields, columns, helpText }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploadingField, setUploadingField] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/${model}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, [model]);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    setForm(emptyFromFields(fields));
    setEditing({});
    setError('');
  }

  function openEdit(item) {
    setForm({ ...item });
    setEditing(item);
    setError('');
  }

  function closeForm() {
    setEditing(null);
    setForm({});
    setError('');
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const isNew = !editing?.id;
    const url = isNew ? `/api/admin/${model}` : `/api/admin/${model}/${editing.id}`;
    const method = isNew ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan');
        setSaving(false);
        return;
      }
      await load();
      closeForm();
    } catch {
      setError('Terjadi kesalahan jaringan');
    }
    setSaving(false);
  }

  async function handleDelete(item) {
    if (!confirm(`Hapus "${item.title || item.name || 'data ini'}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    await fetch(`/api/admin/${model}/${item.id}`, { method: 'DELETE' });
    await load();
  }

  async function handleImageUpload(fieldName, file) {
    if (!file) return;
    setUploadingField(fieldName);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setForm((f) => ({ ...f, [fieldName]: data.url }));
      } else {
        alert(data.error || 'Upload gagal');
      }
    } finally {
      setUploadingField('');
    }
  }

  const displayCols = columns || fields.slice(0, 3).map((f) => f.name);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink">{title}</h1>
          {helpText && <p className="text-sm text-ink/50 mt-1">{helpText}</p>}
        </div>
        {!editing && (
          <button onClick={openNew} className="btn btn-primary">
            + Tambah {title}
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="bg-white border border-line p-6 mb-8">
          <h2 className="font-display text-lg mb-5">{editing.id ? 'Ubah Data' : 'Tambah Data Baru'}</h2>
          {error && <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-2.5">{error}</div>}

          <div className="grid sm:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.name} className={f.type === 'textarea' || f.type === 'image' ? 'sm:col-span-2' : ''}>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">
                  {f.label} {f.required && <span className="text-red-500">*</span>}
                </label>

                {f.type === 'textarea' && (
                  <textarea
                    value={form[f.name] ?? ''}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    rows={f.rows || 4}
                    required={f.required}
                    className="w-full border border-line px-3 py-2 focus:border-emerald outline-none text-sm"
                  />
                )}

                {f.type === 'select' && (
                  <select
                    value={form[f.name] ?? ''}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    required={f.required}
                    className="w-full border border-line px-3 py-2 focus:border-emerald outline-none text-sm bg-white"
                  >
                    <option value="">Pilih...</option>
                    {f.options.map((o) => {
                      const value = typeof o === 'string' ? o : o.value;
                      const label = typeof o === 'string' ? o : o.label;
                      return (
                        <option key={value} value={value}>{label}</option>
                      );
                    })}
                  </select>
                )}

                {f.type === 'checkbox' && (
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={!!form[f.name]}
                      onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.checked ? 1 : 0 }))}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-ink/60">Aktif</span>
                  </label>
                )}

                {f.type === 'number' && (
                  <input
                    type="number"
                    value={form[f.name] ?? 0}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: Number(e.target.value) }))}
                    className="w-full border border-line px-3 py-2 focus:border-emerald outline-none text-sm"
                  />
                )}

                {f.type === 'image' && (
                  <div className="flex items-center gap-4">
                    {form[f.name] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form[f.name]} alt="" className="h-20 w-28 object-cover border border-line" />
                    ) : (
                      <div className="h-20 w-28 border border-dashed border-line flex items-center justify-center text-xs text-ink/30">
                        Tidak ada
                      </div>
                    )}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(f.name, e.target.files?.[0])}
                        className="text-xs"
                      />
                      {uploadingField === f.name && <p className="text-xs text-emerald mt-1">Mengunggah...</p>}
                    </div>
                  </div>
                )}

                {f.type === 'date' && (
                  <input
                    type="date"
                    value={form[f.name] ?? ''}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    required={f.required}
                    className="w-full border border-line px-3 py-2 focus:border-emerald outline-none text-sm bg-white"
                  />
                )}

                {(f.type === 'text' || !f.type) && (
                  <input
                    type="text"
                    value={form[f.name] ?? ''}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    required={f.required}
                    className="w-full border border-line px-3 py-2 focus:border-emerald outline-none text-sm"
                  />
                )}

                {f.hint && <p className="text-xs text-ink/40 mt-1">{f.hint}</p>}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-7">
            <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-60">
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" onClick={closeForm} className="btn btn-outline text-ink border-line">
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-line overflow-x-auto">
        {loading ? (
          <p className="p-6 text-sm text-ink/50">Memuat data...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-ink/50">Belum ada data. Klik &quot;+ Tambah {title}&quot; untuk mulai mengisi.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-emerald-tint text-left">
                {displayCols.map((c) => (
                  <th key={c} className="px-4 py-3 font-medium text-ink/60 capitalize">{c.replace(/_/g, ' ')}</th>
                ))}
                <th className="px-4 py-3 w-32"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-line hover:bg-sand/50">
                  {displayCols.map((c) => (
                    <td key={c} className="px-4 py-3 text-ink/75 max-w-xs truncate">
                      {typeof item[c] === 'number' && (c === 'published' || c === 'featured')
                        ? (item[c] ? 'Ya' : 'Tidak')
                        : String(item[c] ?? '')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(item)} className="text-emerald hover:underline mr-4 text-xs font-medium">
                      Ubah
                    </button>
                    <button onClick={() => handleDelete(item)} className="text-red-600 hover:underline text-xs font-medium">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
