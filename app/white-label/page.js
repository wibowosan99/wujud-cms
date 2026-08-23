import PageHero from '@/components/site/PageHero';
import PartnerLeadForm from '@/components/site/PartnerLeadForm';
import { waLink, getSettings } from '@/lib/data';

export const metadata = { title: 'Umroh White Label - Punya Travel Sendiri' };

const BENEFITS = [
  {
    title: 'Branding 100% Milik Anda',
    text: 'Nama, logo, dan warna travel Anda sendiri. Jamaah tidak akan tahu ada sistem pihak ketiga di baliknya.',
  },
  {
    title: 'Aktif dalam Hitungan Menit',
    text: 'Bayar biaya aktivasi, sistem otomatis menyiapkan website Anda. Kredensial login langsung dikirim ke email.',
  },
  {
    title: 'Terintegrasi WhatsApp',
    text: 'Broadcast promo dan notifikasi jadwal keberangkatan otomatis ke jamaah, langsung dari dashboard Anda.',
  },
  {
    title: 'Kalkulator HPP Bawaan',
    text: 'Hitung harga pokok dan margin paket Umroh/Haji secara instan, tanpa perlu spreadsheet manual.',
  },
];

const STEPS = [
  { n: '01', title: 'Isi Formulir', text: 'Lengkapi formulir pendaftaran mitra di bawah halaman ini.' },
  { n: '02', title: 'Pilih Tema', text: 'Pilih salah satu tema tampilan siap pakai untuk website Anda.' },
  { n: '03', title: 'Bayar Aktivasi', text: 'Selesaikan pembayaran biaya aktivasi paket yang dipilih.' },
  { n: '04', title: 'Langsung Aktif', text: 'Website & dashboard Anda otomatis aktif, kredensial dikirim ke email.' },
];

const FAQS = [
  {
    q: 'Apakah saya perlu izin PPIU sendiri?',
    a: 'Tidak wajib di awal. Anda dapat menjual paket menggunakan izin resmi Wujud Tour & Travel sebagai mitra, sambil membangun brand Anda sendiri.',
  },
  {
    q: 'Bagaimana sistem pembagian komisi?',
    a: 'Skema komisi dijelaskan secara detail saat proses onboarding setelah pendaftaran, disesuaikan dengan paket yang dipilih.',
  },
  {
    q: 'Bisa pakai domain sendiri?',
    a: 'Bisa. Anda dapat menghubungkan domain milik Anda sendiri ke website white label setelah aktivasi.',
  },
  {
    q: 'Apakah data jamaah saya aman dan terpisah?',
    a: 'Ya, setiap mitra memiliki ruang data sendiri yang terpisah dari mitra lain.',
  },
];

export default function WhiteLabelPage() {
  const settings = getSettings();

  return (
    <>
      <PageHero
        eyebrow="Peluang Kemitraan"
        title="Punya Website & Aplikasi Umroh Sendiri, Tanpa Bangun dari Nol"
      />

      <section className="container-x py-12 sm:py-16 text-center">
        <p className="max-w-2xl mx-auto text-ink/70 text-lg leading-relaxed">
          Wujud Tour &amp; Travel menyediakan platform siap pakai dengan nama dan branding travel Anda
          sendiri &mdash; jamaah daftar, bayar, dan pantau progres langsung dari website Anda.
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
