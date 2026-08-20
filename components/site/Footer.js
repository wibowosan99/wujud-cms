import Link from 'next/link';
import { waLink } from '@/lib/data';

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-emerald-deep text-sand/90 mt-24">
      <div className="arch-row text-emerald-deep bg-sand" />
      <div className="container-x py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <span className="font-display text-2xl text-white">{settings.site_name || 'Wujud Tour'}</span>
          <p className="mt-4 text-sm text-sand/70 leading-relaxed max-w-xs">
            {settings.about_short}
          </p>
          <p className="mt-4 text-xs text-sand/50">PT Wujud Mitra Mandiri &mdash; PPIU Umroh Berizin Resmi</p>
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
          <ul className="space-y-2.5 text-sm text-sand/75">
            {settings.phone && <li>{settings.phone}</li>}
            {settings.email && <li>{settings.email}</li>}
            {settings.address && <li>{settings.address}</li>}
          </ul>
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
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-sand/50">
          <span>&copy; {year} {settings.site_name || 'Wujud Tour & Travel'}. Seluruh hak cipta dilindungi.</span>
          <div className="flex gap-4">
            {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a>}
            {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a>}
            {settings.youtube && <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="link-underline">YouTube</a>}
          </div>
        </div>
      </div>
    </footer>
  );
}
