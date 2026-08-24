import Link from 'next/link';
import { CATEGORY_LABEL } from '@/lib/data';

export default function PackageCard({ pkg, refSlug }) {
  const href = refSlug ? `/paket/${pkg.slug}?ref=${refSlug}` : `/paket/${pkg.slug}`;
  return (
    <Link
      href={href}
      className="group block bg-white border border-line/70 hover:border-gold transition-colors"
    >
      <div className={`relative aspect-[3/4] overflow-hidden flex items-center justify-center ${pkg.image ? 'bg-white' : 'bg-emerald-tint'}`}>
        {pkg.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-emerald/30 font-display text-3xl">
            {pkg.title.slice(0, 1)}
          </div>
        )}
        <span className="absolute top-3 left-3 eyebrow bg-emerald text-white px-3 py-1.5">
          {CATEGORY_LABEL[pkg.category] || pkg.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-ink group-hover:text-emerald transition-colors">{pkg.title}</h3>
        {pkg.excerpt && <p className="mt-2 text-sm text-ink/60 line-clamp-2">{pkg.excerpt}</p>}
        <div className="mt-4 flex items-center justify-between text-xs text-ink/50 border-t border-line pt-3">
          <span>{pkg.duration}</span>
          <span>{pkg.departure_date}</span>
        </div>
      </div>
    </Link>
  );
}
