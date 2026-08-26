import { notFound } from 'next/navigation';
import { getPackageBySlug, getSettings, waLink, waLinkTo, getAffiliateBySlug, CATEGORY_LABEL } from '@/lib/data';

export async function generateMetadata({ params }) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return {};
  return { title: pkg.title, description: pkg.excerpt };
}

export default function PackageDetailPage({ params, searchParams }) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();
  const settings = getSettings();
  const message = `Saya (Nama Anda) dari (Lokasi Anda), ingin mendaftar paket ${pkg.title} di ${settings.site_name}`;

  const affiliate = searchParams?.ref ? getAffiliateBySlug(searchParams.ref) : null;
  const contactHref = affiliate ? waLinkTo(affiliate.whatsapp, message) : waLink(settings, message);

  return (
    <>
      <section className="relative bg-emerald-deep text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: pkg.image ? `url(${pkg.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/40 via-emerald-deep/80 to-emerald-deep" />
        <div className="relative container-x py-20">
          <span className="eyebrow text-gold-light">{CATEGORY_LABEL[pkg.category] || pkg.category}</span>
          <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-2xl">{pkg.title}</h1>
        </div>
        <div className="arch-row text-sand relative" />
      </section>

      <section className="container-x py-16 sm:py-20 grid lg:grid-cols-[1fr_320px] gap-12">
        <div>
          {pkg.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="w-full h-[420px] sm:h-[520px] bg-emerald-tint mb-10 flex items-center justify-center overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="max-w-full max-h-full object-contain" />
            </div>
          )}
          <div className="prose-content text-ink/75 text-lg whitespace-pre-line">{pkg.content}</div>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit border border-line bg-white p-7">
          <h2 className="eyebrow text-ink/40 mb-4">Ringkasan Paket</h2>
          <dl className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink/50">Durasi</dt>
              <dd className="font-medium">{pkg.duration}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-ink/50">Keberangkatan</dt>
              <dd className="font-medium">{pkg.departure_date}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/50 shrink-0">Harga</dt>
              <dd className="font-medium text-right">{pkg.price}</dd>
            </div>
          </dl>
          <a href={contactHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center mt-7">
            Daftar via WhatsApp
          </a>
        </aside>
      </section>
    </>
  );
}
