import { notFound } from 'next/navigation';
import { getAffiliateBySlug, getPackages, waLinkTo } from '@/lib/data';
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

  const packages = getPackages();
  const introMessage = `Halo ${affiliate.name.split(' ')[0]}, saya tertarik dengan paket Umroh/Haji Wujud Tour.`;

  const personalUrl = `https://wujudtour.com/a/${affiliate.slug}`;
  const shareText = `Assalamualaikum! 🕋 Yuk wujudkan niat Umroh/Haji bersama Wujud Tour & Travel. Lihat pilihan paketnya dan tanya langsung ke saya di sini:\n${personalUrl}`;
  const shareLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

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
            <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <a
                href={waLinkTo(affiliate.whatsapp, introMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-block"
              >
                Chat Langsung dengan {affiliate.name.split(' ')[0]}
              </a>
              <a
                href={shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-white inline-flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92C21.96 6.45 17.5 2 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.13.07.72-.17 1.4z" />
                </svg>
                Bagikan ke WhatsApp
              </a>
            </div>
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
