import ContentPage from '../components/ui/ContentPage'

export default function VisiMisi() {
  return (
    <ContentPage
      pageKey="visi-misi"
      title="Visi & Misi"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Visi & Misi' }]}
      description="Visi, misi, dan nilai-nilai LSPro BBPI dalam menyelenggarakan sertifikasi produk perikanan."
      sections={[
        {
          key: 'visi',
          fallback: {
            judul: 'Visi',
            deskripsi: `<p class="text-xl leading-relaxed">Menjadi lembaga sertifikasi produk perikanan yang <strong>terpercaya, kompeten, dan berintegritas</strong> di tingkat nasional maupun internasional, guna mendukung peningkatan daya saing produk perikanan Indonesia.</p>`,
          },
        },
        {
          key: 'misi',
          fallback: {
            judul: 'Misi',
            deskripsi: `<ul>
              <li>Menyelenggarakan sertifikasi produk perikanan secara profesional, objektif, dan transparan berdasarkan SNI ISO/IEC 17065:2012.</li>
              <li>Meningkatkan mutu dan keselamatan produk perikanan melalui penilaian kesesuaian yang terpercaya.</li>
              <li>Memberikan pelayanan prima kepada seluruh pemangku kepentingan dengan menjaga ketidakberpihakan dan kerahasiaan.</li>
              <li>Mengembangkan kompetensi sumber daya manusia di bidang sertifikasi produk perikanan secara berkelanjutan.</li>
              <li>Mendukung kebijakan pemerintah dalam peningkatan ekspor, pengendalian impor, dan perlindungan konsumen.</li>
            </ul>`,
          },
        },
        {
          key: 'nilai',
          fallback: {
            judul: 'Nilai-nilai',
            deskripsi: `<p>Nilai-nilai pelayanan LSPro BBPI tercermin dalam semangat <strong>KAMIDJPT</strong>:</p>
            <ul>
              <li><strong>K</strong>erja sama</li>
              <li><strong>A</strong>kuntabel</li>
              <li><strong>M</strong>elayani</li>
              <li><strong>I</strong>novatif</li>
              <li><strong>D</strong>isiplin</li>
              <li><strong>J</strong>ujur</li>
              <li><strong>P</strong>ionir</li>
              <li><strong>T</strong>anggung jawab</li>
            </ul>`,
          },
        },
      ]}
    />
  )
}
