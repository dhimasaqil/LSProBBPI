import PageHero from '../components/ui/PageHero'
import CtaStrip from '../components/ui/CtaStrip'
import { useFormDownloads } from '../hooks/useFormDownloads'
import { getGoogleDriveDownloadUrl } from '../utils/googleDrive'
import { FileText, Download, Loader2 } from 'lucide-react'

const defaultForms = [
  { slug: 'fr-7-2-1', label: 'FR.7.2-1 Surat Permohonan Sertifikasi' },
  { slug: 'fr-7-2-2', label: 'FR.7.2-2 Pernyataan Kesesuaian' },
  { slug: 'fr-7-2-3', label: 'FR.7.2-3 Pernyataan Persetujuan Pemohon' },
  { slug: 'fr-7-2-4', label: 'FR.7.2-4 Daftar Isian Pemohon Sertifikasi' },
  { slug: 'fr-7-13-1', label: 'FR.7.13-1 Formulir Keluhan' },
  { slug: 'fr-7-13-2', label: 'FR.7.13-2 Formulir Banding' },
]

export default function FormDownload() {
  const { data: forms, loading } = useFormDownloads()

  const formList = defaultForms.map(df => {
    const configured = forms.find(f => f.slug === df.slug)
    return { ...df, configuredUrl: configured?.file_url || null }
  })

  return (
    <>
      <PageHero
        title="Download Formulir Kosong"
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Formulir' }, { label: 'Download Formulir Kosong' }]}
        description="Unduh formulir-formulir yang diperlukan dalam proses sertifikasi LSPro BBPI."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 bg-neutral-50">
              <h2 className="text-xl font-bold text-neutral-900">Daftar Formulir</h2>
              <p className="text-neutral-600 mt-1">
                Klik tombol download untuk mengunduh formulir dalam format dokumen.
              </p>
            </div>
            <ul className="divide-y divide-neutral-100">
              {formList.map(form => {
                const downloadUrl = getGoogleDriveDownloadUrl(form.configuredUrl)
                return (
                  <li key={form.slug} className="p-4 flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">{form.label}</h3>
                        {!downloadUrl && (
                          <span className="text-xs text-amber-600">Belum tersedia</span>
                        )}
                      </div>
                    </div>
                    {downloadUrl ? (
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                        download
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-400">Segera hadir</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      <CtaStrip />
    </>
  )
}
