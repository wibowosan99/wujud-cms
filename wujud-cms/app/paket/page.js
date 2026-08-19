import { getPackages, CATEGORY_LABEL } from '@/lib/data';
import PageHero from '@/components/site/PageHero';
import PackageCard from '@/components/site/PackageCard';

export const metadata = { title: 'Paket Umroh, Haji & Halal Holidays' };

const TABS = [
  { key: '', label: 'Semua' },
  { key: 'umroh', label: 'Umroh' },
  { key: 'haji', label: 'Haji' },
  { key: 'halal', label: 'Halal Holidays' },
];

export default function PaketPage({ searchParams }) {
  const category = searchParams?.category || '';
  const packages = getPackages(category ? { category } : {});

  return (
    <>
      <PageHero
        eyebrow="Program"
        title={category ? `Paket ${CATEGORY_LABEL[category] || category}` : 'Semua Paket Perjalanan'}
      />
      <section className="container-x py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map((t) => (
            <a
              key={t.key}
              href={t.key ? `/paket?category=${t.key}` : '/paket'}
              className={`px-4 py-2 text-sm border ${
                category === t.key
                  ? 'bg-emerald text-white border-emerald'
                  : 'border-line text-ink/60 hover:border-emerald hover:text-emerald'
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>

        {packages.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        ) : (
          <p className="text-ink/50">Belum ada paket untuk kategori ini.</p>
        )}
      </section>
    </>
  );
}
