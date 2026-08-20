import Link from 'next/link';
import { getPage } from '@/lib/data';
import PageHero from '@/components/site/PageHero';

export const metadata = { title: 'Layanan Kami' };

const SERVICES = [
  { title: 'Umroh Reguler & Plus', desc: 'Jadwal keberangkatan rutin dengan pilihan program reguler maupun plus negara lain.', href: '/paket?category=umroh' },
  { title: 'Haji Khusus', desc: 'Layanan haji khusus dengan masa tunggu lebih singkat dan fasilitas premium.', href: '/paket?category=haji' },
  { title: 'Halal Holidays', desc: 'Program wisata halal-friendly ke berbagai destinasi domestik dan internasional.', href: '/paket?category=halal' },
  { title: 'Dokumen Perjalanan', desc: 'Pengurusan paspor, visa, dan kelengkapan dokumen ibadah dari awal hingga selesai.' },
  { title: 'B2B & White Label', desc: 'Kerja sama dengan agen dan mitra travel untuk penyelenggaraan paket berlabel mitra.' },
];

export default function LayananKamiPage() {
  const page = getPage('layanan-kami');
  return (
    <>
      <PageHero eyebrow="Company" title={page?.title || 'Layanan Kami'} />
      <section className="container-x py-16 sm:py-24">
        {page?.content && (
          <p className="max-w-2xl text-ink/70 text-lg leading-relaxed mb-14">{page.content}</p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="border border-line bg-white p-7 flex flex-col">
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed flex-1">{s.desc}</p>
              {s.href && (
                <Link href={s.href} className="mt-4 text-sm font-medium text-emerald link-underline">
                  Lihat Detail &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
