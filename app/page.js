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
import HeroBackground from '@/components/site/HeroBackground';
import LogoMarquee from '@/components/site/LogoMarquee';

export default function HomePage() {
  const settings = getSettings();
  const heroSlides = getHeroSlides();
  const hero = heroSlides[0];
  const stats = getStats();
  const packages = getFeaturedPackages().slice(0, 3);
  const testimonials = getTestimonials();
  const partners = getPartners();
  const team = getTeam();
  const articles = getArticles({ limit: 3 });

  return (
    <>
      {/* HERO */}
      <section className="relative bg-emerald-deep text-white overflow-hidden min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-center">
        <HeroBackground slides={heroSlides} />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/55 via-emerald-deep/40 to-emerald-deep" />
        <div className="relative container-x py-20 sm:py-28 w-full">
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
        <div className="arch-row text-sand absolute bottom-0 left-0 right-0" />

        {/* FACILITY HIGHLIGHTS - overlapping the hero/section boundary */}
        <div className="relative container-x">
          <div className="grid sm:grid-cols-3 gap-px bg-line -mb-16 sm:-mb-20 relative z-10 shadow-xl">
            {[
              {
                title: 'Fasilitas Terbaik',
                text: 'Akomodasi premium, transportasi modern, dan sajian halal bergizi di sepanjang perjalanan Anda.',
              },
              {
                title: 'Pelayanan Prima',
                text: 'Tim profesional kami siap melayani dengan ramah, sigap, dan penuh perhatian di setiap detail.',
              },
              {
                title: 'Penuh Pemaknaan',
                text: 'Bukan hanya soal destinasi, tapi tentang menemukan makna di setiap langkah ibadah Anda.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-white p-7 sm:p-8">
                <span className="eyebrow text-gold">{f.title}</span>
                <p className="mt-3 text-sm text-ink/65 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-16 sm:h-20" />

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
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <SectionHeading
              eyebrow="Komitmen Kami"
              title="Mengapa Memilih Wujud Tour"
              description="Bukan sekadar perjalanan &mdash; setiap program kami dirancang untuk memberi pengalaman ibadah yang tenang, terarah, dan penuh makna."
            />
            {stats.length > 0 && (
              <div className="flex items-center gap-4 bg-white border border-line px-6 py-4 shrink-0">
                <span className="font-display text-3xl text-emerald">4.9</span>
                <div className="w-px h-10 bg-line" />
                <div>
                  <div className="font-display text-lg text-emerald leading-none">
                    {stats.find((s) => /jamaah|keberangkatan/i.test(s.label))?.value || stats[0]?.value}
                    <span className="text-sm">+</span>
                  </div>
                  <div className="eyebrow text-ink/40 mt-1.5 text-[0.65rem]">Jamaah Puas</div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-12 grid sm:grid-cols-3 gap-10">
            {[
              {
                title: 'Perjalanan Penuh Makna',
                text: 'Setiap itinerary disusun agar jamaah tidak hanya sampai ke tujuan, tapi juga pulang dengan hati yang lebih tenang.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M12 2 L12 22 M2 12 L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: 'Tim Berpengalaman',
                text: 'Didampingi pembimbing ibadah dan tour leader yang berpengalaman menangani jamaah dari berbagai latar belakang.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: 'Transparan & Amanah',
                text: 'Informasi biaya, jadwal, dan fasilitas disampaikan sejak awal tanpa biaya tersembunyi.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path d="M12 3 L20 6.5 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6.5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 12 L11 14 L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.title}>
                <div className="h-11 w-11 rounded-full border border-gold flex items-center justify-center text-gold">
                  {f.icon}
                </div>
                <h3 className="font-display text-xl mt-4">{f.title}</h3>
                <p className="mt-2 text-ink/65 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER #1 - slim WhatsApp strip, right after Why Us */}
      <section className="bg-gold">
        <div className="container-x py-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <p className="font-display text-xl sm:text-2xl text-emerald-deep leading-snug">
            Masih ragu memilih paket? Konsultasi gratis dengan tim kami sekarang.
          </p>
          <a
            href={waLink(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-emerald-deep text-white hover:bg-emerald shrink-0"
          >
            Chat via WhatsApp
          </a>
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
          </div>
          <LogoMarquee partners={partners} />
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
                <div className="mt-4 flex items-center gap-3">
                  {a.category && <span className="eyebrow text-gold">{a.category}</span>}
                  {a.published_at && (
                    <>
                      {a.category && <span className="text-ink/25">&middot;</span>}
                      <time className="text-xs text-ink/45">
                        {new Date(a.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </time>
                    </>
                  )}
                </div>
                <h3 className="font-display text-lg mt-2 group-hover:text-emerald transition-colors">{a.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA BANNER #2 - final call to action, right before footer */}
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
    </>
  );
}
