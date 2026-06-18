import PageHero from '../components/ui/PageHero'
import CtaStrip from '../components/ui/CtaStrip'

const orgUnits = [
  {
    title: 'Manajer Eksekutif',
    name: 'Kepala Balai Besar Penangkapan Ikan',
    desc: 'Pimpinan tertinggi LSPro BBPI yang bertanggung jawab secara teknis administratif.',
  },
  {
    title: 'Manajer Operasional',
    name: 'B. Candra Pratiwi, S.Pi, M.Si',
    desc: 'Menjamin proses kegiatan sertifikasi memenuhi persyaratan SNI ISO/IEC 17065:2012 dan regulasi yang berlaku.',
  },
  {
    title: 'Manajer Teknis',
    name: 'R. Sapto Pamungkas K., ST, MS',
    desc: 'Memeriksa dan mengevaluasi hasil pemantauan penggunaan lisensi, sertifikat, dan tanda kesesuaian.',
  },
  {
    title: 'Manajer Mutu',
    name: 'Tim Manajemen Mutu',
    desc: 'Menjamin klien memahami dan melaksanakan penggunaan tanda lisensi, sertifikat, dan tanda kesesuaian sesuai prosedur.',
  },
  {
    title: 'Manajer Administrasi',
    name: 'Tim Administrasi',
    desc: 'Menyiapkan seluruh dokumen administrasi yang diperlukan dalam proses sertifikasi.',
  },
  {
    title: 'Auditor & Petugas Pengambil Contoh',
    name: 'Personel Berkompeten',
    desc: 'Melaksanakan audit lapangan dan pengambilan contoh produk sesuai kompetensi yang dimiliki.',
  },
]

export default function StrukturOrganisasi() {
  return (
    <>
      <PageHero
        title="Struktur Organisasi"
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Struktur Organisasi' }]}
        description="Susunan organisasi LSPro BBPI dalam menyelenggarakan sertifikasi produk."
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-6">
          {orgUnits.map((unit, index) => (
            <div
              key={unit.title}
              className={`relative flex flex-col md:flex-row gap-6 ${index !== orgUnits.length - 1 ? 'pb-6 border-b border-neutral-200' : ''}`}
            >
              <div className="md:w-1/3">
                <div className="bg-primary text-white rounded-xl p-4 text-center shadow-md">
                  <h3 className="font-bold text-lg">{unit.title}</h3>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-bold text-neutral-900 mb-2">{unit.name}</h4>
                <p className="text-neutral-600 leading-relaxed">{unit.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
          <h3 className="text-xl font-bold text-primary mb-4">Komite Ketidakberpihakan</h3>
          <p className="text-neutral-600 leading-relaxed">
            LSPro BBPI memiliki Komite Ketidakberpihakan yang berperan dalam memastikan setiap
            keputusan sertifikasi dilakukan secara objektif, independen, dan bebas dari pengaruh
            kepentingan pihak manapun.
          </p>
        </div>
      </div>
      <CtaStrip />
    </>
  )
}
