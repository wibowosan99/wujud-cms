'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login gagal');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-deep px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display text-3xl text-white">Wujud Tour</span>
          <p className="eyebrow text-gold-light mt-2">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 border border-white/10">
          <h1 className="font-display text-xl mb-6 text-ink">Masuk ke Admin</h1>

          {error && (
            <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
              {error}
            </div>
          )}

          <label className="block mb-4">
            <span className="text-sm font-medium text-ink/70">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="mt-1.5 w-full border border-line px-3 py-2.5 focus:border-emerald outline-none"
            />
          </label>

          <label className="block mb-6">
            <span className="text-sm font-medium text-ink/70">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1.5 w-full border border-line px-3 py-2.5 focus:border-emerald outline-none"
            />
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center disabled:opacity-60">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
        <p className="text-center text-xs text-sand/40 mt-6">Default: admin / admin123 &mdash; segera ganti password setelah login.</p>
      </div>
    </div>
  );
}
