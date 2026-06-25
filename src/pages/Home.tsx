import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Users, Award, ClipboardCheck, Phone } from 'lucide-react'
import { CONTACT, SITE_NAME, SITE_TAGLINE } from '../constants'
import CtaStrip from '../components/ui/CtaStrip'

const services = [
  {
    icon: ShieldCheck,
    title: 'Skema Sertifikasi',
    description: 'Skema Tipe 1b/3 untuk sertifikasi benang dan jaring alat penangkapan ikan sesuai standar yang berlaku.',
    path: '/layanan/sertifikasi',
  },
  {
    icon: ClipboardCheck,
    title: 'Ruang Lingkup',
    description: 'Informasi lengkap mengenai ruang lingkup sertifikasi dan produk-produk yang dapat disertifikasi.',
    path: '/ruang-lingkup',
  },
]

const features = [
  {
    icon: Award,
    title: 'Terakreditasi',
    description: 'Lembaga sertifikasi produk yang beroperasi di bawah Kementerian Kelautan dan Perikanan RI.',
  },
  {
    icon: Users,
    title: 'Tenaga Ahli',
    description: 'Didukung oleh auditor dan teknisi kompeten yang berpengalaman di bidang perikanan.',
  },
  {
    icon: ShieldCheck,
    title: 'Integritas',
    description: 'Menjalankan proses sertifikasi secara objektif, transparan, dan terpercaya.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <img
          src="/Background Update.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/55" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4" />
                Lembaga Sertifikasi Produk
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
                {SITE_NAME}
                <span className="block text-accent text-2xl lg:text-3xl font-semibold mt-2">
                  {SITE_TAGLINE}
                </span>
              </h1>
              <p className="text-lg text-white mb-8 max-w-xl leading-relaxed drop-shadow-md">
                Lembaga sertifikasi produk sarana penangkapan ikan yang menyelenggarakan sertifikasi benang, jaring dan kapal berbahan FRP ukuran 3 GT dengan standar kualitas dan integritas tinggi
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/formulir/download"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-neutral-900 font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Download Formulir
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/tentang-kami"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-lg hover:bg-white/25 transition-colors backdrop-blur-sm"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Membangun Kepercayaan Melalui{' '}
                <span className="text-primary">Sertifikasi Berkualitas</span>
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  {SITE_NAME} adalah lembaga sertifikasi produk yang berada di bawah lingkup
                  Kementerian Kelautan dan Perikanan Republik Indonesia. Kami menyelenggarakan
                  kegiatan sertifikasi produk perikanan, khususnya benang dan jaring untuk alat
                  penangkapan ikan.
                </p>
                <p>
                  Dengan dukungan tenaga ahli yang kompeten dan berpengalaman, kami berkomitmen
                  untuk memberikan pelayanan sertifikasi yang objektif, transparan, dan profesional
                  demi meningkatkan daya saing produk perikanan Indonesia.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/tentang-kami"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Tentang Kami
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-3xl font-bold text-primary mb-1">Tipe 1b/3</div>
                  <div className="text-sm text-neutral-500">Skema Sertifikasi</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">100%</div>
                  <div className="text-sm text-neutral-500">Komitmen Integritas</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-3xl font-bold text-accent mb-1">KKP RI</div>
                  <div className="text-sm text-neutral-500">Naungan Kementerian</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="text-3xl font-bold text-primary mb-1">Semarang</div>
                  <div className="text-sm text-neutral-500">Lokasi Kantor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Layanan Kami</h2>
            <p className="text-neutral-600">
              Kami menyediakan layanan sertifikasi produk perikanan yang sesuai dengan standar
              nasional dan internasional.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {services.map(service => (
              <Link
                key={service.path}
                to={service.path}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                  Selengkapnya <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-neutral-600">
              Kami mengutamakan kualitas, integritas, dan kepuasan pelanggan dalam setiap proses
              sertifikasi.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(feature => (
              <div
                key={feature.title}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-5 text-secondary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">Butuh Bantuan?</h2>
              <p className="text-white/90 max-w-xl">
                Tim kami siap membantu menjawab pertanyaan terkait layanan sertifikasi produk BBPI.
              </p>
            </div>
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +62 859-3470-8829
            </a>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  )
}
