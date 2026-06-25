import ContentPage from '../../components/ui/ContentPage'

export default function KeluhanBanding() {
  return (
    <ContentPage
      pageKey="keluhan-banding"
      title="Keluhan & Banding"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Informasi' }, { label: 'Keluhan & Banding' }]}
      description="Prosedur pengajuan keluhan dan banding terkait layanan sertifikasi LSPro BBPI."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Penanganan Keluhan dan Banding',
            deskripsi: `<p>LSPro BBPI berkomitmen untuk menangani setiap keluhan dan banding secara objektif, transparan, dan profesional sesuai dengan prinsip SNI ISO/IEC 17065:2012.</p>
            <p>Setiap pihak yang berkepentingan berhak mengajukan keluhan atau banding terkait kegiatan sertifikasi yang dilaksanakan oleh LSPro BBPI.</p>`,
          },
        },
        {
          key: 'prosedur',
          fallback: {
            judul: 'Prosedur Pengajuan',
            deskripsi: `<ol>
              <li>Keluhan atau banding diajukan secara tertulis kepada LSPro BBPI dengan melampirkan identitas pemohon, uraian kejadian, dan bukti pendukung.</li>
              <li>Manajer Mutu atau pejabat yang ditunjuk akan melakukan verifikasi dan investigasi terhadap keluhan atau banding yang diajukan.</li>
              <li>LSPro BBPI akan memberikan tanggapan awal paling lambat 10 (sepuluh) hari kerja sejak keluhan atau banding diterima.</li>
              <li>Hasil penanganan keluhan atau banding akan disampaikan secara tertulis kepada pemohon.</li>
              <li>LSPro BBPI menjamin bahwa proses penanganan keluhan dan banding tidak akan berdampak negatif terhadap objektivitas keputusan sertifikasi.</li>
            </ol>
            <p>Untuk informasi lebih lanjut, silakan hubungi kami melalui email <strong>lspro.bbpi@gmail.com</strong> atau WhatsApp <strong>0859 3470 8829</strong>.</p>`,
          },
        },
      ]}
    />
  )
}
