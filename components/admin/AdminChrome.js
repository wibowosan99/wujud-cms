'use client';

import Link from 'next/link';
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
    items: [{ href: '/admin/partner-leads', label: 'Pendaftar White Label' }],
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

  if (pathname === '/admin/login') return <>{children}</>;

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-[#F5F3ED]">
      <aside className="w-64 shrink-0 bg-emerald-deep text-sand/90 flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-display text-xl text-white">Wujud Tour</span>
          <p className="eyebrow text-gold-light mt-1 text-[0.65rem]">Admin Panel</p>
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
        <header className="h-16 bg-white border-b border-line flex items-center justify-between px-8">
          <span className="text-sm text-ink/50">Selamat datang, <strong className="text-ink">{user?.name || user?.username}</strong></span>
          <button onClick={handleLogout} className="text-sm font-medium text-ink/60 hover:text-red-600">
            Keluar
          </button>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
