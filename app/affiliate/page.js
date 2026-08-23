import PageHero from '@/components/site/PageHero';
import AffiliateRegisterForm from '@/components/site/AffiliateRegisterForm';

export const metadata = { title: 'Program Affiliate Alumni - Gratis Khusus Jamaah Wujud Tour' };

const BENEFITS = [
  {
    title: 'Gratis untuk Alumni',
    text: 'Khusus jamaah yang sudah pernah Umroh/Haji bersama Wujud Tour, tanpa biaya pendaftaran.',
  },
  {
    title: 'Halaman Personal Sendiri',
    text: 'Dapat halaman khusus dengan foto dan pesan pribadi Anda, menampilkan semua paket Wujud Tour.',
  },
  {
    title: 'Komisi Setiap Jamaah',
    text: 'Dapatkan komisi untuk setiap jamaah yang berhasil berangkat melalui referral Anda.',
  },
];

export default function AffiliatePage() {
  return (
    <>
      <PageHero
        eyebrow="Khusus Alumni Jamaah"
        title="Ajak Orang Terdekat Umroh, Dapatkan Komisi"
      />

      <section className="container-x py-12 sm:py-16 text-center">
        <p className="max-w-2xl mx-auto text-ink/70 text-lg leading-relaxed">
          Sudah pernah Umroh atau Haji bersama Wujud Tour? Bagikan pengalaman Anda dan bantu orang
          terdekat berangkat juga &mdash; lewat halaman personal Anda sendiri, gratis khusus alumni.
        </p>
      </section>

      <section className="bg-emerald-tint py-16">
        <div className="container-x grid sm:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white p-6 border border-line">
              <h3 className="font-display text-lg text-emerald-deep">{b.title}</h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-16 sm:py-20 max-w-2xl">
        <h2 className="font-display text-3xl text-center">Daftar Sekarang</h2>
        <p className="mt-2 text-center text-ink/60 text-sm">
          Setelah verifikasi, halaman personal Anda akan aktif di wujudtour.com/a/nama-anda
        </p>
        <div className="mt-8">
          <AffiliateRegisterForm />
        </div>
      </section>
    </>
  );
}
