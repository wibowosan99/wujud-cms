'use client';

import Link from 'next/link';
import { useState } from 'react';

const COMPANY_ITEMS = [
  { href: '/about-us', label: 'Tentang Kami' },
  { href: '/core-values', label: 'Nilai Kami' },
  { href: '/our-awards', label: 'Penghargaan' },
  { href: '/layanan-kami', label: 'Layanan Kami' },
];

export default function Header({ siteName, logo, menuData }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(null);

  const umroh = menuData?.umroh || [];
  const haji = menuData?.haji || [];
  const halal = menuData?.halal || [];

  const MEGA = [
    {
      key: 'haji',
      label: 'Haji',
      packages: haji,
      categoryHref: '/paket?category=haji',
      extra: { href: 'https://haji.go.id/estimasi-keberangkatan', label: 'Cek Estimasi Keberangkatan', external: true },
    },
    {
      key: 'umroh',
      label: 'Umroh',
      packages: umroh,
      categoryHref: '/paket?category=umroh',
    },
    {
      key: 'halal',
      label: 'Halal Holidays',
      packages: halal,
      categoryHref: '/paket?category=halal',
    },
  ];

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
          {/* Perusahaan (simple dropdown) */}
          <div className="relative group">
            <button className="eyebrow text-ink/80 hover:text-emerald transition-colors flex items-center gap-1">
              Perusahaan
              <ChevronDown />
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
              <div className="bg-white shadow-lg border border-line min-w-[220px] py-2">
                {COMPANY_ITEMS.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block px-5 py-2.5 text-sm text-ink/80 hover:bg-emerald-tint hover:text-emerald transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mega menus: Haji / Umroh / Halal Holidays */}
          {MEGA.map((m) => (
            <div key={m.key} className="relative group">
              <button className="eyebrow text-ink/80 hover:text-emerald transition-colors flex items-center gap-1">
                {m.label}
                <ChevronDown />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block">
                <div className="bg-white shadow-xl border border-line w-[420px] p-6">
                  {m.packages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {m.packages.slice(0, 8).map((p) => (
                        <Link
                          key={p.id}
                          href={`/paket/${p.slug}`}
                          className="block py-2 text-sm text-ink/75 hover:text-emerald transition-colors truncate"
                        >
                          {p.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-ink/40">Belum ada paket {m.label.toLowerCase()}.</p>
                  )}
                  {m.extra && (
                    <a
                      href={m.extra.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-3 pt-3 border-t border-line text-sm text-gold hover:text-gold-light transition-colors"
                    >
                      {m.extra.label} &rarr;
                    </a>
                  )}
                  <Link
                    href={m.categoryHref}
                    className="block mt-3 pt-3 border-t border-line text-sm font-semibold text-emerald hover:text-emerald-deep transition-colors"
                  >
                    Lihat Semua {m.label} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <Link href="/artikel" className="eyebrow text-ink/80 hover:text-emerald transition-colors link-underline">
            Artikel
          </Link>
          <Link href="/gallery" className="eyebrow text-ink/80 hover:text-emerald transition-colors link-underline">
            Galeri
          </Link>
          <Link href="/contact" className="eyebrow text-ink/80 hover:text-emerald transition-colors link-underline">
            Kontak
          </Link>
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

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-line bg-sand max-h-[80vh] overflow-y-auto">
          <div className="container-x py-4 flex flex-col">
            <MobileGroup
              label="Perusahaan"
              items={COMPANY_ITEMS}
              isOpen={subOpen === 'perusahaan'}
              toggle={() => setSubOpen(subOpen === 'perusahaan' ? null : 'perusahaan')}
              onNavigate={() => setOpen(false)}
            />
            {MEGA.map((m) => (
              <MobileGroup
                key={m.key}
                label={m.label}
                items={[
                  ...m.packages.map((p) => ({ href: `/paket/${p.slug}`, label: p.title })),
                  ...(m.extra ? [m.extra] : []),
                  { href: m.categoryHref, label: `Lihat Semua ${m.label}` },
                ]}
                isOpen={subOpen === m.key}
                toggle={() => setSubOpen(subOpen === m.key ? null : m.key)}
                onNavigate={() => setOpen(false)}
              />
            ))}
            {[
              { href: '/artikel', label: 'Artikel' },
              { href: '/gallery', label: 'Galeri' },
              { href: '/contact', label: 'Kontak' },
            ].map((item) => (
              <div key={item.href} className="border-b border-line/60 py-2">
                <Link href={item.href} className="block py-2 font-medium" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function ChevronDown() {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" className="mt-0.5">
      <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function MobileGroup({ label, items, isOpen, toggle, onNavigate }) {
  return (
    <div className="border-b border-line/60 py-2">
      <button className="w-full flex items-center justify-between py-2 font-medium" onClick={toggle}>
        {label}
        <span>{isOpen ? '\u2212' : '+'}</span>
      </button>
      {isOpen && (
        <div className="pl-3 flex flex-col pb-2">
          {items.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              target={sub.external ? '_blank' : undefined}
              className="py-2 text-sm text-ink/70"
              onClick={onNavigate}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
