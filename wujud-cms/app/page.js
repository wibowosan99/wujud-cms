import Link from 'next/link';
import {
  getSettings,
  getHeroSlides,
  getStats,
  getFeaturedPackages,
  getTestimonials,
  getPartners,
  getTeam,
  getArticles,
  waLink,
} from '@/lib/data';
import PackageCard from '@/components/site/PackageCard';
import SectionHeading from '@/components/site/SectionHeading';

export default function HomePage() {
  const settings = getSettings();
  const hero = getHeroSlides()[0];
  const stats = getStats();
  const packages = getFeaturedPackages().slice(0, 3);
  const testimonials = getTestimonials();
  const partners = getPartners();
  const team = getTeam();
  const articles = getArticles({ limit: 3 });

  return (
    <>
      {/* HERO */}
      <section className="relative bg-emerald-deep text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: hero?.image ? `url(${hero.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/40 via-emerald-deep/80 to-emerald-deep" />
        <div className="relative container-x pt-24 pb-28 sm:pt-32 sm:pb-36">
          <span className="eyebrow text-gold-light">{settings.tagline}</span>
          <h1 className="font-display text-4xl sm:text-6xl mt-5 max-w-3xl leading-[1.1]">
            {hero?.title || 'Perjalanan yang Bukan Sekadar Tujuan, Tapi Sebuah Makna'}
          </h1>
          {hero?.subtitle && (
            <p className="mt-6 max-w-xl text-sand/75 text-lg leading-relaxed">{hero.subtitle}</p>
          )}
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink(settings)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {hero?.cta_label || 'Hubungi Kami'}
            </a>
            <Link href="/paket" className="btn btn-outline text-white">
              Lihat Semua Paket
            </Link>
          </div>
        </div>
        <div className="arch-row text-sand relative" />
      </section>

      {/* STATS */}
      {stats.length > 0 && (
        <section className="bg-sand">
          <div className="container-x py-14 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {stats.map((s) => (
              <div key={s.id} className="text-center sm:text-left">
                <div className="font-display text-4xl sm:text-5xl text-emerald">{s.value}</div>
                <div className="eyebrow text-ink/50 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PACKAGES */}
      <section className="container-x py-8 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Paket Pilihan"
            title="Program Populer Jamaah Wujud Tour"
          />
          <Link href="/paket" className="btn btn-outline text-emerald border-emerald shrink-0">
            Lihat Semua Paket
          </Link>
        </div>
        {packages.length > 0 ? (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-ink/50">Belum ada paket unggulan. Tambahkan lewat admin panel.</p>
        )}
      </section>

      {/* WHY US */}
      <section className="bg-emerald-tint py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Komitmen Kami"
            title="Mengapa Memilih Wujud Tour"
            description="Bukan sekadar perjalanan &mdash; setiap program kami dirancang untuk memberi pengalaman ibadah yang tenang, terarah, dan penuh makna."
          />
          <div className="mt-12 grid sm:grid-cols-3 gap-10">
            {[
              {
                title: 'Perjalanan Penuh Makna',
                text: 'Setiap itinerary disusun agar jamaah tidak hanya sampai ke tujuan, tapi juga pulang dengan hati yang lebih tenang.',
              },
              {
                title: 'Tim Berpengalaman',
                text: 'Didampingi pembimbing ibadah dan tour leader yang berpengalaman menangani jamaah dari berbagai latar belakang.',
              },
              {
                title: 'Transparan & Amanah',
                text: 'Informasi biaya, jadwal, dan fasilitas disampaikan sejak awal tanpa biaya tersembunyi.',
              },
            ].map((f) => (
              <div key={f.title}>
                <div className="h-10 w-10 rounded-full border border-gold flex items-center justify-center text-gold font-display">
                  &#9733;
                </div>
                <h3 className="font-display text-xl mt-4">{f.title}</h3>
                <p className="mt-2 text-ink/65 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="container-x py-16 sm:py-24">
          <SectionHeading eyebrow="Kata Jamaah" title="Cerita dari Perjalanan Mereka" align="center" />
          <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="snap-start shrink-0 w-[280px] sm:w-auto bg-white border border-line p-6"
              >
                <blockquote className="text-ink/75 leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-line">
                  <div className="font-medium text-sm">{t.name}</div>
                  {t.source && <div className="text-xs text-ink/50 mt-0.5">{t.source}</div>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* PARTNERS */}
      {partners.length > 0 && (
        <section className="bg-white border-y border-line py-12">
          <div className="container-x">
            <p className="eyebrow text-ink/40 text-center mb-8">Mitra &amp; Kolaborasi Kami</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
              {partners.map((p) => (
                <div key={p.id} className="text-sm font-medium text-ink/60">
                  {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo} alt={p.name} className="h-8 w-auto grayscale" />
                  ) : (
                    p.name
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TEAM */}
      {team.length > 0 && (
        <section className="container-x py-16 sm:py-24">
          <SectionHeading eyebrow="Kenali Kami" title="Pemimpin yang Menginspirasi" align="center" />
          <div className="mt-12 grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((m) => (
              <div key={m.id} className="text-center">
                <div className="mx-auto w-40 h-48 arch-frame bg-emerald-tint overflow-hidden">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-3xl text-emerald/30">
                      {m.name.slice(0, 1)}
                    </div>
                  )}
                </div>
                <h3 className="font-display text-lg mt-4">{m.name}</h3>
                <p className="eyebrow text-gold mt-1">{m.position}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="bg-emerald text-white">
        <div className="container-x py-16 sm:py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl max-w-xl mx-auto leading-tight">
            Doa Telah Terucap, Kini Saatnya Melangkah ke Baitullah
          </h2>
          <p className="mt-4 text-sand/70 max-w-md mx-auto">
            Dapatkan penawaran terbaik dan konsultasi gratis untuk perjalanan ibadah Anda.
          </p>
          <a href={waLink(settings)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
            Dapatkan Penawaran Terbaik
          </a>
        </div>
      </section>

      {/* ARTICLES */}
      {articles.length > 0 && (
        <section className="container-x py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <SectionHeading eyebrow="Wawasan" title="Tips dan Inspirasi Calon Jamaah" />
            <Link href="/artikel" className="btn btn-outline text-emerald border-emerald shrink-0">
              Lihat Semua Artikel
            </Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {articles.map((a) => (
              <Link key={a.id} href={`/artikel/${a.slug}`} className="group block">
                <div className="h-44 bg-emerald-tint overflow-hidden">
                  {a.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-2xl text-emerald/30">
                      {a.title.slice(0, 1)}
                    </div>
                  )}
                </div>
                {a.category && <span className="eyebrow text-gold mt-4 block">{a.category}</span>}
                <h3 className="font-display text-lg mt-2 group-hover:text-emerald transition-colors">{a.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
