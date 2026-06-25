---

### 3. Project Planning Document

```markdown
# Project Planning: Website Profil LSPro BBPI

## 1. Timeline & Milestones (Estimasi 3-4 Minggu)
Proyek ini dibagi menjadi 5 fase utama untuk memastikan pengembangan berjalan terstruktur.

### Fase 1: Setup & Inisialisasi (Hari 1-2)
*   Inisialisasi project React Vite + TailwindCSS.
*   Install dependensi utama (React Router, Framer Motion, Supabase JS, Lucide React).
*   Setup akun & project Supabase. Eksekusi DDL SQL untuk membuat tabel.
*   Konfigurasi Supabase Storage bucket untuk gambar dan PDF.
*   Deploy awal ke Vercel untuk memastikan CI/CD berjalan.

### Fase 2: Pengembangan UI Publik - Bagian Statis (Hari 3-7)
*   Pembuatan Layout dasar (PublicLayout, Navbar, Footer, FloatingWA Button).
*   Halaman Beranda (Hero, Keunggulan, Statistik, CTA).
*   Halaman Tentang & Struktur Menu Profil.
*   Halaman Alur Sertifikasi & Kontak.
*   Halaman Permohonan (Embed Google Form).
*   Implementasi dummy data untuk memastikan UI sesuai referensi Dribbble.

### Fase 3: Pengembangan Admin Dashboard (CMS) (Hari 8-14)
*   Setup Supabase Auth & AuthContext (Proteksi route `/admin`).
*   Admin Layout (Sidebar, Header, Logout).
*   Implementasi Tiptap Rich Text Editor.
*   Fitur CRUD Berita & Pengumuman (termasuk upload gambar ke Storage).
*   Fitur CRUD Skema Sertifikasi.
*   Fitur CRUD Konten Profil Dinamis (untuk poin a, b, c, d).
*   Fitur Upload Dokumen Unduhan & Galeri.
*   Haloman view Pesan & Pengaduan.

### Fase 4: Integrasi Data & Penyempurnaan (Hari 15-18)
*   Menghubungkan halaman publik untuk mengambil data real-time dari Supabase (menggantikan dummy data).
*   Implementasi pagination pada Berita & Galeri.
*   Penambahan animasi Framer Motion (scroll reveal, hover effects).
*   Optimalisasi responsivitas mobile & tablet.
*   Setup Row Level Security (RLS) di Supabase agar data admin aman.

### Fase 5: Testing & Deployment (Hari 19-21)
*   Uji fungsionalitas (Functional Testing): Coba alur pengajuan, kirim pengaduan, login admin, buat berita baru.
*   Cek konsistensi UI di berbagai browser (Chrome, Safari, Firefox).
*   Final deployment ke Vercel (Production).
*   Serah terima dokumen dan guide singkat penggunaan CMS kepada admin LSPro BBPI.

## 2. Tech Stack & Tools yang Digunakan
*   **Version Control:** Git & GitHub.
*   **Code Editor:** VS Code.
*   **Design Reference:** Figma / Dribbble (UzOman Corporate).
*   **Database Manager:** Supabase Dashboard.
*   **Deployment Platform:** Vercel.

## 3. Asumsi & Catatan
*   Admin LSPro BBPI memiliki/menyiapkan akun Google Form untuk halaman permohonan.
*   Admin menyediakan nomor WhatsApp aktif untuk tombol "Hubungi Saya".
*   Semua teks awal (Sejarah, Prosedur ISO, dll) akan diisi dengan *placeholder* dan dapat diubah langsung oleh admin melalui CMS setelah website live.