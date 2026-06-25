import ContentPage from '../components/ui/ContentPage'

export default function TentangKami() {
  return (
    <ContentPage
      pageKey="tentang-kami"
      title="Tentang Kami"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Tentang Kami' }]}
      description="LSPro BBPI adalah lembaga sertifikasi produk perikanan yang berkomitmen terhadap kualitas dan integritas."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Membangun Kepercayaan Melalui Sertifikasi Berkualitas',
            deskripsi: `<p><strong>LSPro BBPI (Lembaga Sertifikasi Produk Balai Besar Penangkapan Ikan)</strong> adalah lembaga di lingkungan Direktorat Jenderal Perikanan Tangkap, Kementerian Kelautan dan Perikanan, yang melakukan proses sertifikasi produk dengan memberikan kepercayaan kepada seluruh pihak berkepentingan bahwa produk memenuhi persyaratan yang ditentukan.</p>
            <p>LSPro BBPI bekerja secara profesional dan dapat membantu meningkatkan mutu produk melalui pengujian mutu yang terpercaya dalam rangka peningkatan ekspor, pengendalian impor, dan memberikan perlindungan terhadap konsumen.</p>
            <p>Dalam melaksanakan tugasnya, LSPro BBPI secara teknis administratif bertanggung jawab kepada Kepala Balai Besar Penangkapan Ikan selaku Manajer Eksekutif.</p>`,
          },
        },
        {
          key: 'kebijakan',
          fallback: {
            judul: 'Kebijakan dan Komitmen Pimpinan',
            deskripsi: `<ul>
              <li>LSPro BBPI sebagai lembaga sertifikasi produk melaksanakan kegiatan sertifikasi produk berdasarkan <strong>SNI ISO/IEC 17065:2012</strong> tentang Penilaian Kesesuaian – Persyaratan untuk Lembaga Sertifikasi Produk, Proses, dan Jasa.</li>
              <li>Manajemen LSPro BBPI menjamin konsistensi dalam mengoperasikan sertifikasi berdasarkan SNI ISO/IEC 17065:2012 dengan menjaga ketidakberpihakan dan independensi terhadap kegiatan bimbingan teknis maupun pendampingan.</li>
              <li>LSPro BBPI menjamin bahwa persyaratan SNI ISO/IEC 17065:2012 dan Panduan Mutu serta dokumen pendukungnya dimengerti, dilaksanakan, dan dipelihara oleh semua personil tetap maupun personil subkontrak.</li>
              <li>Dalam melaksanakan sertifikasi, LSPro BBPI menggunakan standar produk sesuai SNI dan regulasi yang diakui oleh pemangku kepentingan dan dilaksanakan dengan prinsip efektivitas dan efisiensi.</li>
            </ul>`,
          },
        },
        {
          key: 'nilai',
          fallback: {
            judul: 'Nilai-nilai Pelayanan',
            deskripsi: `<p>Nilai-nilai pelayanan LSPro BBPI adalah:</p>
            <ul>
              <li><strong>K</strong>erja sama</li>
              <li><strong>A</strong>kuntabel</li>
              <li><strong>M</strong>elayani</li>
              <li><strong>I</strong>novatif</li>
              <li><strong>D</strong>isiplin</li>
              <li><strong>J</strong>ujur</li>
              <li><strong>P</strong>ionir</li>
              <li><strong>T</strong>anggung jawab</li>
            </ul>
            <p>Sasaran mutu sertifikasi produk adalah memberikan komitmen terhadap pelayanan sertifikasi produk dengan menjaga kerahasiaan dan ketidakberpihakan, dengan kriteria waktu penerbitan sertifikat kesesuaian produk paling lambat 5 (lima) hari kerja setelah hasil rapat evaluasi dan berita acara pengambilan keputusan.</p>`,
          },
        },
        {
          key: 'lokasi',
          fallback: {
            judul: 'Lokasi',
            deskripsi: `<p>LSPro BBPI berlokasi di Jalan Yos Sudarso, Kelurahan Kalibaru Barat, Kecamatan Tanjung Emas, Kota Semarang, Provinsi Jawa Tengah, kode pos 50175.</p>
            <ul>
              <li>WhatsApp: 0859 3470 8829</li>
              <li>Email: lspro.bbpi@gmail.com</li>
              <li>Instagram: @lspro_bbpi</li>
            </ul>`,
          },
        },
      ]}
    />
  )
}
