import ContentPage from '../../components/ui/ContentPage'

export default function SumberPendanaan() {
  return (
    <ContentPage
      pageKey="sumber-pendanaan"
      title="Sumber Pendanaan"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Informasi' }, { label: 'Sumber Pendanaan' }]}
      description="Informasi mengenai sumber pendanaan, pengelolaan keuangan, dan pertanggung gugatan LSPro BBPI."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Pengelolaan Keuangan LSPro BBPI',
            deskripsi: `<p>Prosedur Pertanggung Gugat dan Keuangan mengatur metode dan tanggung jawab pengelolaan keuangan Lembaga Sertifikasi Produk Balai Besar Penangkapan Ikan (LSPro BBPI).</p>
            <p>Prosedur ini mencakup pengendalian pemasukan, pengendalian pengeluaran, pengawasan aliran keuangan, dan pengaturan tentang tanggung gugat.</p>`,
          },
        },
        {
          key: 'modal',
          fallback: {
            judul: 'Sumber Dana',
            deskripsi: `<p>Sumber dana LSPro BBPI berasal dari salah satu atau gabungan sumber berikut:</p>
            <ul>
              <li><strong>Anggaran Pendapatan dan Belanja Negara (APBN)</strong></li>
              <li><strong>Anggaran klien</strong> dalam rangka proses sertifikasi</li>
            </ul>
            <p>Besaran biaya sertifikasi dan biaya pengujian dalam rangka sertifikasi mengacu pada PP No. 85 Tahun 2021 tentang Jenis dan Tarif Penerimaan Negara Bukan Pajak (PNBP) yang berlaku pada Kementerian Kelautan dan Perikanan.</p>`,
          },
        },
        {
          key: 'pendapatan',
          fallback: {
            judul: 'Pengendalian Pemasukan',
            deskripsi: `<ul>
              <li>Sumber dana berasal dari APBN dan/atau anggaran klien.</li>
              <li>Biaya sertifikasi dan biaya pengujian ditetapkan sesuai regulasi yang berlaku.</li>
              <li>Biaya alihdaya penggunaan laboratorium subkontrak mengacu pada aturan yang ditetapkan oleh laboratorium subkontrak.</li>
              <li>Bagian keuangan balai bertanggung jawab untuk mengelola dana yang diterima LSPro BBPI.</li>
            </ul>`,
          },
        },
        {
          key: 'pengelolaan',
          fallback: {
            judul: 'Pengendalian Pengeluaran',
            deskripsi: `<ul>
              <li>Seluruh aliran dana operasional dan non-operasional LSPro yang terkait dengan sertifikasi mengikuti ketentuan yang berlaku.</li>
              <li>Biaya yang ditimbulkan dalam proses sertifikasi dibebankan pada APBN selama anggaran tersedia.</li>
            </ul>`,
          },
        },
        {
          key: 'pengawasan',
          fallback: {
            judul: 'Pengawasan Aliran Keuangan',
            deskripsi: `<ul>
              <li>LSPro menerima status aliran uang setelah kegiatan sertifikasi selesai.</li>
              <li>Aliran keuangan LSPro untuk proses sertifikasi pada bulan sebelumnya dilaporkan statusnya paling lambat setiap akhir bulan berikutnya.</li>
              <li>Laporan pengawasan aliran keuangan LSPro secara resmi dikeluarkan setiap 1 (satu) tahun.</li>
            </ul>`,
          },
        },
      ]}
    />
  )
}
