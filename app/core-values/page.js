import { getPage } from '@/lib/data';
import PageHero from '@/components/site/PageHero';

export const metadata = { title: 'Nilai-Nilai Kami' };

export default function CoreValuesPage() {
  const page = getPage('core-values');
  const items = (page?.content || '').split('\n\n').filter(Boolean);

  return (
    <>
      <PageHero eyebrow="Company" title={page?.title || 'Nilai-Nilai Kami'} />
      <section className="container-x py-16 sm:py-24">
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl">
          {items.map((item, i) => {
            const [head, ...rest] = item.split(' \u2014 ');
            return (
              <div key={i} className="bg-white border border-line p-7">
                <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl mt-3">{head}</h3>
                {rest.length > 0 && <p className="mt-2 text-ink/65 text-sm leading-relaxed">{rest.join(' \u2014 ')}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
