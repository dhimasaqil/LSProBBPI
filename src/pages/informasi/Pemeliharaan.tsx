import ContentPage from '../../components/ui/ContentPage'

export default function Pemeliharaan() {
  return (
    <ContentPage
      pageKey="pemeliharaan"
      title="Pemeliharaan / Perluasan"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Informasi' }, { label: 'Pemeliharaan / Perluasan' }]}
      description="Ketentuan mengenai pengurangan, penghentian, pembekuan, pencabutan, dan perluasan sertifikasi produk LSPro BBPI."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Informasi Pemeliharaan dan Perluasan Sertifikasi',
            deskripsi: `<p>Prosedur ini mengatur penggunaan dan pemantauan terhadap penghentian, pengurangan, pembekuan, atau pencabutan sertifikasi yang dikeluarkan oleh Lembaga Sertifikasi Produk Balai Besar Penangkapan Ikan (LSPro BBPI).</p>
            <p>Prosedur ini berlaku untuk memperluas atau mengurangi ruang lingkup, menangguhkan atau mencabut, serta memberlakukan kembali penggunaan sertifikat produk SNI sesuai SNI ISO/IEC 17065:2012.</p>`,
          },
        },
        {
          key: 'pengurangan',
          fallback: {
            judul: 'Pengurangan Ruang Lingkup Sertifikasi',
            deskripsi: `<p>Pengurangan ruang lingkup sertifikasi dapat terjadi atas dasar:</p>
            <ul>
              <li><strong>Permohonan klien:</strong> Klien mengajukan permohonan pengurangan ruang lingkup sertifikat secara tertulis. Manajer Administrasi merekomendasikan penerbitan sertifikat kesesuaian baru dengan masa berlaku mengikuti sertifikat awal.</li>
              <li><strong>Ketidakmampuan tindakan korektif:</strong> Apabila klien tidak mampu melakukan tindakan korektif untuk beberapa ruang lingkup, ruang lingkup yang bermasalah dikurangi.</li>
            </ul>`,
          },
        },
        {
          key: 'penghentian',
          fallback: {
            judul: 'Penghentian Keberlanjutan Sertifikasi',
            deskripsi: `<p>Penghentian keberlanjutan sertifikasi dilakukan sesuai ketentuan LSPro BBPI melalui peningkatan frekuensi surveilan. Apabila klien meminta sertifikasi dihentikan, LSPro BBPI mengambil tindakan sesuai skema sertifikasi dan memastikan dokumentasi formal, informasi publik, serta kewenangan penggunaan tanda sertifikasi dicabut.</p>`,
          },
        },
        {
          key: 'pembekuan',
          fallback: {
            judul: 'Pembekuan Sertifikasi',
            deskripsi: `<p>Pembekuan sertifikasi dapat dilakukan apabila:</p>
            <ul>
              <li>Klien tidak mengikuti aturan penggunaan tanda sertifikasi.</li>
              <li>Terjadi ketidaksesuaian dalam proses produksi yang menghasilkan produk cacat yang disertifikasi.</li>
            </ul>
            <p>Klien diberikan kesempatan untuk memperbaiki ketidaksesuaian dalam batas waktu yang ditentukan. Selama pembekuan, klien diinformasikan untuk tidak menggunakan Tanda Sertifikasi.</p>`,
          },
        },
        {
          key: 'pencabutan',
          fallback: {
            judul: 'Pencabutan Sertifikasi',
            deskripsi: `<p>Pencabutan sertifikasi dilakukan apabila klien:</p>
            <ul>
              <li>Tidak dapat memperbaiki ketidaksesuaian atau pelanggaran dalam batas waktu yang disepakati.</li>
              <li>Tidak merespon surat pemberitahuan audit surveilan sesuai jadwal yang berlaku.</li>
              <li>Tidak dapat menyelesaikan ketidaksesuaian "major" dalam jangka waktu maksimum yang ditentukan.</li>
            </ul>
            <p>Keputusan pencabutan direview oleh manajemen puncak dan disampaikan kepada klien melalui surat pencabutan. Nama klien dihapus dari Direktori Klien LSPro BBPI.</p>`,
          },
        },
        {
          key: 'perluasan',
          fallback: {
            judul: 'Perluasan Ruang Lingkup Sertifikasi',
            deskripsi: `<p>Perluasan ruang lingkup sertifikasi dapat diajukan oleh klien secara tertulis apabila terdapat penambahan jenis produk atau standar yang ingin disertifikasi. LSPro BBPI akan melakukan evaluasi, audit lapangan, dan pengujian sesuai ketentuan sebelum menerbitkan sertifikat dengan ruang lingkup yang diperluas.</p>`,
          },
        },
        {
          key: 'transfer',
          fallback: {
            judul: 'Transfer Sertifikat',
            deskripsi: `<p>Transfer sertifikat dapat dilakukan apabila terjadi perubahan kepemilikan perusahaan atau merek yang diajukan secara tertulis. LSPro BBPI akan mengevaluasi dokumen pendukung dan kondisi produksi sebelum menyetujui transfer sertifikat.</p>`,
          },
        },
        {
          key: 'perubahan',
          fallback: {
            judul: 'Perubahan yang Mempengaruhi Persyaratan',
            deskripsi: `<p>Apabila terjadi perubahan regulasi, standar produk, atau persyaratan sertifikasi yang berlaku, LSPro BBPI akan menginformasikan kepada klien untuk menyesuaikan proses produksi dan dokumen yang diperlukan sesuai persyaratan baru.</p>`,
          },
        },
      ]}
    />
  )
}
