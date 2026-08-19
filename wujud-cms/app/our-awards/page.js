import { getPage, getStats } from '@/lib/data';
import PageHero from '@/components/site/PageHero';

export const metadata = { title: 'Penghargaan Kami' };

export default function OurAwardsPage() {
  const page = getPage('our-awards');
  const stats = getStats();

  return (
    <>
      <PageHero eyebrow="Company" title={page?.title || 'Penghargaan Kami'} />
      <section className="container-x py-16 sm:py-24 max-w-3xl">
        <div className="prose-content text-ink/75 text-lg whitespace-pre-line">{page?.content}</div>
      </section>
      {stats.length > 0 && (
        <section className="bg-emerald-tint py-14">
          <div className="container-x grid grid-cols-2 sm:grid-cols-3 gap-8">
            {stats.map((s) => (
              <div key={s.id} className="text-center">
                <div className="font-display text-4xl sm:text-5xl text-emerald">{s.value}</div>
                <div className="eyebrow text-ink/50 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
