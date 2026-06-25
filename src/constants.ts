import type { NavItem, AdminPageDef } from './types'

export const SITE_NAME = 'LSPro BBPI'
export const SITE_TAGLINE = 'Balai Besar Penangkapan Ikan'
export const SITE_DESCRIPTION = 'Lembaga Sertifikasi Produk BBPI - Balai Besar Penangkapan Ikan, Kementerian Kelautan dan Perikanan Republik Indonesia.'

export const CONTACT = {
  address: 'Jl. Yos Sudarso No. 1, Kelurahan Kalibaru Barat, Kecamatan Tanjung Emas, Kota Semarang, Provinsi Jawa Tengah 50175',
  shortAddress: 'Jl. Yos Sudarso, Kalibaru Barat, Tanjung Emas, Semarang 50175',
  phone: '',
  whatsapp: '6285934708829',
  email: 'lspro.bbpi@gmail.com',
  facebook: 'https://facebook.com/lsprobbpi',
  instagram: 'https://instagram.com/lspro_bbpi',
  youtube: 'https://youtube.com/@lsprobbpi',
  linkedin: 'https://linkedin.com/company/lspro-bbpi',
  mapsUrl: 'https://maps.google.com/?q=Balai+Besar+Penangkapan+Ikan+Semarang',
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', path: '/' },
  {
    label: 'Profil',
    children: [
      { label: 'Tentang Kami', path: '/tentang-kami' },
      { label: 'Visi & Misi', path: '/visi-misi' },
      { label: 'Struktur Organisasi', path: '/struktur-organisasi' },
      { label: 'Pemeliharaan / Perluasan', path: '/informasi/pemeliharaan' },
      { label: 'Keluhan & Banding', path: '/informasi/keluhan-banding' },
      { label: 'Hak dan Kewajiban', path: '/informasi/hak-kewajiban' },
      { label: 'Sumber Pendanaan', path: '/informasi/sumber-pendanaan' },
      { label: 'Biaya Sertifikasi', path: '/informasi/biaya-sertifikasi' },
    ],
  },
  {
    label: 'Layanan Kami',
    children: [
      { label: 'Skema Sertifikasi', path: '/layanan/sertifikasi' },
    ],
  },
  { label: 'Ruang Lingkup', path: '/ruang-lingkup' },
  { label: 'Download Formulir', path: '/formulir/download' },
  { label: 'Kontak', path: '/kontak' },
]

export const FOOTER_LINKS = {
  profil: [
    { label: 'Tentang Kami', path: '/tentang-kami' },
    { label: 'Visi & Misi', path: '/visi-misi' },
    { label: 'Struktur Organisasi', path: '/struktur-organisasi' },
  ],
  informasi: [
    { label: 'Pemeliharaan / Perluasan', path: '/informasi/pemeliharaan' },
    { label: 'Keluhan & Banding', path: '/informasi/keluhan-banding' },
    { label: 'Hak dan Kewajiban', path: '/informasi/hak-kewajiban' },
    { label: 'Sumber Pendanaan', path: '/informasi/sumber-pendanaan' },
    { label: 'Biaya Sertifikasi', path: '/informasi/biaya-sertifikasi' },
  ],
  layanan: [
    { label: 'Skema Sertifikasi', path: '/layanan/sertifikasi' },
    { label: 'Ruang Lingkup', path: '/ruang-lingkup' },
  ],
  formulir: [
    { label: 'Download Formulir', path: '/formulir/download' },
  ],
}

export const ADMIN_PAGES: AdminPageDef[] = [
  { name: 'beranda', label: 'Beranda', sections: ['hero', 'tentang'] },
  { name: 'tentang-kami', label: 'Tentang Kami', sections: ['hero'] },
  { name: 'visi-misi', label: 'Visi & Misi', sections: ['visi', 'misi'] },
  { name: 'struktur-organisasi', label: 'Struktur Organisasi', sections: ['hero'] },
  { name: 'pemeliharaan', label: 'Pemeliharaan / Perluasan', sections: ['hero', 'penghentian', 'pengurangan', 'perluasan', 'pembekuan', 'pencabutan', 'transfer', 'perubahan'] },
  { name: 'keluhan-banding', label: 'Keluhan & Banding', sections: ['hero', 'prosedur'] },
  { name: 'hak-kewajiban', label: 'Hak dan Kewajiban', sections: ['hero', 'hak', 'kewajiban'] },
  { name: 'sumber-pendanaan', label: 'Sumber Pendanaan', sections: ['hero', 'modal', 'pendapatan', 'pengelolaan', 'pengawasan'] },
  { name: 'biaya-sertifikasi', label: 'Biaya Sertifikasi', sections: ['hero', 'biaya'] },
  { name: 'sertifikasi', label: 'Skema Sertifikasi', sections: ['hero', 'skema', 'alur', 'produk', 'dokumen'] },
  { name: 'ruang-lingkup', label: 'Ruang Lingkup', sections: ['hero'] },
  { name: 'kontak', label: 'Kontak', sections: ['hero', 'alamat', 'telepon', 'whatsapp', 'email', 'maps_url', 'facebook', 'instagram', 'youtube', 'linkedin'] },
]
