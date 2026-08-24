import Link from 'next/link';
import { getArticles } from '@/lib/data';
import PageHero from '@/components/site/PageHero';

export const metadata = { title: 'Artikel & Wawasan' };

export default function ArtikelPage() {
  const articles = getArticles();
  return (
    <>
      <PageHero eyebrow="News" title="Tips dan Inspirasi Calon Jamaah" />
      <section className="container-x py-16 sm:py-20">
        {articles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <Link key={a.id} href={`/artikel/${a.slug}`} className="group block">
                <div className="h-48 bg-emerald-tint overflow-hidden flex items-center justify-center">
                  {a.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.image} alt={a.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-2xl text-emerald/30">
                      {a.title.slice(0, 1)}
                    </div>
                  )}
                </div>
                {a.category && <span className="eyebrow text-gold mt-4 block">{a.category}</span>}
                {a.published_at && (
                  <time className="text-xs text-ink/45 mt-1 block">
                    {new Date(a.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                )}
                <h3 className="font-display text-xl mt-2 group-hover:text-emerald transition-colors">{a.title}</h3>
                {a.excerpt && <p className="mt-2 text-sm text-ink/60 line-clamp-2">{a.excerpt}</p>}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-ink/50">Belum ada artikel yang dipublikasikan.</p>
        )}
      </section>
    </>
  );
}
