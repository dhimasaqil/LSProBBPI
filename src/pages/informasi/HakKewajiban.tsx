import ContentPage from '../../components/ui/ContentPage'

export default function HakKewajiban() {
  return (
    <ContentPage
      pageKey="hak-kewajiban"
      title="Hak dan Kewajiban"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Informasi' }, { label: 'Hak dan Kewajiban' }]}
      description="Ketentuan hak dan kewajiban klien dalam penggunaan lisensi, sertifikat, dan tanda kesesuaian LSPro BBPI."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Hak dan Kewajiban Penggunaan Tanda Kesesuaian',
            deskripsi: `<p>Prosedur ini mengatur penggunaan dan pemantauan terhadap lisensi, sertifikat, dan tanda kesesuaian dalam sertifikasi Lembaga Sertifikasi Produk Balai Besar Penangkapan Ikan (LSPro BBPI).</p>
            <p>LSPro BBPI bekerja sama dengan Badan Standarisasi Nasional (BSN) sebagai penerbit lisensi dan tanda kesesuaian, sesuai dengan PERKA BSN tentang Tata Cara Penggunaan Tanda SNI dan Tanda Kesesuaian Berbasis SNI.</p>`,
          },
        },
        {
          key: 'hak',
          fallback: {
            judul: 'Hak Klien',
            deskripsi: `<ul>
              <li>Mendapatkan sertifikat kesesuaian produk setelah dinyatakan memenuhi persyaratan SNI dan persyaratan sertifikasi.</li>
              <li>Menggunakan lisensi, sertifikat, dan tanda kesesuaian yang diterbitkan oleh BSN sesuai dengan ruang lingkup sertifikasi.</li>
              <li>Memperoleh informasi dan penjelasan mengenai tata cara penggunaan tanda SNI dan tanda kesesuaian.</li>
              <li>Mengajukan banding atau keluhan terkapat keputusan sertifikasi dan penggunaan tanda kesesuaian.</li>
              <li>Referensi ke lisensi, sertifikat, dan tanda kesesuaian dapat digunakan di media lain seperti kepala surat, kartu nama, kendaraan perusahaan, materi promosi, situs web, dan media sosial.</li>
            </ul>`,
          },
        },
        {
          key: 'kewajiban',
          fallback: {
            judul: 'Kewajiban Klien',
            deskripsi: `<ul>
              <li>Menjaga dan mengendalikan kesesuaian barang agar sesuai dengan karakteristik produk yang telah disertifikasi.</li>
              <li>Membubuhkan tanda SNI hanya pada barang yang tercantum dalam dokumen persetujuan penggunaan tanda SNI.</li>
              <li>Menginformasikan kepada LSPro BBPI apabila terjadi perubahan terhadap persyaratan acuan, dokumen sertifikat, barang, atau identitas perusahaan.</li>
              <li>Melakukan tindakan perbaikan apabila ditemukan ketidakmampuan dalam menjaga kesesuaian produk terhadap persyaratan acuan.</li>
              <li>Tidak mencantumkan tanda SNI pada barang jika SPPT SNI dibekukan, dicabut, atau berakhir masa berlakunya.</li>
              <li>Hanya menampilkan lisensi dan tanda kesesuaian yang dikeluarkan oleh BSN pada produk atau kemasan produk sesuai ketentuan.</li>
              <li>Mematuhi Surat Perjanjian Penggunaan Lisensi, Sertifikat, dan Tanda Kesesuaian (FR 4.1-2).</li>
            </ul>`,
          },
        },
      ]}
    />
  )
}
