# Design Document: LSPro BBPI Website

> **Tanggal:** 18 Juni 2026
> **Referensi:** [UzOman Corporate Website Design](https://dribbble.com/shots/25838011-UzOman-Corporate-Website-Design)
> **Style:** Modern Corporate — Clean, Bold, Card-based
> **Terkait:** [PRD](./2026-06-18-lspro-bbpi-website-prd.md)

---

## 1. Design Philosophy

| Prinsip | Implementasi |
|---------|-------------|
| **Clean White Space** | Background `neutral-50`, konten di card putih dengan generous padding |
| **Bold Typography** | Heading besar (text-4xl s/d text-6xl), font Inter bold/semibold |
| **Card-Based Sections** | Semua konten terisolasi dalam card dengan rounded border + subtle shadow |
| **Navy Corporate Accent** | Navy blue sebagai warna brand, anchor orange untuk CTA |
| **Consistent CTA Strip** | Setiap halaman content diakhiri dengan CTA strip "Tim Kami Siap Membantu" |
| **Subtle Motion** | Hover scale/shadow, page enter fade-in, staggered reveal |

---

## 2. Design Tokens

### 2.1 Color Tokens (Tailwind extended)
```css
/* Primary — Navy Maritime */
--color-primary-50:   #eff6ff;
--color-primary-100:  #dbeafe;
--color-primary-200:  #bfdbfe;
--color-primary-300:  #93c5fd;
--color-primary-400:  #60a5fa;
--color-primary-500:  #0a3d62;   /* Navy Blue — Brand */
--color-primary-600:  #082f4e;
--color-primary-700:  #06223a;
--color-primary-800:  #041526;
--color-primary-900:  #020a14;
--color-primary-950:  #01050a;

/* Accent — Anchor Orange */
--color-accent-50:   #fff7ed;
--color-accent-100:  #ffedd5;
--color-accent-200:  #fed7aa;
--color-accent-300:  #fdba74;
--color-accent-400:  #fb923c;
--color-accent-500:  #e67e22;   /* Anchor Orange — Brand Accent */
--color-accent-600:  #c96a1d;
--color-accent-700:  #a85517;
--color-accent-800:  #7c3f12;
--color-accent-900:  #522b0e;

/* Neutral */
--color-neutral-50:  #f8fafc;   /* Page background */
--color-neutral-100: #f1f5f9;   /* Card background alt */
--color-neutral-200: #e2e8f0;   /* Border */
--color-neutral-300: #cbd5e1;
--color-neutral-400: #94a3b8;
--color-neutral-500: #64748b;   /* Secondary text */
--color-neutral-600: #475569;
--color-neutral-700: #334155;
--color-neutral-800: #1e293b;   /* Primary text */
--color-neutral-900: #0f172a;   /* Heading text */

/* Semantic */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error:   #ef4444;
--color-info:    #3b82f6;

/* Background Sections */
--color-section-hero:    #0a3d62;   /* Navy solid for hero bands */
--color-section-cta:     #0a3d62;
--color-section-light:   #f8fafc;
--color-section-footer:  #041526;   /* Deepest navy for footer */
--color-card:            #ffffff;   /* White card */
--color-card-hover-bg:   #f8fafc;
```

### 2.2 Typography Tokens
```css
/* Font Family */
--font-sans: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "JetBrains Mono", monospace;

/* Type Scale (Tailwind equivalents) */
--text-xs:    0.75rem;    /* 12px — captions, labels kecil */
--text-sm:    0.875rem;   /* 14px — secondary text */
--text-base:  1rem;       /* 16px — body, form inputs */
--text-lg:    1.125rem;   /* 18px — lead paragraph */
--text-xl:    1.25rem;    /* 20px — card titles */
--text-2xl:   1.5rem;     /* 24px — section headings */
--text-3xl:   1.875rem;   /* 30px — page headings */
--text-4xl:   2.25rem;    /* 36px — hero subheading */
--text-5xl:   3rem;       /* 48px — hero headline desktop */
--text-6xl:   3.75rem;    /* 60px — hero headline large */

/* Font Weights */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;

/* Line Heights */
--leading-normal:  1.5;
--leading-relaxed: 1.625;
--leading-tight:   1.25;
--leading-snug:    1.375;
```

### 2.3 Spacing Scale
```
--space-0:  0px;
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;     /* Component inner padding */
--space-5:  20px;
--space-6:  24px;     /* Card padding */
--space-8:  32px;     /* Section gap */
--space-10: 40px;
--space-12: 48px;     /* Section padding top/bottom */
--space-16: 64px;
--space-20: 80px;     /* Large section gap */
--space-24: 96px;     /* Hero padding */
```

### 2.4 Elevation (Box Shadow)
```css
--shadow-xs:    0 1px 2px rgba(0,0,0,0.05);
--shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
--shadow-md:    0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.03);
--shadow-lg:    0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.03);
--shadow-xl:    0 20px 25px rgba(0,0,0,0.06), 0 8px 10px rgba(0,0,0,0.04);
--shadow-card-hover: 0 20px 40px rgba(10,61,98,0.08), 0 4px 10px rgba(0,0,0,0.06);
```

### 2.5 Border Radius
```css
--radius-sm:   0.375rem;   /* 6px — badges, labels */
--radius-md:   0.5rem;     /* 8px — buttons, inputs */
--radius-lg:   0.75rem;    /* 12px — cards */
--radius-xl:   1rem;       /* 16px — modals, large cards */
--radius-2xl:  1.5rem;     /* 24px — hero decorative */
```

### 2.6 Breakpoints (Tailwind default)
```
sm:  640px    — Tablet portrait
md:  768px    — Tablet landscape
lg:  1024px   — Desktop
xl:  1280px   — Desktop large
2xl: 1536px   — Desktop xl
```

### 2.7 Container Widths
```
Default:        max-w-7xl (1280px)  — Standard content
Narrow text:    max-w-3xl (768px)   — Article / reading content
Form embed:     max-w-3xl (768px)   — Google Form iframe
Admin panel:    max-w-[1440px]       — Wider admin workspace
```

---

## 3. Component Specifications

### 3.1 Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--color-primary-500);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 200ms ease-out;
}
.btn-primary:hover { background: var(--color-primary-700); transform: translateY(-1px); box-shadow: var(--shadow-lg); }
.btn-primary:active { transform: translateY(0); }
.btn-primary:focus { outline: 2px solid var(--color-accent-500); outline-offset: 2px; }

/* Accent Button (CTA) */
.btn-accent {
  background: var(--color-accent-500);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 200ms ease-out;
}
.btn-accent:hover { background: var(--color-accent-600); transform: translateY(-1px); box-shadow: var(--shadow-lg); }

/* Outline Button */
.btn-outline {
  background: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 200ms ease-out;
}
.btn-outline:hover { background: var(--color-primary-500); color: white; }

/* Ghost Button (for nav, admin) */
.btn-ghost {
  background: transparent;
  color: var(--color-neutral-600);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 150ms ease;
}
.btn-ghost:hover { background: var(--color-neutral-100); color: var(--color-primary-500); }

/* Download Button */
.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-neutral-50);
  color: var(--color-primary-500);
  border: 1px solid var(--color-neutral-200);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 200ms ease;
}
.btn-download:hover { background: var(--color-primary-50); border-color: var(--color-primary-300); }
```

### 3.2 Cards

```css
/* Standard Card */
.card {
  background: white;
  border: 1px solid var(--color-neutral-100);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: all 300ms ease;
}
.card:hover { box-shadow: var(--shadow-card-hover); transform: translateY(-2px); }

/* Service Card (homepage) */
.card-service {
  background: white;
  border: 1px solid var(--color-neutral-100);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: all 300ms ease;
}
.card-service:hover { box-shadow: var(--shadow-card-hover); transform: translateY(-4px); }
.card-service .icon {
  color: var(--color-accent-500);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* CTA Strip Card */
.card-cta {
  background: var(--color-primary-500);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  text-align: center;
  color: white;
}
```

### 3.3 Navigation

```css
/* Header — Sticky, Transparent → Solid on scroll */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 300ms ease;
}
.header.scrolled {
  border-bottom-color: var(--color-neutral-200);
  box-shadow: var(--shadow-sm);
}

/* Nav Link */
.nav-link {
  color: var(--color-neutral-600);
  font-weight: 500;
  font-size: 0.938rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: color 150ms ease;
}
.nav-link:hover { color: var(--color-primary-500); }
.nav-link.active { color: var(--color-primary-500); font-weight: 600; }

/* Dropdown Menu */
.nav-dropdown {
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.5rem 0;
  min-width: 220px;
  transform-origin: top;
  animation: dropdownIn 200ms ease-out;
}
@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Mobile Menu */
.mobile-menu {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  padding: 1.5rem;
  animation: slideIn 300ms ease-out;
}
@keyframes slideIn {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
```

### 3.4 Hero Sections

```css
/* Full Hero (Homepage) */
.hero-full {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 4rem;
  align-items: center;
  padding: 6rem 0;
  min-height: calc(100vh - 80px);
}
.hero-full h1 {
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-neutral-900);
  line-height: 1.15;
  margin-bottom: 1.5rem;
}
.hero-full p {
  font-size: var(--text-lg);
  color: var(--color-neutral-500);
  margin-bottom: 2rem;
  max-width: 540px;
}
.hero-full .cta-group {
  display: flex;
  gap: 1rem;
}
.hero-full .hero-image {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

/* Mini Hero (Inner Pages) */
.hero-mini {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
  padding: 4rem 0;
  text-align: center;
  color: white;
}
.hero-mini h1 {
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.hero-mini .breadcrumb {
  font-size: var(--text-sm);
  opacity: 0.85;
}
.hero-mini .breadcrumb a { color: white; text-decoration: underline; opacity: 0.75; }
.hero-mini .breadcrumb a:hover { opacity: 1; }
.hero-mini p {
  font-size: var(--text-lg);
  opacity: 0.9;
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
```

### 3.5 Footer

```css
.footer {
  background: var(--color-primary-950);
  color: var(--color-neutral-300);
  padding: 4rem 0 2rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 3rem;
}
.footer h4 {
  color: white;
  font-size: var(--text-base);
  font-weight: 600;
  margin-bottom: 1rem;
}
.footer a { color: inherit; transition: color 150ms ease; }
.footer a:hover { color: white; }
.footer .social-links { display: flex; gap: 1rem; }
.footer .social-links a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-neutral-600);
  border-radius: 50%;
  transition: all 200ms ease;
}
.footer .social-links a:hover { background: var(--color-accent-500); border-color: var(--color-accent-500); color: white; }
.footer-divider { border-color: var(--color-neutral-700); margin: 2rem 0; }
.footer-copyright { font-size: var(--text-sm); color: var(--color-neutral-500); text-align: center; }

/* Mobile Footer */
@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
```

### 3.6 Download Table

```css
.download-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-neutral-100);
}
.download-table thead {
  background: var(--color-primary-500);
  color: white;
}
.download-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.download-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-neutral-100);
  font-size: var(--text-sm);
}
.download-table tr:last-child td { border-bottom: none; }
.download-table tr:hover { background: var(--color-primary-50); }

/* Kategori selector */
.form-category-select {
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-size: var(--text-base);
  width: 100%;
  max-width: 400px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}
```

### 3.7 Google Form Embed

```css
.google-form-container {
  background: white;
  border: 1px solid var(--color-neutral-100);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  margin: 2rem 0;
}
.google-form-container .info-header {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
  color: white;
  padding: 2rem;
  text-align: center;
}
.google-form-container .info-header h1 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.google-form-container .info-header p {
  opacity: 0.85;
  font-size: var(--text-base);
}
.google-form-container iframe {
  width: 100%;
  min-height: 900px;
  border: none;
}
```

### 3.8 CTA Strip (Reusable)

```css
.cta-strip {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
  border-radius: var(--radius-2xl);
  padding: 3rem;
  text-align: center;
  color: white;
  margin: 4rem 0;
}
.cta-strip h3 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: 0.75rem;
}
.cta-strip p {
  opacity: 0.85;
  margin-bottom: 1.5rem;
  font-size: var(--text-lg);
}
.cta-strip .btn {
  background: var(--color-accent-500);
  color: white;
  font-weight: 600;
  padding: 0.875rem 2.5rem;
  border-radius: 0.5rem;
  font-size: var(--text-base);
  transition: all 200ms ease;
}
.cta-strip .btn:hover {
  background: var(--color-accent-600);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(230,126,34,0.3);
}
```

### 3.9 Admin Panel

```css
.admin-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: var(--color-neutral-50);
}
.admin-sidebar {
  background: white;
  border-right: 1px solid var(--color-neutral-200);
  padding: 1.5rem;
}
.admin-sidebar .nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  color: var(--color-neutral-600);
  font-weight: 500;
  transition: all 150ms ease;
  margin-bottom: 0.25rem;
}
.admin-sidebar .nav-item:hover {
  background: var(--color-neutral-50);
  color: var(--color-primary-500);
}
.admin-sidebar .nav-item.active {
  background: var(--color-primary-50);
  color: var(--color-primary-500);
  font-weight: 600;
}
.admin-content {
  padding: 2rem;
  max-width: 1200px;
}
.admin-login {
  max-width: 400px;
  margin: 120px auto;
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
.admin-login h1 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}
.admin-login .form-group {
  margin-bottom: 1.25rem;
}
.admin-login label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-neutral-700);
  margin-bottom: 0.5rem;
}
.admin-login input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
}
.admin-login input:focus {
  outline: none;
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 3px rgba(10,61,98,0.1);
}
```

---

## 4. Page Layouts

### 4.1 Beranda (Home)

```
+--------------------------------------------------+
| HEADER (sticky, transparent → solid on scroll)    |
+--------------------------------------------------+
|                                                    |
| HERO (full viewport height)                        |
| ┌──────────────────────┐ ┌────────────────────┐   |
| │ LSPro                │ │                    │   |
| │ Balai Besar          │ │  [Hero Image]     │   |
| │ Penangkapan Ikan      │ │  (kapal/perikanan)│   |
| │                      │ │                    │   |
| │ Lembaga Sertifikasi  │ │                    │   |
| │ Produk Perikanan     │ │                    │   |
| │                      │ │                    │   |
| │ [Pelajari Layanan]   │ │                    │   |
| │ [Hubungi Kami]       │ │                    │   |
| └──────────────────────┘ └────────────────────┘   |
|                                                    |
+--------------------------------------------------+
|                                                    |
| SECTION: Layanan Sertifikasi                       |
| ┌──────────────┐ ┌──────────────┐ ┌────────────┐  |
| │ 🔷 Sertifikasi│ │ 🔷 Sertifikasi│ │ 🔷 Ruang   │  |
| │ Tipe 1       │ │ Tipe 5       │ │ Lingkup    │  |
| └──────────────┘ └──────────────┘ └────────────┘  |
|                                                    |
+--------------------------------------------------+
|                                                    |
| SECTION: Tentang BBPI (split)                      |
| ┌──────────────────────┐ ┌────────────────────┐   |
| │                      │ │ Tentang Kami       │   |
| │  [Large Image]       │ │                    │   |
| │                      │ │ Deskripsi ringkas  │   |
| │                      │ │ [Selengkapnya →]   │   |
| └──────────────────────┘ └────────────────────┘   |
|                                                    |
+--------------------------------------------------+
|                                                    |
| SECTION: CTA Strip                                 |
| ┌──────────────────────────────────────────────┐  |
| │ Siap Mengajukan Sertifikasi?                  │  |
| │ [Download Formulir]     [Form Pendaftaran]   │  |
| └──────────────────────────────────────────────┘  |
|                                                    |
+--------------------------------------------------+
| FOOTER (4-column grid, deep navy background)      |
+--------------------------------------------------+
```

### 4.2 Halaman Konten (Informasi / Layanan)

```
+--------------------------------------------------+
| HEADER                                            |
+--------------------------------------------------+
| MINI HERO (gradient navy, centered text)          |
|  Judul Halaman                                    |
|  Home > Profil > [Halaman]                        |
|  Deskripsi singkat                                |
+--------------------------------------------------+
|                                                    |
| CONTENT (centered, max-w-3xl)                      |
| ┌──────────────────────────────────────────────┐  |
| │                                              │  |
| │  Body text + ordered lists                   │  |
| │  Clean typography, white space               │  |
| │                                              │  |
| └──────────────────────────────────────────────┘  |
|                                                    |
+--------------------------------------------------+
| CTA STRIP (Tim Kami Siap Membantu)                |
+--------------------------------------------------+
| FOOTER                                            |
+--------------------------------------------------+
```

### 4.3 Visi & Misi

```
+--------------------------------------------------+
| HEADER                                            |
+--------------------------------------------------+
| MINI HERO: Visi & Misi                            |
+--------------------------------------------------+
|                                                    |
| ┌──────────────────┐  ┌──────────────────┐        |
| │  🔷              │  │  🔷              │        |
| │  VISI            │  │  MISI            │        |
| │                  │  │                  │        |
| │  Teks visi...    │  │  1. Poin misi    │        |
| │                  │  │  2. Poin misi    │        |
| │                  │  │  3. Poin misi    │        |
| │                  │  │  4. Poin misi    │        |
| └──────────────────┘  └──────────────────┘        |
|    (equal height flex cards)                      |
|                                                    |
+--------------------------------------------------+
| CTA STRIP                                         |
+--------------------------------------------------+
| FOOTER                                            |
+--------------------------------------------------+
```

### 4.4 Form Download

```
+--------------------------------------------------+
| HEADER                                            |
+--------------------------------------------------+
| MINI HERO: Download Formulir Kosong               |
+--------------------------------------------------+
|                                                    |
| ┌────────────────────────────────────────────┐     |
| │  Pilih Kategori: [dropdown ▼]              │     |
| └────────────────────────────────────────────┘     |
|                                                    |
| ┌────────────────────────────────────────────┐     |
| │  TIPE 1n — Formulir Sertifikasi Mainan     │     |
| │  ────────────────────────────────────────  │     |
| │  NO │ TITLE                     │ LOK │ IMP│     |
| │  ───┼──────────────────────────┼─────┼────│     |
| │  1  │ Data Pemohon...           │ [⬇] │ [⬇]│     |
| │  2  │ Surat Pernyataan          │ [⬇] │ [⬇]│     |
| │  3  │ Contoh LOA                │ [⬇] │ [⬇]│     |
| │  ...│ ...                       │ ... │ ...│     |
| └────────────────────────────────────────────┘     |
|                                                    |
+--------------------------------------------------+
| CTA STRIP                                         |
+--------------------------------------------------+
| FOOTER                                            |
+--------------------------------------------------+
```

### 4.5 Form Pendaftaran / Kuesioner

```
+--------------------------------------------------+
| HEADER                                            |
+--------------------------------------------------+
|                                                    |
| ┌──────────────────────────────────────────────┐  |
| │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  |
| │ ▓  Formulir Pendaftaran Sertifikasi Produk ▓  │  |
| │ ▓                                            ▓  │  |
| │ ▓  Isi formulir di bawah ini untuk mengajukan ▓  │  |
| │ ▓  permohonan sertifikasi                     ▓  │  |
| │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  |
| │                                              │  |
| │  ┌──────────────────────────────────────┐   │  |
| │  │                                      │   │  |
| │  │  [Google Form Embedded - iframe]     │   │  |
| │  │                                      │   │  |
| │  └──────────────────────────────────────┘   │  |
| └──────────────────────────────────────────────┘  |
|                                                    |
+--------------------------------------------------+
| FOOTER                                            |
+--------------------------------------------------+
```

### 4.6 Kontak

```
+--------------------------------------------------+
| HEADER                                            |
+--------------------------------------------------+
| MINI HERO: Kontak Kami                            |
+--------------------------------------------------+
|                                                    |
| ┌─────────────────────┐ ┌──────────────────────┐  |
| │                     │ │                      │  |
| │ 📍 Alamat          │ │  [Google Maps Embed] │  |
| │ 📞 Telepon          │ │                      │  |
| │ 📱 WhatsApp        │ │                      │  |
| │ ✉️ Email           │ │                      │  |
| │                     │ │                      │  |
| │ 🔗 Social Media:    │ │                      │  |
| │   [FB][IG][YT][LI] │ │                      │  |
| └─────────────────────┘ └──────────────────────┘  |
|      (1/3 width)          (2/3 width)              |
|                                                    |
+--------------------------------------------------+
| FOOTER                                            |
+--------------------------------------------------+
```

### 4.7 Admin Panel

```
+--------------------------------------------------+
| ┌────────────┐ ┌──────────────────────────────┐  |
| │  ADMIN SIDE│ │ Header: [Logo BBPI] [Logout] │  |
| │            │ │ ──────────────────────────── │  |
| │ 📊 Dashboard│ │                              │  |
| │ 📝 Kelola   │ │ ┌──────────────────────┐    │  |
| │   Konten   │ │ │                      │    │  |
| │ 📥 Form    │ │ │  Content Area        │    │  |
| │   Download │ │ │                      │    │  |
| │ 🔗 Google  │ │ │  Form fields:        │    │  |
| │   Forms    │ │ │  ┌────────────────┐  │    │  |
| │ ⚙️ Settings│ │ │  │ Judul: [____]  │  │    │  |
| │            │ │ │  │ Deskripsi:     │  │    │  |
| │            │ │ │  │ [__________]   │  │    │  |
| │            │ │ │  └────────────────┘  │    │  |
| │            │ │ │                      │    │  |
| │            │ │ │  [Simpan Perubahan]  │    │  |
| │            │ │ └──────────────────────┘    │  |
| └────────────┘ └──────────────────────────────┘  |
+--------------------------------------------------+
```

---

## 5. Animation & Interaction

### 5.1 Page Transitions
```css
/* Page enter fade */
.page-enter {
  animation: fadeInUp 400ms ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### 5.2 Scroll Reveal
```css
/* Sections reveal on scroll — Intersection Observer */
.reveal-section {
  opacity: 0;
  transform: translateY(24px);
  transition: all 600ms ease-out;
}
.reveal-section.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 5.3 Hover States
```css
/* Card */
.card:hover { transform: translateY(-2px); box-shadow: var(--shadow-card-hover); }

/* Button */
.btn:hover { transform: translateY(-1px); }

/* Link underline animation */
.link-underline {
  position: relative;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent-500);
  transition: width 300ms ease;
}
.link-underline:hover::after { width: 100%; }

/* Staggered card reveal */
.stagger-item {
  opacity: 0;
  animation: fadeInUp 400ms ease-out forwards;
}
.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }
.stagger-item:nth-child(4) { animation-delay: 300ms; }
.stagger-item:nth-child(5) { animation-delay: 400ms; }
.stagger-item:nth-child(6) { animation-delay: 500ms; }
```

### 5.4 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Responsive Behavior

### 6.1 Breakpoint Strategy

| Breakpoint | Layout Changes |
|-----------|---------------|
| `< 640px` | Single column, stack hero, hamburger menu, full-width cards |
| `640-768px` | Two-column where possible, medium hero |
| `768-1024px` | Multi-column grids, larger hero, sticky header |
| `> 1024px` | Full desktop layout, max-width containers |

### 6.2 Mobile-Specific Rules

```css
/* Mobile hero: stack vertical */
@media (max-width: 768px) {
  .hero-full { grid-template-columns: 1fr; text-align: center; }
  .hero-full .cta-group { justify-content: center; }
  .hero-full h1 { font-size: var(--text-3xl); }
  .hero-full .hero-image { order: -1; margin-bottom: 2rem; }

  .card-service { padding: 1.5rem; }
  .cta-strip { padding: 2rem 1.5rem; }
  .mini-hero { padding: 3rem 1rem; }
  .mini-hero h1 { font-size: var(--text-2xl); }
}

/* Tablet: adjust grid */
@media (max-width: 1024px) {
  .hero-full { gap: 2rem; }
  .hero-full h1 { font-size: var(--text-4xl); }
  .contact-split { grid-template-columns: 1fr; }
}

/* Download table: horizontal scroll wrapper */
@media (max-width: 768px) {
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .download-table { min-width: 600px; }
}
```

### 6.3 Mobile Navigation
```
Desktop: Horizontal nav bar with dropdowns
Mobile:  Hamburger → Slide-in overlay
         Accordion submenu (tap to expand)
```

---

## 7. Admin Panel — Form Field Specifications

### 7.1 Content Editor Fields per Page

| Halaman | Sections (fields) |
|---------|------------------|
| Beranda | `hero` (judul, deskripsi, gambar_url, cta_teks), `tentang` (judul, deskripsi, gambar_url) |
| Tentang Kami | `hero` (judul, deskripsi) |
| Visi & Misi | `visi` (judul, deskripsi), `misi` (judul, deskripsi) |
| Struktur Organisasi | `hero` (judul, gambar_url) |
| Pemeliharaan | `hero` (judul), `penghentian`, `pengurangan`, `perluasan`, `pembekuan`, `pencabutan`, `transfer`, `perubahan` (masing-masing: judul, list_item) |
| Keluhan & Banding | `hero` (judul), `prosedur` (judul, list_item 1-15) |
| Hak & Kewajiban | `hero` (judul), `hak` (judul, list_item 1-7), `kewajiban` (judul, list_item 1-15) |
| Sumber Pendanaan | `hero` (judul), `modal` (judul, deskripsi), `pendapatan` (judul, deskripsi), `pengelolaan` (judul, deskripsi), `pengawasan` (judul, deskripsi) |
| Biaya Sertifikasi | `hero` (judul), `biaya` (judul, list_item 1-3) |
| Sertifikasi Tipe 1 | `hero` (judul, deskripsi, gambar_url) |
| Sertifikasi Tipe 5 | `hero` (judul, deskripsi, gambar_url) |
| Ruang Lingkup | `hero` (judul, deskripsi) |
| Kontak | `hero` (judul), `alamat`, `telepon`, `whatsapp`, `email`, `maps_url`, `facebook`, `instagram`, `youtube`, `linkedin` |

### 7.2 Form Download Editor
```
Kategori: [dropdown — memilih kategori form]
Tabel editable:
  NO │ NAMA FORM │ LINK LOKAL │ LINK IMPOR │ [Hapus]
  ───┼───────────┼────────────┼────────────┼────────
  1  │ [text]    │ [url]      │ [url]      │ [🗑]
  2  │ [text]    │ [url]      │ [url]      │ [🗑]
  ...

[+ Tambah Form Baru]     [Simpan Semua Perubahan]
```

### 7.3 Google Forms Editor
```
┌──────────────────────────────────────────────┐
│  Kelola Google Forms                         │
│  ─────────────────────────────────────────  │
│                                              │
│  Form Pendaftaran Sertifikasi:               │
│  Google Form ID: [1FAIpQLSd...]             │
│                                              │
│  Form Kuesioner Kepuasan:                    │
│  Google Form ID: [1FAIpQLSd...]             │
│                                              │
│  ─────────────────────────────────────────  │
│  [Simpan]                                    │
│                                              │
│  Petunjuk:                                   │
│  1. Buka Google Form Anda                    │
│  2. Klik "Send" → tab "< >"                 │
│  3. Copy ID dari embed URL                   │
│     Format: /d/e/{ID}/viewform               │
│  4. Paste ID di atas                         │
└──────────────────────────────────────────────┘
```

---

## 8. Accessibility Checklist

- [ ] All images have `alt` text
- [ ] Color contrast ≥ 4.5:1 for text (navy text on white = OK, white text on navy = OK)
- [ ] Focus rings visible on all interactive elements (`outline-2 outline-offset-2`)
- [ ] Skip-to-content link at top of page
- [ ] Semantic heading hierarchy (h1 → h2 → h3)
- [ ] `aria-label` on icon-only buttons
- [ ] Keyboard-navigable dropdown menus
- [ ] Forms have visible labels
- [ ] `prefers-reduced-motion` respected
- [ ] Mobile tap targets ≥ 44×44px
- [ ] `role="alert"` on error/success messages in admin panel

---

## 9. Implementation Notes

### 9.1 Tailwind Configuration
```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#0a3d62', 600: '#082f4e', 700: '#06223a',
          800: '#041526', 900: '#020a14', 950: '#01050a'
        },
        accent: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#e67e22', 600: '#c96a1d', 700: '#a85517',
          800: '#7c3f12', 900: '#522b0e'
        }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-in-up': 'fadeInUp 400ms ease-out',
        'dropdown-in': 'dropdownIn 200ms ease-out',
      }
    }
  },
  plugins: []
}
```

### 9.2 Icons
Gunakan **Lucide React** — seluruh ikon stroke-based, konsisten.

| Penggunaan | Ikon |
|------------|------|
| Sertifikasi | `Award`, `ShieldCheck` |
| Download | `Download`, `FileDown` |
| Kontak (alamat) | `MapPin` |
| Kontak (telepon) | `Phone` |
| Kontak (WhatsApp) | `MessageCircle` (atau custom SVG WhatsApp) |
| Kontak (email) | `Mail` |
| Admin dashboard | `LayoutDashboard` |
| Admin content | `FileEdit` |
| Admin form | `FileDown` |
| Admin Google Forms | `Link`, `FormInput` |
| Admin settings | `Settings` |
| Login | `LogIn` |
| Nav dropdown | `ChevronDown` |
| External link | `ExternalLink` |
| Hamburger menu | `Menu`, `X` |
