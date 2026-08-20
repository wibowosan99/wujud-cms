import { getPage, getTeam } from '@/lib/data';
import PageHero from '@/components/site/PageHero';

export const metadata = { title: 'Tentang Kami' };

export default function AboutUsPage() {
  const page = getPage('about-us');
  const team = getTeam();

  return (
    <>
      <PageHero eyebrow="Company" title={page?.title || 'Tentang Kami'} />
      <section className="container-x py-16 sm:py-24 max-w-3xl">
        <div className="prose-content text-ink/75 text-lg whitespace-pre-line">
          {page?.content}
        </div>
      </section>

      {team.length > 0 && (
        <section className="bg-emerald-tint py-16 sm:py-20">
          <div className="container-x">
            <h2 className="font-display text-3xl mb-10">Tim Kami</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {team.map((m) => (
                <div key={m.id} className="bg-white p-6 border border-line text-center">
                  <div className="mx-auto w-28 h-28 rounded-full bg-emerald-tint overflow-hidden">
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-2xl text-emerald/30">
                        {m.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg mt-4">{m.name}</h3>
                  <p className="eyebrow text-gold mt-1">{m.position}</p>
                  {m.bio && <p className="text-sm text-ink/60 mt-3 leading-relaxed">{m.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
