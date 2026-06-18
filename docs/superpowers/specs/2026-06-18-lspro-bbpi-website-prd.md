# PRD: Website LSPro BBPI (Balai Besar Penangkapan Ikan)

> **Tanggal:** 18 Juni 2026  
> **Status:** Approved  
> **Metodologi:** Research – Plan – Implementation

---

## 1. Project Overview

### 1.1 Tujuan
Membuat website corporate profile untuk **LSPro Balai Besar Penangkapan Ikan (BBPI)** dengan struktur mengacu pada [LSPro IGS](https://lsigs.com/v2/), tampilan modern, serta dilengkapi Admin CMS untuk mengelola seluruh konten website tanpa perlu pemahaman coding.

### 1.2 Tech Stack
| Komponen | Teknologi |
|----------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| Backend | Supabase (Auth, Database, Storage) |
| CMS | Supabase (`site_content` table) |
| Deployment | Vercel |
| Icons | Lucide React |
| Forms | Google Forms (embed) |
| File Storage | Google Drive (direct download) |

### 1.3 Scope & Exclusions
**Included:**
- 17 halaman publik
- Admin CMS dengan form fields terstruktur
- Download formulir via Google Drive links
- Form pendaftaran & kuesioner via Google Forms embed
- Supabase Auth untuk 1 admin

**Excluded:**
- Halaman Berita & Artikel
- Halaman Pihak Berkepentingan
- Halaman Laboratorium Uji
- Halaman Klient & Partner
- Multi-bahasa (Bahasa Indonesia only)

---

## 2. Struktur Halaman

### 2.1 Halaman Publik

| # | Path | Nama Halaman | Konten |
|---|------|-------------|--------|
| 1 | `/` | Beranda | Hero section, ringkasan tentang, ringkasan layanan, CTA kontak |
| 2 | `/tentang-kami` | Tentang Kami | Deskripsi LSPro BBPI, didukung tenaga ahli |
| 3 | `/visi-misi` | Visi & Misi | Visi dan misi BBPI |
| 4 | `/struktur-organisasi` | Struktur Organisasi | Bagan struktur organisasi (gambar) |
| 5 | `/informasi/pemeliharaan` | Pemeliharaan / Perluasan | Prosedur: penghentian, pengurangan, perluasan, pembekuan, pencabutan, transfer, perubahan persyaratan sertifikasi |
| 6 | `/informasi/keluhan-banding` | Keluhan, Perselisihan, dan Banding | 15 langkah prosedur penanganan keluhan & banding |
| 7 | `/informasi/hak-kewajiban` | Hak dan Kewajiban | Hak klien (7 poin) + Kewajiban klien (15 poin) |
| 8 | `/informasi/sumber-pendanaan` | Sumber Pendanaan | Modal disetor, pendapatan jasa, pengelolaan, pengawasan dana |
| 9 | `/informasi/biaya-sertifikasi` | Biaya Sertifikasi | Rincian biaya berdasarkan skema, lokasi, HOK, faktur |
| 10 | `/layanan/sertifikasi-tipe-1` | Alur Sertifikasi Tipe 1 | Diagram dan prosedur alur sertifikasi tipe 1 |
| 11 | `/layanan/sertifikasi-tipe-5` | Alur Sertifikasi Tipe 5 | Diagram dan prosedur alur sertifikasi tipe 5 |
| 12 | `/ruang-lingkup` | Ruang Lingkup | Lingkup sertifikasi terakreditasi BBPI |
| 13 | `/formulir/download` | Download Formulir Kosong | Tabel 16+ kategori formulir dengan tombol download via Google Drive |
| 14 | `/formulir/pendaftaran` | Formulir Pendaftaran | Embed Google Form untuk pengajuan sertifikasi |
| 15 | `/kuesioner` | Kuesioner Kepuasan Pelanggan | Embed Google Form untuk kuesioner |
| 16 | `/kontak` | Kontak Kami | Alamat, telepon, WhatsApp, email, Google Maps embed, media sosial |

### 2.2 Halaman Admin

| # | Path | Nama | Fungsi |
|---|------|------|--------|
| 17 | `/admin` | Login | Supabase Auth email/password |
| 18 | `/admin/dashboard` | Dashboard | Ringkasan halaman, quick links |
| 19 | `/admin/halaman/:page` | Content Editor | Form fields per section per halaman |
| 20 | `/admin/form-download` | Form Download Editor | Kelola link Google Drive per form |
| 21 | `/admin/google-forms` | Google Forms Editor | Kelola Google Form ID untuk pendaftaran & kuesioner |
| 22 | `/admin/settings` | Pengaturan | Ganti password admin |

---

## 3. Design System

### 3.1 Color Palette (Maritime Corporate)
| Role | Hex | Deskripsi |
|------|-----|-----------|
| Primary | `#0a3d62` | Navy Blue |
| Primary Light | `#1e5f8a` | Navy Blue hover |
| Accent | `#e67e22` | Anchor Orange |
| Accent Light | `#f39c12` | Orange hover |
| Neutral 50 | `#f8fafc` | Background light |
| Neutral 100 | `#f1f5f9` | Card background |
| Neutral 500 | `#64748b` | Text secondary |
| Neutral 800 | `#1e293b` | Text primary |
| Neutral 900 | `#0f172a` | Text heading |

### 3.2 Typography
- **Font:** Inter (Google Fonts)
- **Weight:** Regular 400, Medium 500, SemiBold 600, Bold 700
- **Scale:** 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl), 30px (3xl), 36px (4xl)

### 3.3 Spacing
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

### 3.4 Breakpoints (Tailwind default)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 4. Database Schema (Supabase)

### 4.1 `site_content` — Konten halaman dinamis

```sql
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,              -- e.g. 'tentang-kami', 'visi-misi'
  section TEXT NOT NULL,           -- e.g. 'hero', 'visi', 'misi', 'deskripsi'
  content JSONB NOT NULL DEFAULT '{}',  -- { "judul": "...", "deskripsi": "...", "gambar_url": "..." }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (page, section)
);
```

**Contoh data `visi-misi`:**

| page | section | content |
|------|---------|---------|
| `visi-misi` | `visi` | `{"judul": "Visi", "deskripsi": "Menjadi lembaga sertifikasi..."}` |
| `visi-misi` | `misi` | `{"judul": "Misi", "deskripsi": "1. Mengembangkan strategi...\n2. Menghasilkan sertifikat..."}` |
| `tentang-kami` | `hero` | `{"judul": "Tentang Kami", "deskripsi": "LSPro BBPI adalah..."}` |
| `beranda` | `hero` | `{"judul": "LSPro BBPI", "deskripsi": "Lembaga Sertifikasi Produk Terbaik", "gambar_url": "..."}` |

### 4.2 `form_downloads` — Link download formulir Google Drive

```sql
CREATE TABLE form_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kategori TEXT NOT NULL,          -- e.g. 'TIPE 1n - FORMULIR SERTIFIKASI MAINAN ANAK'
  nama_form TEXT NOT NULL,         -- e.g. 'DATA PEMOHON DAN INFORMASI PRODUSEN'
  link_lokal TEXT,                 -- Full Google Drive URL (lokal)
  link_impor TEXT,                 -- Full Google Drive URL (impor)
  nomor_urut INT DEFAULT 0,       -- Urutan tampilan dalam tabel
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 `google_forms` — Link Google Forms embed

```sql
CREATE TABLE google_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_form TEXT NOT NULL,         -- e.g. 'Pendaftaran Sertifikasi'
  google_form_id TEXT NOT NULL,    -- ID dari share link Google Form
  halaman TEXT NOT NULL,           -- 'pendaftaran' atau 'kuesioner'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (halaman)
);
```

### 4.4 Row Level Security (RLS)

```sql
-- site_content: Authenticated (admin) can read/write, public can read
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Admin write site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Same policies for form_downloads and google_forms
ALTER TABLE form_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read form_downloads" ON form_downloads FOR SELECT USING (true);
CREATE POLICY "Admin write form_downloads" ON form_downloads FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE google_forms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read google_forms" ON google_forms FOR SELECT USING (true);
CREATE POLICY "Admin write google_forms" ON google_forms FOR ALL USING (auth.role() = 'authenticated');
```

### 4.5 Storage Buckets

| Bucket | Fungsi | Policy |
|--------|--------|--------|
| `website-images` | Logo, gambar struktur, hero image | Public read, Admin write |

---

## 5. Data Flow

### 5.1 Visitor Flow
```
Browser → React Router → Page Component → Supabase Query (`site_content`) → Render Content
                                            → Supabase Query (`form_downloads`) → Build Download Table
                                            → Supabase Query (`google_forms`) → Embed Google Form iframe
```

### 5.2 Admin Flow
```
Browser → /admin → Supabase Auth (email/password) → JWT Token → Set Session
                                                    ↓
                              /admin/halaman/:page → GET `site_content` → Tampilkan form fields
                                                   → POST `site_content` → Simpan perubahan
                              /admin/form-download → GET/POST `form_downloads` → Kelola link
                              /admin/google-forms  → GET/POST `google_forms` → Kelola form ID
```

### 5.3 Google Drive Download Logic
```
Admin input: https://drive.google.com/file/d/1AbCdEfGhIjK/view
                                                 ↓
Extract FILE_ID: 1AbCdEfGhIjK
                                                 ↓
Generate download URL: https://drive.google.com/uc?export=download&id=1AbCdEfGhIjK
                                                 ↓
Tombol Download → window.open(download_url, '_blank') atau <a href download>
```

### 5.4 Google Form Embed Logic
```
Admin input: https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform
                                                 ↓
Extract FORM_ID: 1FAIpQLSd...
                                                 ↓
Generate embed URL: https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform?embedded=true
                                                 ↓
<iframe src={embed_url} width="100%" height={800} />
```

---

## 6. Component Architecture

### 6.1 Core Components

```
src/
├── main.tsx
├── App.tsx
├── index.css                          # Tailwind directives
├── supabase/
│   ├── client.ts                      # Supabase JS client init
│   └── types.ts                       # Database type definitions
├── components/
│   ├── layout/
│   │   ├── Header.tsx                 # Logo + Navigation + Mobile menu
│   │   ├── Footer.tsx                 # Link, social, contact info
│   │   └── Layout.tsx                 # Wrapper: Header + Outlet + Footer
│   ├── ui/
│   │   ├── SectionRenderer.tsx        # Render konten dari `site_content`
│   │   ├── DownloadButton.tsx         # Generate Google Drive download link
│   │   ├── GoogleFormEmbed.tsx        # Embed Google Form iframe
│   │   ├── PageHero.tsx               # Hero section standard per halaman
│   │   └── Breadcrumb.tsx             # Navigasi breadcrumb
│   └── admin/
│       ├── ProtectedRoute.tsx         # Auth guard
│       ├── AdminLayout.tsx            # Sidebar + content layout
│       ├── SectionForm.tsx            # Form fields per section
│       └── FormDownloadTable.tsx      # Tabel editable form download
├── pages/
│   ├── Home.tsx
│   ├── TentangKami.tsx
│   ├── VisiMisi.tsx
│   ├── StrukturOrganisasi.tsx
│   ├── informasi/
│   │   ├── Pemeliharaan.tsx
│   │   ├── KeluhanBanding.tsx
│   │   ├── HakKewajiban.tsx
│   │   ├── SumberPendanaan.tsx
│   │   └── BiayaSertifikasi.tsx
│   ├── layanan/
│   │   ├── SertifikasiTipe1.tsx
│   │   └── SertifikasiTipe5.tsx
│   ├── RuangLingkup.tsx
│   ├── FormDownload.tsx
│   ├── FormPendaftaran.tsx
│   ├── Kuesioner.tsx
│   ├── Kontak.tsx
│   └── admin/
│       ├── Login.tsx
│       ├── Dashboard.tsx
│       ├── ContentEditor.tsx
│       ├── FormDownloadEditor.tsx
│       ├── GoogleFormEditor.tsx
│       └── Settings.tsx
├── hooks/
│   ├── useSiteContent.ts              # Fetch site_content per (page, section)
│   ├── useFormDownloads.ts            # Fetch form_downloads per kategori
│   └── useGoogleForms.ts              # Fetch google_forms
└── utils/
    ├── constants.ts                    # Page list, nav structure
    └── googleDrive.ts                  # Extract ID, generate download URL
```

---

## 7. Admin CMS Workflow

### 7.1 Login
1. Admin buka `/admin`
2. Diarahkan ke halaman login
3. Masukkan email + password (Supabase Auth)
4. Redirect ke `/admin/dashboard`

### 7.2 Edit Konten Halaman
1. Dashboard → pilih halaman yang ingin diedit (dropdown)
2. Content Editor menampilkan semua section halaman tersebut sebagai form fields
3. Admin edit judul, deskripsi, gambar URL
4. Klik "Simpan" → data dikirim ke `site_content` via Supabase

### 7.3 Kelola Form Download
1. Dashboard → "Kelola Form Download"
2. Pilih kategori form (dropdown)
3. Tabel menampilkan: No, Nama Form, Link Lokal, Link Impor
4. Admin paste full Google Drive URL ke field yang sesuai
5. Klik "Simpan Semua"

### 7.4 Kelola Google Forms
1. Dashboard → "Kelola Google Forms"
2. Dua field: Pendaftaran Sertifikasi, Kuesioner
3. Admin paste Google Form ID
4. Klik "Simpan"

---

## 8. Halaman Kritis

### 8.1 Form Download Page (`/formulir/download`)

- Layout tabel sesuai referensi `lsigs.com/v2/formulir-kosong/`
- Setiap kategori form = satu tabel dengan kolom: NO, TITLE, LOKAL (download button), IMPOR (download button)
- Tombol download menggunakan logika Google Drive: extract FILE_ID → generate direct download link
- Data diambil dari tabel `form_downloads` di Supabase
- Admin mengelola link via `/admin/form-download`

### 8.2 Form Pendaftaran Page (`/formulir/pendaftaran`)

- Embed Google Form via iframe
- Google Form ID diambil dari tabel `google_forms` (Supabase)
- Admin bisa ganti form kapan saja via `/admin/google-forms`

### 8.3 Kuesioner Page (`/kuesioner`)

- Embed Google Form via iframe
- Sama seperti Form Pendaftaran, beda halaman parameter

---

## 9. Deployment

### 9.1 Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 9.2 Environment Variables (.env)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 9.3 Domain
- Default: `lspro-bbpi.vercel.app`
- Custom domain disiapkan jika diperlukan

---

## 10. Acceptance Criteria

- [ ] Semua 16 halaman publik dapat diakses dan ditampilkan
- [ ] Admin dapat login via `/admin`
- [ ] Admin dapat mengedit semua konten halaman melalui form fields
- [ ] Admin dapat mengelola link Google Drive untuk form download
- [ ] Admin dapat mengelola link Google Forms untuk pendaftaran & kuesioner
- [ ] Tombol download form mengunduh langsung file dari Google Drive
- [ ] Google Forms embed berfungsi di halaman pendaftaran & kuesioner
- [ ] Navigasi mobile-responsive
- [ ] Website terdeploy di Vercel dan dapat diakses publik
- [ ] Lighthouse score ≥ 85

---

## 11. Timeline Estimasi

| Hari | Fase | Tasks |
|------|------|-------|
| 1 | Setup | Init Vite project, Tailwind config, Supabase setup, routing |
| 2 | Layout + Home | Header, Footer, Navigation, responsive layout, Home page |
| 3 | Halaman Informasi | 5 halaman informasi + 2 halaman layanan |
| 4 | Form Pages | Download page (tabel + Google Drive logic), Pendaftaran (embed), Kuesioner (embed) |
| 5 | Admin CMS | Login, Dashboard, Content Editor, Form Download Editor, Google Forms Editor |
| 6 | Remaining Pages | Ruang Lingkup, Struktur Organisasi, Kontak, polish semua halaman |
| 7 | Testing + Deploy | Responsive testing, bug fixing, Vercel deployment |
