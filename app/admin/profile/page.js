'use client';

import { useState } from 'react';

export default function AdminProfilePage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password baru tidak cocok.');
      return;
    }
    setSaving(true);
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Password berhasil diubah.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError(data.error || 'Gagal mengubah password.');
    }
    setSaving(false);
  }

  return (
    <div className="max-w-md">
      <h1 className="font-display text-2xl text-ink mb-1">Akun Saya</h1>
      <p className="text-sm text-ink/50 mb-6">Ubah password login admin panel Anda.</p>

      <form onSubmit={handleSubmit} className="bg-white border border-line p-6">
        {message && <div className="mb-4 text-sm text-emerald bg-emerald-tint px-4 py-2.5">{message}</div>}
        {error && <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-2.5">{error}</div>}

        <label className="block mb-4">
          <span className="text-sm font-medium text-ink/70">Password Saat Ini</span>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm font-medium text-ink/70">Password Baru</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
          />
        </label>
        <label className="block mb-6">
          <span className="text-sm font-medium text-ink/70">Konfirmasi Password Baru</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1.5 w-full border border-line px-3 py-2 text-sm focus:border-emerald outline-none"
          />
        </label>
        <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-60">
          {saving ? 'Menyimpan...' : 'Ubah Password'}
        </button>
      </form>
    </div>
  );
}
