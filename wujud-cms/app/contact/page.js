import { getSettings, waLink } from '@/lib/data';
import PageHero from '@/components/site/PageHero';

export const metadata = { title: 'Kontak' };

export default function ContactPage() {
  const settings = getSettings();
  return (
    <>
      <PageHero eyebrow="Contact" title="Hubungi Kami" />
      <section className="container-x py-16 sm:py-20 grid sm:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl mb-6">Informasi Kontak</h2>
          <dl className="space-y-5 text-ink/75">
            {settings.phone && (
              <div>
                <dt className="eyebrow text-ink/40 mb-1">Telepon</dt>
                <dd>{settings.phone}</dd>
              </div>
            )}
            {settings.email && (
              <div>
                <dt className="eyebrow text-ink/40 mb-1">Email</dt>
                <dd>{settings.email}</dd>
              </div>
            )}
            {settings.address && (
              <div>
                <dt className="eyebrow text-ink/40 mb-1">Alamat</dt>
                <dd>{settings.address}</dd>
              </div>
            )}
          </dl>
          <a href={waLink(settings)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
            Chat via WhatsApp
          </a>
        </div>
        <div className="bg-emerald-tint border border-line p-8">
          <h2 className="font-display text-2xl mb-4">Konsultasi Gratis</h2>
          <p className="text-ink/65 leading-relaxed mb-6">
            Tim kami siap membantu menjawab pertanyaan seputar paket Umroh, Haji Khusus, maupun Halal Holidays.
            Hubungi kami langsung melalui WhatsApp untuk respon tercepat.
          </p>
          <a href={waLink(settings)} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-emerald link-underline">
            {settings.whatsapp_number}
          </a>
        </div>
      </section>
    </>
  );
}
