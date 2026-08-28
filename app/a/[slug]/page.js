import { notFound } from 'next/navigation';
import { getAffiliateBySlug, getPackages, waLinkTo, incrementAffiliateVisit } from '@/lib/data';
import PackageCard from '@/components/site/PackageCard';

export async function generateMetadata({ params }) {
  const affiliate = getAffiliateBySlug(params.slug);
  if (!affiliate) return {};
  return {
    title: `${affiliate.name} - Affiliate Wujud Tour & Travel`,
    robots: { index: false, follow: true },
  };
}

export default function AffiliatePersonalPage({ params }) {
  const affiliate = getAffiliateBySlug(params.slug);
  if (!affiliate) notFound();
  const visitCount = incrementAffiliateVisit(affiliate.id);

  const packages = getPackages();
  const introMessage = `Halo ${affiliate.name.split(' ')[0]}, saya tertarik dengan paket Umroh/Haji Wujud Tour.`;

  return (
    <>
      <section className="relative bg-emerald-deep text-white overflow-hidden">
        <div className="relative container-x py-16 sm:py-20 flex flex-col sm:flex-row items-center gap-8">
          {affiliate.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={affiliate.photo}
              alt={affiliate.name}
              className="h-28 w-28 rounded-full object-cover border-4 border-gold shrink-0"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-emerald flex items-center justify-center font-display text-4xl shrink-0">
              {affiliate.name.slice(0, 1)}
            </div>
          )}
          <div className="text-center sm:text-left">
            <span className="eyebrow text-gold-light">Affiliate Alumni Wujud Tour</span>
            <h1 className="font-display text-3xl sm:text-4xl mt-2">{affiliate.name}</h1>
            {affiliate.umroh_year && <p className="mt-1 text-sand/70 text-sm">{affiliate.umroh_year}</p>}
            {affiliate.message && (
              <p className="mt-4 max-w-xl text-sand/85 leading-relaxed">{affiliate.message}</p>
            )}
            <a
              href={waLinkTo(affiliate.whatsapp, introMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6 inline-block"
            >
              Chat Langsung dengan {affiliate.name.split(' ')[0]}
            </a>
            <p className="mt-3 text-xs text-sand/50">
              Halaman ini sudah dilihat {visitCount.toLocaleString('id-ID')} kali
            </p>
          </div>
        </div>
        <div className="arch-row text-sand relative" />
      </section>

      <section className="container-x py-16 sm:py-20">
        <h2 className="font-display text-3xl text-center mb-10">Paket Umroh &amp; Haji Wujud Tour</h2>
        {packages.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} refSlug={affiliate.slug} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50">Belum ada paket tersedia saat ini.</p>
        )}
      </section>
    </>
  );
}
