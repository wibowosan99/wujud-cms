'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  {
    label: 'Perusahaan',
    items: [
      { href: '/about-us', label: 'Tentang Kami' },
      { href: '/core-values', label: 'Nilai Kami' },
      { href: '/our-awards', label: 'Penghargaan' },
      { href: '/layanan-kami', label: 'Layanan Kami' },
    ],
  },
  {
    label: 'Haji',
    items: [
      { href: '/paket?category=haji', label: 'Paket Haji Khusus' },
      { href: 'https://haji.go.id/estimasi-keberangkatan', label: 'Cek Estimasi Keberangkatan', external: true },
    ],
  },
  {
    label: 'Umroh',
    items: [{ href: '/paket?category=umroh', label: 'Semua Paket Umroh' }],
  },
  { label: 'Halal Holidays', href: '/paket?category=halal' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Galeri', href: '/gallery' },
  { label: 'Kontak', href: '/contact' },
];

export default function Header({ siteName, logo }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(null);

  return (
    <header className="sticky top-0 z-50 bg-sand/95 backdrop-blur border-b border-line">
      <div className="container-x flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={siteName} className="h-9 w-auto" />
          ) : (
            <span className="font-display text-2xl tracking-tight text-emerald">
              {siteName || 'Wujud Tour'}
            </span>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <div key={item.label} className="relative group">
              {item.href ? (
                <Link href={item.href} className="eyebrow text-ink/80 hover:text-emerald transition-colors link-underline">
                  {item.label}
                </Link>
              ) : (
                <button className="eyebrow text-ink/80 hover:text-emerald transition-colors flex items-center gap-1">
                  {item.label}
                  <svg width="9" height="6" viewBox="0 0 9 6" fill="none" className="mt-0.5">
                    <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              )}
              {item.items && (
                <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
                  <div className="bg-white shadow-lg border border-line min-w-[240px] py-2">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        target={sub.external ? '_blank' : undefined}
                        className="block px-5 py-2.5 text-sm text-ink/80 hover:bg-emerald-tint hover:text-emerald transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          aria-label="Buka menu"
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-0.5 w-6 bg-emerald transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-emerald transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-emerald transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-sand max-h-[80vh] overflow-y-auto">
          <div className="container-x py-4 flex flex-col">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-line/60 py-2">
                {item.href ? (
                  <Link href={item.href} className="block py-2 font-medium" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="w-full flex items-center justify-between py-2 font-medium"
                      onClick={() => setSubOpen(subOpen === item.label ? null : item.label)}
                    >
                      {item.label}
                      <span>{subOpen === item.label ? '−' : '+'}</span>
                    </button>
                    {subOpen === item.label && (
                      <div className="pl-3 flex flex-col pb-2">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            target={sub.external ? '_blank' : undefined}
                            className="py-2 text-sm text-ink/70"
                            onClick={() => setOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
