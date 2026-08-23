'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const NAV_GROUPS = [
  {
    label: 'Ringkasan',
    items: [{ href: '/admin', label: 'Dashboard' }],
  },
  {
    label: 'Konten Utama',
    items: [
      { href: '/admin/hero-slides', label: 'Hero / Beranda' },
      { href: '/admin/packages', label: 'Paket Umroh & Haji' },
      { href: '/admin/articles', label: 'Artikel' },
      { href: '/admin/gallery', label: 'Galeri' },
    ],
  },
  {
    label: 'Halaman Perusahaan',
    items: [
      { href: '/admin/pages', label: 'Halaman Statis' },
      { href: '/admin/team', label: 'Tim' },
      { href: '/admin/testimonials', label: 'Testimoni' },
      { href: '/admin/partners', label: 'Mitra' },
      { href: '/admin/stats', label: 'Statistik' },
    ],
  },
  {
    label: 'Kemitraan',
    items: [
      { href: '/admin/partner-leads', label: 'Pendaftar White Label' },
      { href: '/admin/affiliates', label: 'Affiliate Alumni' },
      { href: '/admin/affiliate-commissions', label: 'Komisi Affiliate' },
    ],
  },
  {
    label: 'Pengaturan',
    items: [
      { href: '/admin/settings', label: 'Pengaturan Situs' },
      { href: '/admin/profile', label: 'Akun Saya' },
    ],
  },
];

export default function AdminChrome({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') return <>{children}</>;

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-[#F5F3ED]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`w-64 shrink-0 bg-emerald-deep text-sand/90 flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="font-display text-xl text-white">Wujud Tour</span>
            <p className="eyebrow text-gold-light mt-1 text-[0.65rem]">Admin Panel</p>
          </div>
          <button
            aria-label="Tutup menu"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-sand/60 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-6 eyebrow text-sand/35 text-[0.65rem] mb-2">{group.label}</p>
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-6 py-2 text-sm transition-colors border-l-2 ${
                      active
                        ? 'border-gold bg-white/5 text-white font-medium'
                        : 'border-transparent text-sand/65 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-white/10">
          <Link href="/" target="_blank" className="text-xs text-sand/50 hover:text-gold-light link-underline">
            Lihat Situs Publik &rarr;
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-line flex items-center justify-between px-4 sm:px-8 gap-3">
          <button
            aria-label="Buka menu"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-ink/70 hover:text-emerald p-1 -ml-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className="text-sm text-ink/50 truncate">
            Selamat datang, <strong className="text-ink">{user?.name || user?.username}</strong>
          </span>
          <button onClick={handleLogout} className="text-sm font-medium text-ink/60 hover:text-red-600 shrink-0">
            Keluar
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
