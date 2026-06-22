import PageHero from '../components/ui/PageHero'
import CtaStrip from '../components/ui/CtaStrip'

export default function StrukturOrganisasi() {
  return (
    <>
      <PageHero
        title="Struktur Organisasi"
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Struktur Organisasi' }]}
        description="Susunan organisasi LSPro BBPI dalam menyelenggarakan sertifikasi produk."
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 lg:p-10">
          <img
            src="/Struktur Organisasi LSPro.png"
            alt="Struktur Organisasi LSPro BBPI"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <p className="mt-6 text-sm text-neutral-500 text-center">
          Struktur organisasi LSPro BBPI sesuai dengan tugas dan fungsi masing-masing unit.
        </p>
      </div>
      <CtaStrip />
    </>
  )
}
