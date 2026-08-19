import { getGallery } from '@/lib/data';
import PageHero from '@/components/site/PageHero';

export const metadata = { title: 'Galeri' };

export default function GalleryPage() {
  const images = getGallery();
  return (
    <>
      <PageHero eyebrow="Gallery" title="Momen Perjalanan Jamaah Kami" />
      <section className="container-x py-16 sm:py-20">
        {images.length > 0 ? (
          <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
            {images.map((img) => (
              <div key={img.id} className="mb-4 break-inside-avoid bg-emerald-tint overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.image} alt={img.title || 'Galeri Wujud Tour'} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink/50">Galeri akan segera hadir. Tambahkan foto lewat admin panel.</p>
        )}
      </section>
    </>
  );
}
