import Link from 'next/link';
import { waLink, getBranches } from '@/lib/data';
import SocialIcons from './SocialIcons';

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  const branches = getBranches();
  const showLicenses = !!Number(settings.show_licenses || 0);

  return (
    <footer className="bg-emerald-deep text-sand/90 mt-24">
      <div className="arch-row text-emerald-deep bg-sand" />
      <div className="container-x py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <span className="font-display text-2xl text-white">{settings.site_name || 'Wujud Tour'}</span>
          <p className="mt-4 text-sm text-sand/70 leading-relaxed max-w-xs">
            {settings.about_short}
          </p>

          {showLicenses && (settings.ppiu_number || settings.pihk_number) && (
            <div className="mt-5 space-y-2">
              {settings.ppiu_number && (
                <div className="flex items-center gap-2 text-xs text-sand/70">
                  <CheckBadge />
                  <span>Izin Umroh (PPIU): <span className="text-white font-medium">{settings.ppiu_number}</span></span>
                </div>
              )}
              {settings.pihk_number && (
                <div className="flex items-center gap-2 text-xs text-sand/70">
                  <CheckBadge />
                  <span>Izin Haji Khusus (PIHK): <span className="text-white font-medium">{settings.pihk_number}</span></span>
                </div>
              )}
            </div>
          )}

          <div className="mt-5">
            <SocialIcons settings={settings} whatsappHref={waLink(settings)} />
          </div>
        </div>

        <div>
          <h4 className="eyebrow text-gold-light mb-4">Perusahaan</h4>
          <ul className="space-y-2.5 text-sm text-sand/75">
            <li><Link href="/about-us" className="link-underline">Tentang Kami</Link></li>
            <li><Link href="/layanan-kami" className="link-underline">Layanan Kami</Link></li>
            <li><Link href="/our-awards" className="link-underline">Penghargaan</Link></li>
            <li><Link href="/contact" className="link-underline">Kontak</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-gold-light mb-4">Program</h4>
          <ul className="space-y-2.5 text-sm text-sand/75">
            <li><Link href="/paket?category=umroh" className="link-underline">Paket Umroh</Link></li>
            <li><Link href="/paket?category=haji" className="link-underline">Haji Khusus</Link></li>
            <li><Link href="/paket?category=halal" className="link-underline">Halal Holidays</Link></li>
            <li><Link href="/artikel" className="link-underline">Artikel</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-gold-light mb-4">Hubungi Kami</h4>
          {branches.length > 0 ? (
            <ul className="space-y-4 text-sm text-sand/75">
              {branches.map((b) => (
                <li key={b.id}>
                  <p className="text-white font-medium text-xs eyebrow">{b.name}</p>
                  {b.address && <p className="mt-1 whitespace-pre-line">{b.address}</p>}
                  {b.phone && <p className="mt-1 text-sand/60">{b.phone}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-2.5 text-sm text-sand/75">
              {settings.phone && <li>{settings.phone}</li>}
              {settings.email && <li>{settings.email}</li>}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          )}
          <a
            href={waLink(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-5"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-sand/50">
          &copy; {year} {settings.site_name || 'Wujud Tour & Travel'}. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}

function CheckBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-gold-light">
      <path d="M12 2 L20 5.5 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V5.5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12 L11 14 L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
