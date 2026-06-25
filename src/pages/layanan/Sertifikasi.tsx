import ContentPage from '../../components/ui/ContentPage'

export default function Sertifikasi() {
  return (
    <ContentPage
      pageKey="sertifikasi"
      title="Skema Sertifikasi"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Layanan Kami' }, { label: 'Skema Sertifikasi' }]}
      description="Skema sertifikasi Tipe 1b/3 LSPro BBPI untuk benang dan jaring alat penangkapan ikan."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Skema Sertifikasi LSPro BBPI',
            deskripsi: `<p>LSPro BBPI menyelenggarakan sertifikasi produk Benang dan Jaring untuk Alat Penangkapan Ikan berdasarkan Standar Nasional Indonesia (SNI) yang tercantum dalam ruang lingkup sertifikasi.</p>
            <p>Penilaian kesesuaian produk dilakukan dengan kegiatan sertifikasi oleh LSPro BBPI yang telah diakreditasi KAN berdasarkan SNI ISO/IEC 17065:2012.</p>`,
          },
        },
        {
          key: 'skema',
          fallback: {
            judul: 'Tipe 1b / Tipe 3',
            deskripsi: `<p>Skema sertifikasi produk yang diterapkan LSPro BBPI adalah <strong>Skema Sertifikasi Produk Tipe 1b/3</strong>:</p>
            <ul>
              <li><strong>Tipe 1b:</strong> Sertifikasi berdasarkan pengujian sampel produk oleh laboratorium yang kompeten.</li>
              <li><strong>Tipe 3:</strong> Sertifikasi meliputi evaluasi dokumen mutu, audit lapangan, pengambilan contoh, dan pengujian contoh di laboratorium.</li>
            </ul>
            <p>Kombinasi skema ini memastikan produk yang disertifikasi benar-benar memenuhi persyaratan SNI secara konsisten.</p>`,
          },
        },
        {
          key: 'alur',
          fallback: {
            judul: 'Alur Proses Sertifikasi',
            deskripsi: `<ol>
              <li><strong>Pengajuan Permohonan:</strong> Pemohon mengisi Surat Permohonan Sertifikasi (FR.7.2-1), Pernyataan Kesesuaian (FR.7.2-2), Pernyataan Persetujuan Pemohon (FR.7.2-3), dan Daftar Isian Pemohon Sertifikasi (FR.7.2-4).</li>
              <li><strong>Seleksi:</strong> Tinjauan kelengkapan permohonan, penandatanganan perjanjian sertifikasi, dan penyusunan rencana evaluasi.</li>
              <li><strong>Evaluasi Tahap I:</strong> Tinjauan kecukupan dokumen mutu terhadap persyaratan SNI.</li>
              <li><strong>Evaluasi Tahap II:</strong> Audit lapangan dan pengambilan contoh produk.</li>
              <li><strong>Determinasi:</strong> Pengujian contoh di laboratorium yang terakreditasi.</li>
              <li><strong>Tinjauan dan Keputusan:</strong> Rapat tim pengambil keputusan untuk menetapkan penerbitan sertifikat.</li>
              <li><strong>Penerbitan Sertifikat:</strong> Sertifikat kesesuaian berlaku selama 4 (empat) tahun.</li>
            </ol>
            <p>Total waktu memproses Sertifikat Kesesuaian adalah 26–30 hari kerja (tidak termasuk waktu pengujian contoh oleh laboratorium dan penerbitan SPPT SNI oleh BSN).</p>`,
          },
        },
        {
          key: 'produk',
          fallback: {
            judul: 'Produk yang Dapat Disertifikasi',
            deskripsi: `<p>Produk dalam ruang lingkup sertifikasi LSPro BBPI meliputi:</p>
            <ul>
              <li>Benang Poliamida (PA) Monofilamen (SNI 8577:2024)</li>
              <li>Jaring Poliamida Monofilamen (SNI 8795:2025)</li>
              <li>Benang Poliamida Multifilamen (SNI 8796:2019)</li>
              <li>Benang Polietilena (PE) Multifilamen (SNI 8953:2021)</li>
              <li>Jaring Poliamida (PA) Multifilamen (SNI 8954:2021)</li>
              <li>Jaring Poliamida (PA) Multimonofilamen (SNI 8955:2021)</li>
              <li>Kapal Perikanan ukuran 3 GT berbahan Fiberglass Reinforced Plastic (FRP) (SNI 8793:2019)</li>
            </ul>`,
          },
        },
        {
          key: 'dokumen',
          fallback: {
            judul: 'Dokumen Persyaratan Permohonan',
            deskripsi: `<p>Persyaratan dokumen permohonan sertifikasi meliputi:</p>
            <ul>
              <li>Surat Permohonan Sertifikasi (Formulir F.7.2-1)</li>
              <li>Pernyataan Kesesuaian (Formulir F.7.2-2) atau fotokopi Sertifikat Manajemen Mutu (jika sudah ada)</li>
              <li>Pernyataan Persetujuan Pemohon (Formulir F.7.2-3)</li>
              <li>Daftar Isian Pemohon Sertifikasi (Formulir F.7.2-4)</li>
              <li>Akta pendirian perusahaan</li>
              <li>Izin industri atau izin usaha</li>
              <li>Surat izin merek dagang atau surat pendaftaran merek dagang</li>
              <li>Dokumen sistem manajemen mutu</li>
            </ul>
            <p>Seluruh formulir dapat diunduh melalui halaman <a href="/formulir/download">Download Formulir</a>.</p>`,
          },
        },
      ]}
    />
  )
}
