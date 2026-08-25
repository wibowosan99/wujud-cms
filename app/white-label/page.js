import PageHero from '@/components/site/PageHero';
import PartnerLeadForm from '@/components/site/PartnerLeadForm';
import { waLink, getSettings } from '@/lib/data';

export const metadata = { title: 'Umroh White Label - Punya Travel Sendiri' };

const BENEFITS = [
  {
    title: 'Branding Milik Anda Sendiri',
    text: 'Bangun nama travel Anda sendiri di bawah dukungan penuh Wujud Tour & Travel yang sudah berpengalaman dan berizin resmi. Anda tetap memasarkan dan mengelola jamaah dengan nama serta harga jual sendiri.',
  },
  {
    title: 'Dana Jamaah Aman',
    text: 'Pembayaran jamaah dikelola melalui rekening terpisah (escrow), bukan rekening pribadi &mdash; transparan dan aman bagi Anda maupun jamaah Anda.',
  },
  {
    title: 'Pendampingan Personal',
    text: 'Bukan sekadar daftar lalu dilepas &mdash; tim kami mendampingi Anda dari konsultasi awal hingga jamaah pertama berangkat.',
  },
  {
    title: 'Terintegrasi WhatsApp',
    text: 'Materi promosi dan update jadwal keberangkatan bisa langsung dibagikan ke jamaah Anda lewat WhatsApp.',
  },
  {
    title: 'Bantuan Hitung Harga Paket',
    text: 'Kami bantu Anda menghitung harga pokok dan margin paket Umroh/Haji secara akurat, tanpa tebak-tebakan.',
  },
];

const STEPS = [
  { n: '01', title: 'Isi Formulir', text: 'Lengkapi formulir pendaftaran di bawah halaman ini, cukup 2 menit.' },
  { n: '02', title: 'Konsultasi Personal', text: 'Tim kami menghubungi Anda via WhatsApp untuk memahami kebutuhan dan target bisnis Anda.' },
  { n: '03', title: 'Kesepakatan Kerja Sama', text: 'Diskusikan skema kemitraan, komisi, dan dukungan yang paling cocok untuk Anda.' },
  { n: '04', title: 'Mulai Berjualan', text: 'Anda mendapat materi promosi, akses paket, dan pendampingan penuh untuk mulai menjaring jamaah.' },
];

const FAQS = [
  {
    q: 'Apakah saya akan kehilangan brand atau kendali atas jamaah saya?',
    a: 'Tidak. Anda tetap memasarkan dan mengelola jamaah Anda sendiri, dengan nama dan harga jual yang Anda tentukan sendiri.',
  },
  {
    q: 'Siapa yang mengurus visa, tiket, dan hotel?',
    a: 'Wujud Tour & Travel sebagai pemegang izin PPIU resmi menangani seluruh proses visa, tiket pesawat, kontrak hotel, dan handling di Arab Saudi. Anda cukup fokus pada pemasaran dan penjualan dengan brand Anda sendiri.',
  },
  {
    q: 'Apakah saya perlu izin PPIU sendiri?',
    a: 'Tidak wajib di awal. Anda dapat menjual paket menggunakan izin resmi Wujud Tour & Travel sebagai mitra, sambil membangun brand Anda sendiri.',
  },
  {
    q: 'Bagaimana sistem pembagian komisi dan markup?',
    a: 'Anda mendapat harga dasar yang jelas dan tetap dari kami, lalu bebas menentukan markup/harga jual sendiri ke jamaah sesuai target keuntungan Anda. Detail skema didiskusikan personal saat konsultasi.',
  },
  {
    q: 'Apakah dana jamaah saya aman?',
    a: 'Ya. Pembayaran dikelola melalui rekening terpisah (escrow), bukan rekening pribadi, sehingga dana jamaah tercatat transparan dan aman.',
  },
  {
    q: 'Apakah saya akan didampingi setelah bergabung?',
    a: 'Ya. Tim kami mendampingi mulai dari konsultasi awal, penyusunan materi promosi, hingga jamaah pertama Anda berangkat.',
  },
  {
    q: 'Berapa lama proses dari daftar sampai bisa mulai jualan?',
    a: 'Setelah mengisi formulir, tim kami biasanya menghubungi Anda dalam 1x24 jam untuk konsultasi dan langkah selanjutnya.',
  },
];

export default function WhiteLabelPage() {
  const settings = getSettings();

  return (
    <>
      <PageHero
        eyebrow="Peluang Kemitraan"
        title="Bangun Bisnis Umroh Anda Sendiri, Didampingi Tim Berpengalaman"
      />

      <section className="container-x py-12 sm:py-16 text-center">
        <p className="max-w-2xl mx-auto text-ink/70 text-lg leading-relaxed">
          Wujud Tour &amp; Travel membuka kesempatan kemitraan bagi Anda yang ingin memiliki bisnis
          travel Umroh &amp; Haji dengan nama sendiri &mdash; didukung penuh oleh tim yang sudah
          berpengalaman dan berizin resmi.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#daftar" className="btn btn-primary">Daftar Jadi Mitra</a>
          <a href={waLink(settings)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Tanya via WhatsApp
          </a>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-emerald-tint py-16">
        <div className="container-x">
          <h2 className="font-display text-3xl text-center mb-10">Kenapa White Label?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white p-6 border border-line">
                <h3 className="font-display text-lg text-emerald-deep">{b.title}</h3>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x py-16">
        <h2 className="font-display text-3xl text-center mb-10">Cara Kerja</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s) => (
            <div key={s.n}>
              <span className="font-display text-4xl text-gold">{s.n}</span>
              <h3 className="font-display text-lg mt-2">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink/65 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-emerald-tint py-16">
        <div className="container-x max-w-2xl">
          <h2 className="font-display text-3xl text-center mb-10">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-white border border-line p-5 group">
                <summary className="font-medium cursor-pointer text-ink/85 list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-emerald group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-ink/65 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="daftar" className="container-x py-16 sm:py-20 max-w-2xl">
        <h2 className="font-display text-3xl text-center">Daftar Jadi Mitra Sekarang</h2>
        <p className="mt-2 text-center text-ink/60 text-sm">
          Tim kami akan menghubungi Anda melalui WhatsApp untuk proses selanjutnya.
        </p>
        <div className="mt-8">
          <PartnerLeadForm />
        </div>
      </section>
    </>
  );
}
