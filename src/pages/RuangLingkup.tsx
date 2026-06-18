import ContentPage from '../components/ui/ContentPage'

export default function RuangLingkup() {
  return (
    <ContentPage
      pageKey="ruang-lingkup"
      title="Ruang Lingkup"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Ruang Lingkup' }]}
      description="Lingkup sertifikasi terakreditasi LSPro BBPI untuk produk perikanan."
      sections={[
        {
          key: 'hero',
          fallback: {
            judul: 'Ruang Lingkup Sertifikasi LSPro BBPI',
            deskripsi: `<p>LSPro BBPI menyelenggarakan sertifikasi produk perikanan sesuai dengan ruang lingkup yang telah ditetapkan. Berikut adalah daftar standar dan produk yang masuk dalam lingkup sertifikasi LSPro BBPI.</p>`,
          },
        },
        {
          key: 'produk',
          fallback: {
            judul: 'Daftar Produk dan Standar',
            deskripsi: `<table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-primary text-white">
                  <th class="p-3">No</th>
                  <th class="p-3">Standar (SNI)</th>
                  <th class="p-3">Produk</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-3">1</td>
                  <td class="p-3">SNI 8577:2024</td>
                  <td class="p-3">Alat Penangkapan Ikan – Benang Poliamida (PA) Monofilamen</td>
                </tr>
                <tr class="border-b bg-neutral-50">
                  <td class="p-3">2</td>
                  <td class="p-3">SNI 8795:2019</td>
                  <td class="p-3">Alat Penangkapan Ikan – Jaring Poliamida Monofilamen</td>
                </tr>
                <tr class="border-b">
                  <td class="p-3">3</td>
                  <td class="p-3">SNI 8796:2019</td>
                  <td class="p-3">Alat Penangkapan Ikan – Benang Poliamida Multifilamen</td>
                </tr>
                <tr class="border-b bg-neutral-50">
                  <td class="p-3">4</td>
                  <td class="p-3">SNI 8793:2019</td>
                  <td class="p-3">Kapal Perikanan: Kapal ukuran 3 GT berbahan Fiberglass Reinforced Plastic (FRP)</td>
                </tr>
                <tr class="border-b">
                  <td class="p-3">5</td>
                  <td class="p-3">SNI 8953:2021</td>
                  <td class="p-3">Alat Penangkapan Ikan – Benang Polietilena (PE) Multifilamen</td>
                </tr>
                <tr class="border-b bg-neutral-50">
                  <td class="p-3">6</td>
                  <td class="p-3">SNI 8954:2021</td>
                  <td class="p-3">Alat Penangkapan Ikan – Jaring Poliamida (PA) Multifilamen</td>
                </tr>
                <tr>
                  <td class="p-3">7</td>
                  <td class="p-3">SNI 8955:2021</td>
                  <td class="p-3">Alat Penangkapan Ikan – Jaring Poliamida (PA) Multimonofilamen</td>
                </tr>
              </tbody>
            </table>`,
          },
        },
      ]}
    />
  )
}
