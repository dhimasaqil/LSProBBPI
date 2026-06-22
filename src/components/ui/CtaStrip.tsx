import { Link } from 'react-router-dom'
import { Download, Phone } from 'lucide-react'
import { CONTACT } from '../../constants'

export default function CtaStrip() {
  return (
    <section className="bg-secondary py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-3">
              Siap Mengajukan Sertifikasi?
            </h2>
            <p className="text-neutral-600 max-w-xl">
              Download formulir permohonan, isi secara lengkap, dan kirimkan ke kami. Tim kami siap membantu proses sertifikasi produk perikanan Anda.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/formulir/download"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Formulir
            </Link>
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
