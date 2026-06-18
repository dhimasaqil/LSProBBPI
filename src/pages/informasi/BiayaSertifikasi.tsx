import ContentPage from '../../components/ui/ContentPage'

export default function BiayaSertifikasi() {
  return (
    <ContentPage
      pageKey="biaya-sertifikasi"
      title="Biaya Sertifikasi"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Informasi' }, { label: 'Biaya Sertifikasi' }]}
      description="Informasi biaya sertifikasi produk perikanan di LSPro BBPI."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Biaya Sertifikasi LSPro BBPI',
            deskripsi: `<p>Biaya sertifikasi dan biaya pengujian dalam rangka sertifikasi produk di LSPro BBPI mengacu pada regulasi yang berlaku, termasuk PP No. 85 Tahun 2021 tentang Jenis dan Tarif Penerimaan Negara Bukan Pajak (PNBP) pada Kementerian Kelautan dan Perikanan.</p>
            <p>Untuk informasi rincian biaya sesuai jenis produk dan ruang lingkup sertifikasi, silakan menghubungi kami.</p>`,
          },
        },
        {
          key: 'biaya',
          fallback: {
            judul: 'Komponen Biaya',
            deskripsi: `<p>Biaya sertifikasi umumnya mencakup komponen berikut:</p>
            <ul>
              <li>Biaya evaluasi permohonan dan tinjauan dokumen</li>
              <li>Biaya audit lapangan dan pengambilan contoh</li>
              <li>Biaya pengujian contoh di laboratorium</li>
              <li>Biaya rapat evaluasi dan penerbitan sertifikat</li>
              <li>Biaya surveilan berkala selama masa berlaku sertifikat</li>
            </ul>
            <p>Hubungi kami untuk mendapatkan penawaran biaya yang sesuai dengan produk dan kebutuhan sertifikasi Anda.</p>`,
          },
        },
      ]}
    />
  )
}
