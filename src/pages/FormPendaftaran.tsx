import PageHero from '../components/ui/PageHero'
import CtaStrip from '../components/ui/CtaStrip'
import { useGoogleFormBySlug } from '../hooks/useGoogleForms'
import { getGoogleFormEmbedUrl } from '../utils/googleDrive'
import { Loader2 } from 'lucide-react'

export default function FormPendaftaran() {
  const form = useGoogleFormBySlug('pendaftaran')

  return (
    <>
      <PageHero
        title="Formulir Pendaftaran"
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Formulir' }, { label: 'Formulir Pendaftaran' }]}
        description="Ajukan permohonan sertifikasi produk perikanan secara online melalui formulir berikut."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {!form ? (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-neutral-600">
              Formulir pendaftaran sedang dipersiapkan. Silakan hubungi kami untuk informasi lebih lanjut.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
            <iframe
              title="Formulir Pendaftaran LSPro BBPI"
              src={getGoogleFormEmbedUrl(form.form_id)}
              className="w-full min-h-[800px] lg:min-h-[1000px]"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Memuat formulir...
            </iframe>
          </div>
        )}
      </div>
      <CtaStrip />
    </>
  )
}
