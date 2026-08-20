import Link from 'next/link';
import { listAll } from '@/lib/models';

function count(model) {
  try {
    return listAll(model).length;
  } catch {
    return 0;
  }
}

export default function AdminDashboardPage() {
  const cards = [
    { label: 'Paket Umroh & Haji', value: count('packages'), href: '/admin/packages' },
    { label: 'Artikel', value: count('articles'), href: '/admin/articles' },
    { label: 'Foto Galeri', value: count('gallery_images'), href: '/admin/gallery' },
    { label: 'Anggota Tim', value: count('team_members'), href: '/admin/team' },
    { label: 'Testimoni', value: count('testimonials'), href: '/admin/testimonials' },
    { label: 'Mitra', value: count('partners'), href: '/admin/partners' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-1">Dashboard</h1>
      <p className="text-sm text-ink/50 mb-8">Ringkasan konten website Wujud Tour & Travel.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="bg-white border border-line p-6 hover:border-gold transition-colors">
            <div className="font-display text-4xl text-emerald">{c.value}</div>
            <div className="text-sm text-ink/60 mt-2">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-emerald-tint border border-line p-6 max-w-2xl">
        <h2 className="font-display text-lg mb-3">Langkah Cepat</h2>
        <ul className="text-sm text-ink/70 space-y-2 list-disc pl-5">
          <li>Perbarui <Link href="/admin/hero-slides" className="text-emerald link-underline">tampilan Hero</Link> untuk mengganti pesan utama di beranda.</li>
          <li>Tambahkan atau ubah <Link href="/admin/packages" className="text-emerald link-underline">Paket Umroh/Haji</Link> yang sedang berjalan.</li>
          <li>Perbarui nomor WhatsApp dan kontak di <Link href="/admin/settings" className="text-emerald link-underline">Pengaturan Situs</Link>.</li>
          <li>Segera ganti password default di <Link href="/admin/profile" className="text-emerald link-underline">Akun Saya</Link>.</li>
        </ul>
      </div>
    </div>
  );
}
