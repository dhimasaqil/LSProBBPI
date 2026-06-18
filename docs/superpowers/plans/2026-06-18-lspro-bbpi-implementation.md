# LSPro BBPI Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the LSPro BBPI corporate website with 16 public pages, Google Forms integration, Google Drive form downloads, and Admin CMS — React + Vite + TypeScript + Tailwind + Supabase, deployed to Vercel.

**Architecture:** Single-page React app with React Router for navigation. All dynamic content stored in Supabase tables (`site_content`, `form_downloads`, `google_forms`). Admin panel uses Supabase Auth for single-admin login. Google Drive file IDs stored in Supabase, direct download URLs generated client-side. Google Forms embedded via iframe.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, React Router v6, Supabase JS Client, Lucide React

## Global Constraints

- All text in Bahasa Indonesia only
- Font: Inter (Google Fonts), loaded via `@import` in `index.css`
- Styling: Tailwind CSS only — no separate CSS modules or styled-components
- Icons: Lucide React only — no emoji icons
- Supabase RLS: Public read on all tables, authenticated write
- No Berita/Artikel, Pihak Berkepentingan, Lab Uji, Klien & Partner pages
- No external CMS — Supabase is the CMS backend
- 1 admin user only (email/password via Supabase Auth)
- Color tokens: primary (navy #0a3d62), accent (orange #e67e22) as Tailwind extended colors

---

### Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json` (via Vite init)
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `tsconfig.json`, `tsconfig.node.json`
- Create: `.env.example`

**Interfaces:**
- Produces: Working Vite + React + TypeScript dev server on `localhost:5173`
- Produces: All npm dependencies installed

- [ ] **Step 1: Initialize Vite project**

```bash
cd "D:\Vibecode\LSPro BBPI"
npm create vite@latest . -- --template react-ts
```

Expected: Scaffolds Vite + React + TypeScript project in current directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install react-router-dom @supabase/supabase-js lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Vite for Tailwind**

Read `vite.config.ts`, then edit:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 4: Add Tailwind directives**

Write `src/index.css`:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@theme {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #0a3d62;
  --color-primary-600: #082f4e;
  --color-primary-700: #06223a;
  --color-primary-800: #041526;
  --color-primary-900: #020a14;
  --color-primary-950: #01050a;
  --color-accent-50: #fff7ed;
  --color-accent-100: #ffedd5;
  --color-accent-200: #fed7aa;
  --color-accent-300: #fdba74;
  --color-accent-400: #fb923c;
  --color-accent-500: #e67e22;
  --color-accent-600: #c96a1d;
  --color-accent-700: #a85517;
  --color-accent-800: #7c3f12;
  --color-accent-900: #522b0e;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;

  --animate-fade-in-up: fadeInUp 400ms ease-out;
  --animate-dropdown-in: dropdownIn 200ms ease-out;

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes dropdownIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

- [ ] **Step 5: Create .env.example**

Write `.env.example`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 6: Run dev server to verify**

```bash
npm run dev
```

Expected: Server starts, blank page renders. Kill with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Vite + React + TS + Tailwind project"
```

---

### Task 2: Supabase Client & Routing Setup

**Files:**
- Create: `src/supabase/client.ts`
- Create: `src/supabase/types.ts`
- Create: `src/utils/constants.ts`
- Create: `src/utils/googleDrive.ts`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: `supabase` client instance (importable from `src/supabase/client.ts`)
- Produces: TypeScript types for all DB tables
- Produces: `NAV_ITEMS` constant array for navigation
- Produces: `getGoogleDriveDownloadUrl(url: string): string`
- Produces: `getGoogleFormEmbedUrl(formId: string): string`
- Produces: React Router routing structure with all 22 routes

- [ ] **Step 1: Create Supabase client**

Write `src/supabase/client.ts`:

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

- [ ] **Step 2: Create database types**

Write `src/supabase/types.ts`:

```ts
export interface SiteContent {
  id: string
  page: string
  section: string
  content: Record<string, string>
  created_at: string
  updated_at: string
}

export interface FormDownload {
  id: string
  kategori: string
  nama_form: string
  link_lokal: string | null
  link_impor: string | null
  nomor_urut: number
  created_at: string
  updated_at: string
}

export interface GoogleForm {
  id: string
  nama_form: string
  google_form_id: string
  halaman: 'pendaftaran' | 'kuesioner'
  created_at: string
  updated_at: string
}
```

- [ ] **Step 3: Create constants**

Write `src/utils/constants.ts`:

```ts
import { Award, ShieldCheck, Download, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  path?: string
  icon?: LucideIcon
  children?: NavItem[]
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
      { label: 'Keluhan, Perselisihan & Banding', path: '/informasi/keluhan-banding' },
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
  {
    label: 'Formulir',
    children: [
      { label: 'Download Formulir Kosong', path: '/formulir/download' },
      { label: 'Formulir Pendaftaran', path: '/formulir/pendaftaran' },
    ],
  },
  { label: 'Kuesioner', path: '/kuesioner' },
  { label: 'Kontak', path: '/kontak' },
]

export const SITE_NAME = 'LSPro BBPI'
export const SITE_TAGLINE = 'Balai Besar Penangkapan Ikan'

export const ADMIN_PAGES = [
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
```

- [ ] **Step 4: Create Google Drive/Forms utilities**

Write `src/utils/googleDrive.ts`:

```ts
export function getGoogleDriveDownloadUrl(url: string | null): string | null {
  if (!url) return null
  const match = url.match(/\/d\/([^/]+)/)
  if (!match) return null
  return `https://drive.google.com/uc?export=download&id=${match[1]}`
}

export function getGoogleFormEmbedUrl(formId: string): string {
  return `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`
}
```

- [ ] **Step 5: Setup React Router in App.tsx**

Write `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Home from './pages/Home'
import TentangKami from './pages/TentangKami'
import VisiMisi from './pages/VisiMisi'
import StrukturOrganisasi from './pages/StrukturOrganisasi'
import Pemeliharaan from './pages/informasi/Pemeliharaan'
import KeluhanBanding from './pages/informasi/KeluhanBanding'
import HakKewajiban from './pages/informasi/HakKewajiban'
import SumberPendanaan from './pages/informasi/SumberPendanaan'
import BiayaSertifikasi from './pages/informasi/BiayaSertifikasi'
import Sertifikasi from './pages/layanan/Sertifikasi'
import RuangLingkup from './pages/RuangLingkup'
import FormDownload from './pages/FormDownload'
import FormPendaftaran from './pages/FormPendaftaran'
import Kuesioner from './pages/Kuesioner'
import Kontak from './pages/Kontak'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ContentEditor from './pages/admin/ContentEditor'
import FormDownloadEditor from './pages/admin/FormDownloadEditor'
import GoogleFormEditor from './pages/admin/GoogleFormEditor'
import Settings from './pages/admin/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tentang-kami" element={<TentangKami />} />
          <Route path="visi-misi" element={<VisiMisi />} />
          <Route path="struktur-organisasi" element={<StrukturOrganisasi />} />
          <Route path="informasi/pemeliharaan" element={<Pemeliharaan />} />
          <Route path="informasi/keluhan-banding" element={<KeluhanBanding />} />
          <Route path="informasi/hak-kewajiban" element={<HakKewajiban />} />
          <Route path="informasi/sumber-pendanaan" element={<SumberPendanaan />} />
          <Route path="informasi/biaya-sertifikasi" element={<BiayaSertifikasi />} />
          <Route path="layanan/sertifikasi" element={<Sertifikasi />} />
          <Route path="ruang-lingkup" element={<RuangLingkup />} />
          <Route path="formulir/download" element={<FormDownload />} />
          <Route path="formulir/pendaftaran" element={<FormPendaftaran />} />
          <Route path="kuesioner" element={<Kuesioner />} />
          <Route path="kontak" element={<Kontak />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="halaman/:page" element={<ProtectedRoute><ContentEditor /></ProtectedRoute>} />
          <Route path="form-download" element={<ProtectedRoute><FormDownloadEditor /></ProtectedRoute>} />
          <Route path="google-forms" element={<ProtectedRoute><GoogleFormEditor /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 6: Create placeholder page files**

Write all page files as minimal placeholder components. Example `src/pages/Home.tsx`:

```tsx
export default function Home() {
  return <div>Home</div>
}
```

Create all 16 public pages + 5 admin pages with similar minimal exports.

- [ ] **Step 7: Verify routing works**

```bash
npm run dev
```

Navigate to `localhost:5173/`, `/tentang-kami`, `/admin`, etc. Expected: Each route renders its placeholder text.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Supabase client, routing, constants, and page stubs"
```

---

### Task 3: Layout Components (Header, Footer, Layout Wrapper)

**Files:**
- Create: `src/components/layout/Layout.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `NAV_ITEMS`, `SITE_NAME`, `SITE_TAGLINE` from `src/utils/constants.ts`
- Consumes: React Router `Outlet` for page content
- Produces: Full site chrome: sticky header with dropdown nav + footer with 4-column grid

- [ ] **Step 1: Create Layout wrapper**

Write `src/components/layout/Layout.tsx`:

```tsx
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Create Header with navigation**

Write `src/components/layout/Header.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { NAV_ITEMS, SITE_NAME } from '../../utils/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm' : 'bg-white/90 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <span className="text-lg font-bold text-neutral-900">{SITE_NAME}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className={`flex items-center gap-1 px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                      item.children.some(c => c.path && isActive(c.path))
                        ? 'text-primary-500'
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}>
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-[240px] animate-dropdown-in">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.path || '/'}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              isActive(child.path || '') ? 'bg-primary-50 text-primary-500 font-semibold' : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-500'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path || '/'}
                    className={`px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                      isActive(item.path || '')
                        ? 'text-primary-500 font-semibold'
                        : 'text-neutral-600 hover:text-primary-500'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <button className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto animate-dropdown-in">
          <div className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.label} item={item} isActive={isActive} />
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function MobileNavItem({ item, isActive }: { item: typeof NAV_ITEMS[number]; isActive: (path: string) => boolean }) {
  const [open, setOpen] = useState(false)
  if (item.children) {
    return (
      <div>
        <button onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-neutral-700 font-medium hover:bg-neutral-50 text-left">
          {item.label}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="ml-4 border-l border-neutral-200 pl-4 space-y-1 mt-1">
            {item.children.map(child => (
              <Link key={child.label} to={child.path || '/'}
                className={`block px-3 py-2.5 rounded-lg text-sm ${
                  child.path && isActive(child.path) ? 'text-primary-500 font-semibold bg-primary-50' : 'text-neutral-600 hover:text-primary-500'
                }`}>
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }
  return (
    <Link to={item.path || '/'}
      className={`block px-3 py-3 rounded-lg font-medium ${
        item.path && isActive(item.path) ? 'text-primary-500 font-semibold bg-primary-50' : 'text-neutral-700 hover:bg-neutral-50'
      }`}>
      {item.label}
    </Link>
  )
}
```

- [ ] **Step 3: Create Footer**

Write `src/components/layout/Footer.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { SITE_NAME } from '../../utils/constants'

const socialLinks = [
  { label: 'Facebook', href: '#', icon: 'FB' },
  { label: 'Instagram', href: '#', icon: 'IG' },
  { label: 'YouTube', href: '#', icon: 'YT' },
  { label: 'LinkedIn', href: '#', icon: 'LI' },
]

const footerNav = [
  { label: 'Tentang Kami', path: '/tentang-kami' },
  { label: 'Visi & Misi', path: '/visi-misi' },
  { label: 'Struktur Organisasi', path: '/struktur-organisasi' },
  { label: 'Ruang Lingkup', path: '/ruang-lingkup' },
  { label: 'Kontak', path: '/kontak' },
]

const footerInfo = [
  { label: 'Pemeliharaan / Perluasan', path: '/informasi/pemeliharaan' },
  { label: 'Keluhan & Banding', path: '/informasi/keluhan-banding' },
  { label: 'Hak dan Kewajiban', path: '/informasi/hak-kewajiban' },
  { label: 'Sumber Pendanaan', path: '/informasi/sumber-pendanaan' },
  { label: 'Biaya Sertifikasi', path: '/informasi/biaya-sertifikasi' },
]

const footerLayanan = [
  { label: 'Skema Sertifikasi', path: '/layanan/sertifikasi' },
  { label: 'Download Formulir', path: '/formulir/download' },
  { label: 'Form Pendaftaran', path: '/formulir/pendaftaran' },
  { label: 'Kuesioner', path: '/kuesioner' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BB</span>
              </div>
              <span className="text-lg font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Lembaga Sertifikasi Produk Balai Besar Penangkapan Ikan
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {footerNav.map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2.5">
              {footerInfo.map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-neutral-400">Alamat BBPI</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-neutral-400">(021) XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span className="text-neutral-400">08XX-XXXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="text-neutral-400">info@bbpi.go.id</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border border-neutral-600 rounded-full text-xs font-bold hover:bg-accent-500 hover:border-accent-500 hover:text-white transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-neutral-700 my-8" />
        <p className="text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Remove default Vite boilerplate**

Delete `src/App.css` and remove its import from `main.tsx`. Write `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Verify layout**

```bash
npm run dev
```

Expected: Header with navigation, page content area, footer. Hover on dropdown items. Resize to mobile — hamburger menu works.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Header, Footer, and Layout components"
```

---

### Task 4: Shared UI Components

**Files:**
- Create: `src/components/ui/PageHero.tsx`
- Create: `src/components/ui/SectionRenderer.tsx`
- Create: `src/components/ui/CtaStrip.tsx`
- Create: `src/components/ui/GoogleFormEmbed.tsx`
- Create: `src/components/ui/DownloadButton.tsx`

**Interfaces:**
- `PageHero`: renders mini hero with title, breadcrumb items, optional description
- `SectionRenderer`: fetches and renders one section from Supabase `site_content`
- `CtaStrip`: reusable call-to-action banner with WhatsApp link
- `GoogleFormEmbed`: iframe wrapper for Google Forms
- `DownloadButton`: button that opens Google Drive download URL

- [ ] **Step 1: Create hooks for data fetching**

Write `src/hooks/useSiteContent.ts`:

```ts
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { SiteContent } from '../supabase/types'

export function useSiteContent(page: string, section: string) {
  const [data, setData] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    supabase.from('site_content').select('*').eq('page', page).eq('section', section).single()
      .then(({ data, error }) => {
        if (!cancelled && !error) setData(data)
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [page, section])

  return { data, loading }
}

export function useAllSiteContent(page: string) {
  const [data, setData] = useState<SiteContent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    supabase.from('site_content').select('*').eq('page', page).order('created_at')
      .then(({ data: result, error }) => {
        if (!cancelled && !error) setData(result || [])
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [page])

  return { data, loading }
}
```

Write `src/hooks/useFormDownloads.ts`:

```ts
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { FormDownload } from '../supabase/types'

export function useFormDownloads(kategori?: string) {
  const [data, setData] = useState<FormDownload[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    let query = supabase.from('form_downloads').select('*').order('nomor_urut')
    if (kategori) query = query.eq('kategori', kategori)
    query.then(({ data: result, error }) => {
      if (!cancelled && !error) setData(result || [])
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [kategori])

  return { data, loading }
}

export function useFormCategories() {
  const [data, setData] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    supabase.from('form_downloads').select('kategori').order('kategori')
      .then(({ data: result, error }) => {
        if (!cancelled && !error) {
          const unique = [...new Set((result || []).map(r => r.kategori))]
          setData(unique)
        }
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  return { data, loading }
}
```

Write `src/hooks/useGoogleForms.ts`:

```ts
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { GoogleForm } from '../supabase/types'

export function useGoogleForm(halaman: 'pendaftaran' | 'kuesioner') {
  const [data, setData] = useState<GoogleForm | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    supabase.from('google_forms').select('*').eq('halaman', halaman).single()
      .then(({ data: result, error }) => {
        if (!cancelled && !error) setData(result)
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [halaman])

  return { data, loading }
}
```

- [ ] **Step 2: Create PageHero component**

Write `src/components/ui/PageHero.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface PageHeroProps {
  title: string
  breadcrumbs: BreadcrumbItem[]
  description?: string
}

export default function PageHero({ title, breadcrumbs, description }: PageHeroProps) {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-700 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <nav className="flex items-center justify-center gap-1.5 text-sm text-white/75 mb-3" aria-label="Breadcrumb">
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {item.path ? (
                <Link to={item.path} className="hover:text-white underline underline-offset-2 transition-colors">{item.label}</Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
        {description && <p className="mt-3 text-lg text-white/85 max-w-2xl mx-auto">{description}</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create CtaStrip component**

Write `src/components/ui/CtaStrip.tsx`:

```tsx
export default function CtaStrip() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Tim Kami Siap Membantu</h2>
        <p className="text-white/85 text-lg mb-6 max-w-xl mx-auto">
          Kami siap mendampingi Anda dalam proses sertifikasi dengan layanan profesional dan solusi sesuai kebutuhan.
        </p>
        <a href="https://wa.me/6280000000000" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-500/25">
          Hubungi Kami via WhatsApp
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create GoogleFormEmbed component**

Write `src/components/ui/GoogleFormEmbed.tsx`:

```tsx
import { getGoogleFormEmbedUrl } from '../../utils/googleDrive'

interface GoogleFormEmbedProps {
  formId: string
  title: string
  description?: string
}

export default function GoogleFormEmbed({ formId, title, description }: GoogleFormEmbedProps) {
  const embedUrl = getGoogleFormEmbedUrl(formId)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white border border-neutral-100 rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && <p className="text-white/85">{description}</p>}
        </div>
        <iframe src={embedUrl} className="w-full min-h-[900px] border-none" title={title}>
          Memuat formulir...
        </iframe>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create DownloadButton component**

Write `src/components/ui/DownloadButton.tsx`:

```tsx
import { Download } from 'lucide-react'
import { getGoogleDriveDownloadUrl } from '../../utils/googleDrive'

interface DownloadButtonProps {
  url: string | null
  label?: string
}

export default function DownloadButton({ url, label = 'Unduh' }: DownloadButtonProps) {
  const downloadUrl = getGoogleDriveDownloadUrl(url)

  if (!downloadUrl) {
    return <span className="text-neutral-400 text-sm">—</span>
  }

  return (
    <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download
      className="inline-flex items-center gap-1.5 bg-neutral-50 hover:bg-primary-50 text-primary-500 border border-neutral-200 hover:border-primary-300 px-3 py-1.5 rounded-md text-sm font-medium transition-all">
      <Download className="w-3.5 h-3.5" />
      {label}
    </a>
  )
}
```

- [ ] **Step 6: Create SectionRenderer component**

Write `src/components/ui/SectionRenderer.tsx`:

```tsx
import { useSiteContent } from '../../hooks/useSiteContent'

interface SectionRendererProps {
  page: string
  section: string
  fallback?: { judul?: string; deskripsi?: string; gambar_url?: string }
}

export default function SectionRenderer({ page, section, fallback }: SectionRendererProps) {
  const { data, loading } = useSiteContent(page, section)
  const content = data?.content || fallback || {}

  if (loading) {
    return <div className="animate-pulse bg-neutral-100 rounded-lg h-24" />
  }

  return (
    <div>
      {content.judul && <h3 className="text-xl font-bold text-neutral-900 mb-3">{content.judul}</h3>}
      {content.deskripsi && (
        <div className="text-neutral-600 leading-relaxed whitespace-pre-line">
          {content.deskripsi}
        </div>
      )}
      {content.gambar_url && (
        <img src={content.gambar_url} alt={content.judul || ''} className="mt-4 rounded-lg w-full" />
      )}
    </div>
  )
}
```

- [ ] **Step 7: Verify components compile**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add shared UI components and data hooks"
```

---

### Task 5: Home Page

**Files:**
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `useSiteContent` hook, `SectionRenderer`, `CtaStrip`, `PageHero`
- Produces: Full homepage with hero, services grid, about section, CTA

- [ ] **Step 1: Implement Home page**

Rewrite `src/pages/Home.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { Award, ShieldCheck, Search, ArrowRight } from 'lucide-react'
import SectionRenderer from '../components/ui/SectionRenderer'
import CtaStrip from '../components/ui/CtaStrip'

const services = [
  { icon: ShieldCheck, title: 'Skema Sertifikasi', desc: 'Skema Tipe 1b/3 untuk sertifikasi benang dan jaring alat penangkapan ikan.', path: '/layanan/sertifikasi' },
  { icon: Search, title: 'Ruang Lingkup', desc: 'Lihat lingkup sertifikasi terakreditasi yang kami layani.', path: '/ruang-lingkup' },
]

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center py-24 min-h-[calc(100vh-80px)]">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.15] mb-6">
              Lembaga Sertifikasi Produk
              <span className="block text-primary-500">Balai Besar Penangkapan Ikan</span>
            </h1>
            <p className="text-lg text-neutral-500 mb-8 max-w-xl leading-relaxed">
              LSPro BBPI adalah lembaga sertifikasi produk yang berkompeten mengeluarkan sertifikat kesesuaian kualitas produk perikanan sesuai standar yang berlaku.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/layanan/sertifikasi"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Pelajari Layanan <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/kontak"
                className="inline-flex items-center gap-2 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all">
                Hubungi Kami
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-xl">
              <Award className="w-32 h-32 text-primary-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Layanan Sertifikasi</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Kami menyediakan layanan sertifikasi produk perikanan dengan standar nasional dan internasional.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <Link key={i} to={svc.path}
                  className="group bg-white border border-neutral-100 rounded-xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-50 rounded-xl mb-5 group-hover:bg-accent-100 transition-colors">
                    <Icon className="w-8 h-8 text-accent-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{svc.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{svc.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-24 h-24 text-primary-300" />
            </div>
            <div>
              <SectionRenderer page="beranda" section="tentang"
                fallback={{
                  judul: 'Tentang LSPro BBPI',
                  deskripsi: 'LSPro BBPI adalah lembaga sertifikasi produk yang memiliki kompetensi untuk mengeluarkan sertifikat terkait kesesuaian kualitas produk sesuai dengan standar yang berlaku di bidang perikanan. Didukung oleh tenaga-tenaga ahli yang berpengalaman di bidangnya masing-masing.',
                }} />
              <Link to="/tentang-kami"
                className="inline-flex items-center gap-2 text-primary-500 font-semibold mt-4 hover:text-primary-700 transition-colors">
                Selengkapnya <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Siap Mengajukan Sertifikasi?</h2>
          <p className="text-white/85 text-lg mb-6 max-w-lg mx-auto">
            Unduh formulir yang diperlukan dan ajukan permohonan sertifikasi produk Anda sekarang.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/formulir/download"
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-neutral-100 transition-all">
              Download Formulir
            </Link>
            <Link to="/formulir/pendaftaran"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-all">
              Form Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  )
}
```

- [ ] **Step 2: Verify Home page renders**

```bash
npm run dev
```

Navigate to `localhost:5173`. Expected: Hero, services grid, about, CTA sections visible.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: implement Home page with hero, services, about, and CTA"
```

---

### Task 6: Content Pages (7 pages with identical layout)

**Files:**
- Modify: `src/pages/TentangKami.tsx`
- Modify: `src/pages/informasi/Pemeliharaan.tsx`
- Modify: `src/pages/informasi/KeluhanBanding.tsx`
- Modify: `src/pages/informasi/HakKewajiban.tsx`
- Modify: `src/pages/informasi/SumberPendanaan.tsx`
- Modify: `src/pages/informasi/BiayaSertifikasi.tsx`
- Modify: `src/pages/layanan/Sertifikasi.tsx`
- Modify: `src/pages/RuangLingkup.tsx`

**Pattern:** All these pages share the same structure: Mini Hero → Content (SectionRenderer) → CTA Strip

- [ ] **Step 1: Create reusable content page helper**

Write `src/components/ui/ContentPage.tsx`:

```tsx
import PageHero from './PageHero'
import CtaStrip from './CtaStrip'
import SectionRenderer from './SectionRenderer'

interface BreadcrumbItem { label: string; path?: string }

interface SectionDef {
  key: string
  title?: string
  fallback?: { judul?: string; deskripsi?: string; gambar_url?: string }
}

interface ContentPageProps {
  pageKey: string
  title: string
  breadcrumbs: BreadcrumbItem[]
  description?: string
  sections: SectionDef[]
}

export default function ContentPage({ pageKey, title, breadcrumbs, description, sections }: ContentPageProps) {
  return (
    <>
      <PageHero title={title} breadcrumbs={breadcrumbs} description={description} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {sections.map(s => (
            <SectionRenderer key={s.key} page={pageKey} section={s.key} fallback={s.fallback} />
          ))}
        </div>
      </div>
      <CtaStrip />
    </>
  )
}
```

- [ ] **Step 2: Implement TentangKami page**

Rewrite `src/pages/TentangKami.tsx`:

```tsx
import ContentPage from '../components/ui/ContentPage'

export default function TentangKami() {
  return (
    <ContentPage
      pageKey="tentang-kami"
      title="Tentang Kami"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Tentang Kami' }]}
      description="LSPro BBPI adalah lembaga sertifikasi produk perikanan yang berkomitmen terhadap kualitas dan integritas."
      sections={[{ key: 'hero', fallback: { judul: 'Membangun Kepercayaan Melalui Sertifikasi Berkualitas', deskripsi: 'Didukung oleh tenaga-tenaga ahli yang berpengalaman di bidangnya masing-masing...' } }]}
    />
  )
}
```

- [ ] **Step 3: Implement 5 Informasi pages**

Each follows the same pattern. Example `src/pages/informasi/Pemeliharaan.tsx`:

```tsx
import ContentPage from '../../components/ui/ContentPage'

export default function Pemeliharaan() {
  return (
    <ContentPage
      pageKey="pemeliharaan"
      title="Pemeliharaan / Perluasan"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Informasi' }, { label: 'Pemeliharaan / Perluasan' }]}
      sections={[
        { key: 'hero', fallback: { judul: 'Informasi Pemeliharaan dan Perluasan Sertifikasi' } },
        { key: 'penghentian', fallback: { judul: 'Penghentian Sertifikasi', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'pengurangan', fallback: { judul: 'Pengurangan Sertifikat', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'perluasan', fallback: { judul: 'Perluasan Sertifikat', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'pembekuan', fallback: { judul: 'Pembekuan Lingkup Sertifikasi', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'pencabutan', fallback: { judul: 'Pencabutan Lingkup Sertifikasi', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'transfer', fallback: { judul: 'Transfer Sertifikat', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'perubahan', fallback: { judul: 'Perubahan yang Mempengaruhi Persyaratan', deskripsi: 'Konten akan diisi oleh admin.' } },
      ]}
    />
  )
}
```

Implement the other 4 (KeluhanBanding, HakKewajiban, SumberPendanaan, BiayaSertifikasi) similarly with their respective section keys.

- [ ] **Step 4: Implement Skema Sertifikasi page**

`src/pages/layanan/Sertifikasi.tsx`:

```tsx
import ContentPage from '../../components/ui/ContentPage'

export default function Sertifikasi() {
  return (
    <ContentPage
      pageKey="sertifikasi"
      title="Skema Sertifikasi"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Layanan Kami' }, { label: 'Skema Sertifikasi' }]}
      description="Skema sertifikasi Tipe 1b/3 LSPro BBPI untuk benang dan jaring alat penangkapan ikan."
      sections={[
        { key: 'hero', fallback: { judul: 'Skema Sertifikasi LSPro BBPI', deskripsi: 'Konten akan diisi oleh admin.', gambar_url: '' } },
        { key: 'skema', fallback: { judul: 'Tipe 1b / Tipe 3', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'alur', fallback: { judul: 'Alur Proses Sertifikasi', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'produk', fallback: { judul: 'Produk yang Dapat Disertifikasi', deskripsi: 'Konten akan diisi oleh admin.' } },
        { key: 'dokumen', fallback: { judul: 'Dokumen Persyaratan', deskripsi: 'Konten akan diisi oleh admin.' } },
      ]}
    />
  )
}
```

- [ ] **Step 5: Implement RuangLingkup page**

Rewrite `src/pages/RuangLingkup.tsx`:

```tsx
import ContentPage from '../components/ui/ContentPage'

export default function RuangLingkup() {
  return (
    <ContentPage
      pageKey="ruang-lingkup"
      title="Ruang Lingkup"
      breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Ruang Lingkup' }]}
      description="Lingkup sertifikasi terakreditasi LSPro BBPI."
      sections={[{ key: 'hero', fallback: { judul: 'Ruang Lingkup Sertifikasi', deskripsi: 'Konten akan diisi oleh admin.' } }]}
    />
  )
}
```

- [ ] **Step 6: Verify all content pages render**

```bash
npm run build
```

Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: implement all 9 content pages with ContentPage template"
```

---

### Task 7: Visi Misi, Struktur Organisasi, Kontak Pages

**Files:**
- Modify: `src/pages/VisiMisi.tsx`
- Modify: `src/pages/StrukturOrganisasi.tsx`
- Modify: `src/pages/Kontak.tsx`

- [ ] **Step 1: Implement VisiMisi page**

Rewrite `src/pages/VisiMisi.tsx`:

```tsx
import PageHero from '../components/ui/PageHero'
import CtaStrip from '../components/ui/CtaStrip'
import SectionRenderer from '../components/ui/SectionRenderer'
import { Target, Compass } from 'lucide-react'

export default function VisiMisi() {
  return (
    <>
      <PageHero title="Visi & Misi" breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Visi & Misi' }]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-neutral-100 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-accent-500" />
              </div>
            </div>
            <SectionRenderer page="visi-misi" section="visi"
              fallback={{ judul: 'Visi', deskripsi: 'Menjadi lembaga sertifikasi yang berpusat pada pelanggan dan menjadi pendorong utama dalam pengembangan industri sertifikasi produk perikanan.' }} />
          </div>
          <div className="bg-white border border-neutral-100 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-accent-500" />
              </div>
            </div>
            <SectionRenderer page="visi-misi" section="misi"
              fallback={{ judul: 'Misi', deskripsi: '1. Mengembangkan strategi bisnis dalam sertifikasi dan standardisasi.\n2. Menghasilkan sertifikat produk yang akurat dan tepat waktu.\n3. Menyediakan layanan berkualitas secara konsisten.\n4. Menghasilkan pertumbuhan bisnis yang berkelanjutan.' }} />
          </div>
        </div>
      </div>
      <CtaStrip />
    </>
  )
}
```

- [ ] **Step 2: Implement StrukturOrganisasi page**

Rewrite `src/pages/StrukturOrganisasi.tsx`:

```tsx
import PageHero from '../components/ui/PageHero'
import CtaStrip from '../components/ui/CtaStrip'
import SectionRenderer from '../components/ui/SectionRenderer'
import { Users } from 'lucide-react'

export default function StrukturOrganisasi() {
  return (
    <>
      <PageHero title="Struktur Organisasi" breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Profil' }, { label: 'Struktur Organisasi' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-neutral-100 rounded-xl p-8 shadow-sm text-center">
          <SectionRenderer page="struktur-organisasi" section="hero"
            fallback={{ judul: 'Struktur Organisasi LSPro BBPI', gambar_url: '' }} />
          {!null && (
            <div className="mt-6 flex items-center justify-center gap-3 text-neutral-400">
              <Users className="w-12 h-12" />
              <p className="text-sm">Bagan struktur organisasi akan ditampilkan di sini</p>
            </div>
          )}
        </div>
      </div>
      <CtaStrip />
    </>
  )
}
```

- [ ] **Step 3: Implement Kontak page**

Rewrite `src/pages/Kontak.tsx`:

```tsx
import PageHero from '../components/ui/PageHero'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import SectionRenderer from '../components/ui/SectionRenderer'

export default function Kontak() {
  return (
    <>
      <PageHero title="Kontak Kami" breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Kontak Kami' }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          <div className="bg-white border border-neutral-100 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Hubungi Kami</h2>
            <div className="space-y-5">
              <ContactItem icon={MapPin} label="Alamat">
                <SectionRenderer page="kontak" section="alamat" fallback={{ deskripsi: 'Alamat BBPI' }} />
              </ContactItem>
              <ContactItem icon={Phone} label="Telepon">
                <SectionRenderer page="kontak" section="telepon" fallback={{ deskripsi: '(021) XXX-XXXX' }} />
              </ContactItem>
              <ContactItem icon={MessageCircle} label="WhatsApp">
                <SectionRenderer page="kontak" section="whatsapp" fallback={{ deskripsi: '08XX-XXXX-XXXX' }} />
              </ContactItem>
              <ContactItem icon={Mail} label="Email">
                <SectionRenderer page="kontak" section="email" fallback={{ deskripsi: 'info@bbpi.go.id' }} />
              </ContactItem>
            </div>
          </div>
          <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-[16/9] bg-neutral-100 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-neutral-300" />
              <span className="ml-3 text-neutral-400 text-sm">Google Maps embed akan ditampilkan di sini</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ContactItem({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary-500" />
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-900">{label}</p>
        <div className="text-sm text-neutral-500">{children}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verify pages render**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement VisiMisi, StrukturOrganisasi, and Kontak pages"
```

---

### Task 8: Form Pages (Download + Pendaftaran + Kuesioner)

**Files:**
- Modify: `src/pages/FormDownload.tsx`
- Modify: `src/pages/FormPendaftaran.tsx`
- Modify: `src/pages/Kuesioner.tsx`

- [ ] **Step 1: Implement FormDownload page**

Rewrite `src/pages/FormDownload.tsx`:

```tsx
import { useState } from 'react'
import PageHero from '../components/ui/PageHero'
import CtaStrip from '../components/ui/CtaStrip'
import DownloadButton from '../components/ui/DownloadButton'
import { useFormDownloads, useFormCategories } from '../hooks/useFormDownloads'

export default function FormDownload() {
  const { data: categories, loading: catLoading } = useFormCategories()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const { data: forms, loading: formLoading } = useFormDownloads(selectedCategory || undefined)

  return (
    <>
      <PageHero title="Download Formulir Kosong" breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Formulir' }, { label: 'Download Formulir Kosong' }]}
        description="Unduh formulir yang diperlukan untuk proses sertifikasi produk." />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {catLoading ? (
          <div className="animate-pulse bg-neutral-100 rounded-lg h-12 w-64 mb-6" />
        ) : (
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            className="w-full max-w-md bg-white border border-neutral-200 rounded-lg px-4 py-3 text-base font-medium text-neutral-800 mb-6 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400">
            <option value="">Semua Kategori Formulir</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}

        {formLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-neutral-100 rounded-lg h-16" />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-100 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-500 text-white">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider w-16">No</th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider w-24">Lokal</th>
                    <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider w-24">Impor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {forms.map((form, i) => (
                    <tr key={form.id} className="hover:bg-primary-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-neutral-500">{i + 1}</td>
                      <td className="px-6 py-4 text-sm text-neutral-800">{form.nama_form}</td>
                      <td className="px-6 py-4 text-center"><DownloadButton url={form.link_lokal} /></td>
                      <td className="px-6 py-4 text-center"><DownloadButton url={form.link_impor} /></td>
                    </tr>
                  ))}
                  {forms.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-neutral-400">
                        Belum ada formulir tersedia untuk kategori ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <CtaStrip />
    </>
  )
}
```

- [ ] **Step 2: Implement FormPendaftaran page**

Rewrite `src/pages/FormPendaftaran.tsx`:

```tsx
import { useGoogleForm } from '../hooks/useGoogleForms'
import GoogleFormEmbed from '../components/ui/GoogleFormEmbed'

export default function FormPendaftaran() {
  const { data, loading } = useGoogleForm('pendaftaran')

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="animate-pulse bg-neutral-100 rounded-xl h-[600px]" />
      </div>
    )
  }

  if (!data?.google_form_id) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-white border border-neutral-100 rounded-xl p-12 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Formulir Pendaftaran</h1>
          <p className="text-neutral-500">Formulir belum tersedia. Silakan hubungi admin.</p>
        </div>
      </div>
    )
  }

  return (
    <GoogleFormEmbed formId={data.google_form_id}
      title="Formulir Pendaftaran Sertifikasi Produk"
      description="Isi formulir di bawah ini untuk mengajukan permohonan sertifikasi." />
  )
}
```

- [ ] **Step 3: Implement Kuesioner page**

Rewrite `src/pages/Kuesioner.tsx`:

```tsx
import { useGoogleForm } from '../hooks/useGoogleForms'
import GoogleFormEmbed from '../components/ui/GoogleFormEmbed'

export default function Kuesioner() {
  const { data, loading } = useGoogleForm('kuesioner')

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="animate-pulse bg-neutral-100 rounded-xl h-[600px]" />
      </div>
    )
  }

  if (!data?.google_form_id) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-white border border-neutral-100 rounded-xl p-12 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Kuesioner Kepuasan Pelanggan</h1>
          <p className="text-neutral-500">Kuesioner belum tersedia. Silakan hubungi admin.</p>
        </div>
      </div>
    )
  }

  return (
    <GoogleFormEmbed formId={data.google_form_id}
      title="Kuesioner Kepuasan Pelanggan"
      description="Kami menghargai masukan Anda. Isi kuesioner di bawah ini." />
  )
}
```

- [ ] **Step 4: Verify form pages work**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement FormDownload, FormPendaftaran, and Kuesioner pages"
```

---

### Task 9: Admin Auth & Protected Route

**Files:**
- Create: `src/hooks/useAuth.ts`
- Create: `src/components/admin/ProtectedRoute.tsx`
- Modify: `src/App.tsx` (already set up, verify route structure)

- [ ] **Step 1: Create auth hook**

Write `src/hooks/useAuth.ts`:

```ts
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

- [ ] **Step 2: Create ProtectedRoute**

Write `src/components/admin/ProtectedRoute.tsx`:

```tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
```

- [ ] **Step 3: Verify protected routing**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add auth hook and ProtectedRoute"
```

---

### Task 10: Admin Layout & Login Page

**Files:**
- Create: `src/components/admin/AdminLayout.tsx`
- Modify: `src/pages/admin/Login.tsx`

- [ ] **Step 1: Create AdminLayout**

Write `src/components/admin/AdminLayout.tsx`:

```tsx
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileEdit, FileDown, Link as LinkIcon, Settings, LogOut } from 'lucide-react'
import { supabase } from '../../supabase/client'
import { useAuth } from '../../hooks/useAuth'
import { SITE_NAME } from '../../utils/constants'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
  { icon: FileEdit, label: 'Kelola Konten', path: 'halaman/beranda' },
  { icon: FileDown, label: 'Form Download', path: 'form-download' },
  { icon: LinkIcon, label: 'Google Forms', path: 'google-forms' },
  { icon: Settings, label: 'Pengaturan', path: 'settings' },
]

export default function AdminLayout() {
  const { user } = useAuth()
  const location = useLocation()
  const isLoginPage = location.pathname === '/admin'

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const isActive = (path: string) => location.pathname.includes(`/admin/${path}`)

  if (isLoginPage || !user) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen flex bg-neutral-50">
      <aside className="w-64 bg-white border-r border-neutral-200 shrink-0 hidden lg:flex flex-col">
        <div className="p-5 border-b border-neutral-100">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">BB</span>
            </div>
            <span className="font-bold text-neutral-900">{SITE_NAME}</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map(item => {
            const Icon = item.icon
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'bg-primary-50 text-primary-500' : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-500'
                }`}>
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-neutral-100">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-neutral-200">
          <span className="font-bold text-neutral-900">{SITE_NAME}</span>
          <button onClick={handleLogout} className="text-sm text-red-500 font-medium">Keluar</button>
        </div>
        <div className="p-6 max-w-5xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Implement Login page**

Rewrite `src/pages/admin/Login.tsx`:

```tsx
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase/client'
import { useAuth } from '../../hooks/useAuth'
import { LogIn } from 'lucide-react'
import { SITE_NAME } from '../../utils/constants'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    navigate('/admin/dashboard', { replace: true })
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Email atau password salah.')
    } else {
      navigate('/admin/dashboard', { replace: true })
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-4">
            <LogIn className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">{SITE_NAME}</h1>
          <p className="text-neutral-500 mt-1">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
              required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
              required className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400" />
          </div>
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify login page renders**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement AdminLayout and Login page"
```

---

### Task 11: Admin Dashboard, Settings, and Content Editor

**Files:**
- Modify: `src/pages/admin/Dashboard.tsx`
- Modify: `src/pages/admin/Settings.tsx`
- Modify: `src/pages/admin/ContentEditor.tsx`

- [ ] **Step 1: Implement Dashboard page**

Rewrite `src/pages/admin/Dashboard.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { FileEdit, FileDown, Link as LinkIcon, Settings, ExternalLink } from 'lucide-react'
import { ADMIN_PAGES } from '../../utils/constants'

const quickLinks = [
  { icon: FileEdit, label: 'Kelola Konten', desc: 'Edit konten halaman website', path: '/admin/halaman/beranda' },
  { icon: FileDown, label: 'Form Download', desc: 'Kelola link download formulir', path: '/admin/form-download' },
  { icon: LinkIcon, label: 'Google Forms', desc: 'Kelola form pendaftaran & kuesioner', path: '/admin/google-forms' },
  { icon: Settings, label: 'Pengaturan', desc: 'Ganti password admin', path: '/admin/settings' },
]

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard</h1>
      <p className="text-neutral-500 mb-8">Selamat datang di panel admin LSPro BBPI.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {quickLinks.map(link => {
          const Icon = link.icon
          return (
            <Link key={link.path} to={link.path}
              className="flex items-start gap-4 bg-white border border-neutral-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">{link.label}</h3>
                <p className="text-sm text-neutral-500 mt-0.5">{link.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="bg-white border border-neutral-100 rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-900">Halaman yang Dapat Diedit</h2>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-3">
          {ADMIN_PAGES.map(page => (
            <Link key={page.name} to={`/admin/halaman/${page.name}`}
              className="flex items-center justify-between px-4 py-3 rounded-lg border border-neutral-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all text-sm">
              <span className="font-medium text-neutral-700">{page.label}</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Implement Settings page**

Rewrite `src/pages/admin/Settings.tsx`:

```tsx
import { useState, FormEvent } from 'react'
import { supabase } from '../../supabase/client'

export default function Settings() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setMessage('Gagal: ' + error.message)
    } else {
      setMessage('Password berhasil diganti.')
      setPassword('')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Pengaturan</h1>
      <p className="text-neutral-500 mb-8">Ganti password akun admin.</p>

      <div className="max-w-md bg-white border border-neutral-100 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">Password Baru</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
              required minLength={6}
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400" />
          </div>
          {message && (
            <p className={`text-sm ${message.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`} role="alert">{message}</p>
          )}
          <button type="submit" disabled={loading}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Menyimpan...' : 'Ganti Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Implement ContentEditor page**

Rewrite `src/pages/admin/ContentEditor.tsx`:

```tsx
import { useState, useEffect, FormEvent } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../supabase/client'
import { ADMIN_PAGES } from '../../utils/constants'

export default function ContentEditor() {
  const { page } = useParams<{ page: string }>()
  const pageDef = ADMIN_PAGES.find(p => p.name === page)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [sections, setSections] = useState<Record<string, { judul: string; deskripsi: string; gambar_url: string }>>({})

  useEffect(() => {
    if (!page) return
    setLoading(true)
    supabase.from('site_content').select('*').eq('page', page)
      .then(({ data, error }) => {
        if (!error && data) {
          const map: Record<string, any> = {}
          data.forEach(row => { map[row.section] = row.content || {} })
          setSections(map)
        }
        setLoading(false)
      })
  }, [page])

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const entries = Object.entries(sections).filter(([, content]) => content.judul || content.deskripsi || content.gambar_url)
    const rows = entries.map(([section, content]) => ({
      page: page!,
      section,
      content,
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase.from('site_content').upsert(rows, { onConflict: 'page,section' })
    setSaving(false)
    if (error) {
      setMessage('Gagal menyimpan: ' + error.message)
    } else {
      setMessage('Konten berhasil disimpan!')
    }
  }

  const updateSection = (section: string, field: string, value: string) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [field]: value },
    }))
  }

  if (!pageDef) {
    return <p className="text-neutral-500">Halaman tidak ditemukan.</p>
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-neutral-100 rounded-lg h-32" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
        <Link to="/admin/dashboard" className="hover:text-primary-500">Dashboard</Link>
        <span>/</span>
        <span className="text-neutral-600">Edit: {pageDef.label}</span>
      </div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Edit: {pageDef.label}</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {pageDef.sections.map(section => {
          const data = sections[section] || {}
          return (
            <div key={section} className="bg-white border border-neutral-100 rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-4">Section: {section}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Judul</label>
                  <input type="text" value={data.judul || ''} onChange={e => updateSection(section, 'judul', e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Deskripsi</label>
                  <textarea value={data.deskripsi || ''} onChange={e => updateSection(section, 'deskripsi', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 resize-y" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">URL Gambar</label>
                  <input type="text" value={data.gambar_url || ''} onChange={e => updateSection(section, 'gambar_url', e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="https://..." />
                </div>
              </div>
            </div>
          )
        })}

        {message && (
          <p className={`text-sm ${message.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`} role="alert">{message}</p>
        )}

        <button type="submit" disabled={saving}
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Verify admin pages**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement Dashboard, Settings, and ContentEditor admin pages"
```

---

### Task 12: Admin Form Download Editor & Google Forms Editor

**Files:**
- Modify: `src/pages/admin/FormDownloadEditor.tsx`
- Modify: `src/pages/admin/GoogleFormEditor.tsx`

- [ ] **Step 1: Implement FormDownloadEditor**

Rewrite `src/pages/admin/FormDownloadEditor.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { supabase } from '../../supabase/client'
import type { FormDownload } from '../../supabase/types'
import { useFormCategories } from '../../hooks/useFormDownloads'

export default function FormDownloadEditor() {
  const { data: categories, loading: catLoading } = useFormCategories()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [forms, setForms] = useState<FormDownload[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!selectedCategory) return
    setLoading(true)
    supabase.from('form_downloads').select('*').eq('kategori', selectedCategory).order('nomor_urut')
      .then(({ data, error }) => {
        if (!error && data) setForms(data)
        setLoading(false)
      })
  }, [selectedCategory])

  const updateLink = (id: string, field: 'link_lokal' | 'link_impor', value: string) => {
    setForms(prev => prev.map(f => f.id === id ? { ...f, [field]: value || null } : f))
  }

  const addRow = () => {
    const newForm: FormDownload = {
      id: crypto.randomUUID(),
      kategori: selectedCategory,
      nama_form: '',
      link_lokal: null,
      link_impor: null,
      nomor_urut: forms.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setForms([...forms, newForm])
  }

  const removeRow = (id: string) => {
    setForms(prev => prev.filter(f => f.id !== id))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    const toUpsert = forms.map(f => ({
      id: f.id,
      kategori: selectedCategory,
      nama_form: f.nama_form,
      link_lokal: f.link_lokal || null,
      link_impor: f.link_impor || null,
      nomor_urut: f.nomor_urut,
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase.from('form_downloads').upsert(toUpsert)
    setSaving(false)
    if (error) {
      setMessage('Gagal menyimpan: ' + error.message)
    } else {
      setMessage('Form download berhasil disimpan!')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Kelola Form Download</h1>

      {catLoading ? (
        <div className="animate-pulse bg-neutral-100 rounded-lg h-12 w-72 mb-6" />
      ) : (
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
          className="w-full max-w-md bg-white border border-neutral-200 rounded-lg px-4 py-3 text-sm font-medium mb-6 focus:outline-none focus:ring-2 focus:ring-primary-400">
          <option value="">Pilih Kategori Formulir</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}

      {loading ? (
        <div className="animate-pulse bg-neutral-100 rounded-lg h-64" />
      ) : selectedCategory ? (
        <>
          <div className="bg-white border border-neutral-100 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 w-12">No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500">Nama Form</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500">Link Lokal</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500">Link Impor</th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {forms.map((form, i) => (
                  <tr key={form.id}>
                    <td className="px-4 py-2.5 text-sm text-neutral-500">{i + 1}</td>
                    <td className="px-4 py-2.5">
                      <input type="text" value={form.nama_form} onChange={e => {
                        setForms(prev => prev.map(f => f.id === form.id ? { ...f, nama_form: e.target.value } : f))
                      }} className="w-full px-3 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-400" />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="text" value={form.link_lokal || ''} onChange={e => updateLink(form.id, 'link_lokal', e.target.value)}
                        placeholder="https://drive.google.com/file/d/..." className="w-full px-3 py-2 border border-neutral-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary-400" />
                    </td>
                    <td className="px-4 py-2.5">
                      <input type="text" value={form.link_impor || ''} onChange={e => updateLink(form.id, 'link_impor', e.target.value)}
                        placeholder="https://drive.google.com/file/d/..." className="w-full px-3 py-2 border border-neutral-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary-400" />
                    </td>
                    <td className="px-4 py-2.5">
                      <button onClick={() => removeRow(form.id)} className="text-red-400 hover:text-red-600 text-sm">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button onClick={addRow}
              className="text-sm text-primary-500 hover:text-primary-700 font-medium">+ Tambah Form Baru</button>
          </div>

          {message && (
            <p className={`text-sm mt-4 ${message.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`} role="alert">{message}</p>
          )}

          <button onClick={handleSave} disabled={saving}
            className="mt-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
          </button>
        </>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 2: Implement GoogleFormEditor**

Rewrite `src/pages/admin/GoogleFormEditor.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { supabase } from '../../supabase/client'
import type { GoogleForm } from '../../supabase/types'

export default function GoogleFormEditor() {
  const [forms, setForms] = useState<GoogleForm[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.from('google_forms').select('*').order('halaman')
      .then(({ data, error }) => {
        if (!error && data) {
          const map = [...data]
          if (!map.find(f => f.halaman === 'pendaftaran')) {
            map.push({ id: crypto.randomUUID(), nama_form: 'Pendaftaran Sertifikasi', google_form_id: '', halaman: 'pendaftaran', created_at: '', updated_at: '' })
          }
          if (!map.find(f => f.halaman === 'kuesioner')) {
            map.push({ id: crypto.randomUUID(), nama_form: 'Kuesioner Kepuasan', google_form_id: '', halaman: 'kuesioner', created_at: '', updated_at: '' })
          }
          setForms(map)
        }
        setLoading(false)
      })
  }, [])

  const updateFormId = (halaman: string, value: string) => {
    setForms(prev => prev.map(f => f.halaman === halaman ? { ...f, google_form_id: value } : f))
  }

  const handleSave = async () => {
    setSaving(true)
    const rows = forms.map(f => ({
      id: f.id,
      nama_form: f.nama_form,
      google_form_id: f.google_form_id,
      halaman: f.halaman,
      updated_at: new Date().toISOString(),
    }))
    const { error } = await supabase.from('google_forms').upsert(rows, { onConflict: 'halaman' })
    setSaving(false)
    if (error) {
      setMessage('Gagal: ' + error.message)
    } else {
      setMessage('Google Forms berhasil disimpan!')
    }
  }

  if (loading) return <div className="animate-pulse bg-neutral-100 rounded-lg h-48" />

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Kelola Google Forms</h1>
      <p className="text-neutral-500 mb-8">Atur Google Form ID untuk halaman pendaftaran dan kuesioner.</p>

      <div className="max-w-xl space-y-6">
        {forms.map(form => (
          <div key={form.halaman} className="bg-white border border-neutral-100 rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-neutral-900 mb-1">{form.nama_form}</h3>
            <p className="text-xs text-neutral-400 mb-3">Halaman: /{form.halaman === 'pendaftaran' ? 'formulir/pendaftaran' : 'kuesioner'}</p>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Google Form ID</label>
            <input type="text" value={form.google_form_id} onChange={e => updateFormId(form.halaman, e.target.value)}
              placeholder="1FAIpQLSd..."
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400" />
          </div>
        ))}

        <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 text-sm text-primary-700">
          <p className="font-semibold mb-1">Petunjuk:</p>
          <ol className="list-decimal list-inside space-y-1 text-primary-600">
            <li>Buka Google Form Anda</li>
            <li>Klik "Kirim" → tab <code className="bg-primary-100 px-1 rounded">&lt;/&gt;</code></li>
            <li>Copy ID dari embed URL. Format: <code className="bg-primary-100 px-1 rounded">/d/e/&#123;ID&#125;/viewform</code></li>
            <li>Paste ID di atas</li>
          </ol>
        </div>

        {message && (
          <p className={`text-sm ${message.includes('berhasil') ? 'text-green-600' : 'text-red-500'}`} role="alert">{message}</p>
        )}

        <button onClick={handleSave} disabled={saving}
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50">
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify both editors compile**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: implement FormDownloadEditor and GoogleFormEditor admin pages"
```

---

### Task 13: Supabase Database Setup

**Files:**
- Create: `supabase-setup.sql`

**Note:** This task creates a reference SQL file. The actual table creation is done in Supabase Dashboard.

- [ ] **Step 1: Create SQL migration file**

Write `supabase-setup.sql`:

```sql
-- site_content: Dynamic page content
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (page, section)
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Admin write site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- form_downloads: Google Drive form download links
CREATE TABLE form_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kategori TEXT NOT NULL,
  nama_form TEXT NOT NULL,
  link_lokal TEXT,
  link_impor TEXT,
  nomor_urut INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE form_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read form_downloads" ON form_downloads FOR SELECT USING (true);
CREATE POLICY "Admin write form_downloads" ON form_downloads FOR ALL USING (auth.role() = 'authenticated');

-- google_forms: Google Form embed IDs
CREATE TABLE google_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_form TEXT NOT NULL,
  google_form_id TEXT NOT NULL,
  halaman TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (halaman)
);

ALTER TABLE google_forms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read google_forms" ON google_forms FOR SELECT USING (true);
CREATE POLICY "Admin write google_forms" ON google_forms FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket for images
-- Create via Supabase Dashboard: bucket name "website-images", public read, authenticated write
```

- [ ] **Step 2: Instructions for Supabase Dashboard setup**

The admin should:
1. Go to Supabase project → SQL Editor → paste and run `supabase-setup.sql`
2. Go to Storage → create bucket `website-images` → set public
3. Go to Authentication → Settings → enable Email/Password sign-in
4. Create admin user via Authentication → Users → Add User (or use sign-up API)

- [ ] **Step 3: Commit**

```bash
git add supabase-setup.sql
git commit -m "feat: add Supabase database migration SQL file"
```

---

### Task 14: Vercel Deployment Setup

**Files:**
- Create: `vercel.json`
- Modify: `index.html` (update title)

- [ ] **Step 1: Create Vercel config**

Write `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

- [ ] **Step 2: Update index.html title**

Edit `index.html`: Change `<title>` to `LSPro BBPI - Balai Besar Penangkapan Ikan`

- [ ] **Step 3: Update meta description**

Edit `index.html`: Add `<meta name="description" content="Lembaga Sertifikasi Produk Balai Besar Penangkapan Ikan">` inside `<head>`.

- [ ] **Step 4: Production build test**

```bash
npm run build
npm run preview
```

Expected: Build succeeds, preview server runs. Navigate to `localhost:4173`.

- [ ] **Step 5: Deploy to Vercel via CLI**

```bash
npx vercel --prod
```

Follow prompts. Set environment variables:
- `VITE_SUPABASE_URL` = your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Vercel deployment config"
```

---

### Task 15: Polish & Accessibility Audit

**Files:** (various — review and fix)

- [ ] **Step 1: Add scroll-to-top on route change**

Write `src/hooks/useScrollToTop.ts`:

```ts
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
}
```

Import and call `useScrollToTop()` in `Layout.tsx`.

- [ ] **Step 2: Add reduced-motion support**

Add to `src/index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Add skip-to-content link**

Add at the very top of `Layout.tsx`, before Header:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded z-50">
  Lewati ke konten utama
</a>
```

Add `id="main-content"` to the `<main>` element in Layout.

- [ ] **Step 4: Verify accessibility**

Manual checks:
- Tab through all interactive elements — focus rings visible
- All icons in nav have accessible labels
- Heading hierarchy correct (h1 in hero, h2 for sections, h3 for subsections)
- Images have alt text (SectionRenderer uses content.judul as alt)

- [ ] **Step 5: Build and final test**

```bash
npm run build
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add polish, scroll-to-top, reduced-motion, skip-to-content"
```

---

## Summary

| Task | File Count | Description |
|------|-----------|-------------|
| 1 | 6 | Project scaffolding (Vite + React + TS + Tailwind) |
| 2 | 8 | Supabase client, types, constants, routing with 22 routes |
| 3 | 3 | Header, Footer, Layout with dropdown nav + mobile menu |
| 4 | 9 | Shared UI components + 3 data hooks |
| 5 | 1 | Home page (hero, services, about, CTA) |
| 6 | 9 | 9 content pages via ContentPage template |
| 7 | 3 | VisiMisi, StrukturOrganisasi, Kontak |
| 8 | 3 | FormDownload (table), FormPendaftaran (embed), Kuesioner (embed) |
| 9 | 2 | Auth hook + ProtectedRoute |
| 10 | 2 | AdminLayout (sidebar) + Login page |
| 11 | 3 | Dashboard, Settings, ContentEditor |
| 12 | 2 | FormDownloadEditor, GoogleFormEditor |
| 13 | 1 | Supabase SQL migration + setup instructions |
| 14 | 2 | Vercel config + HTML meta tags |
| 15 | 2 | Polish: scroll-to-top, a11y, reduced-motion |
| **Total** | **56** | |

### After Each Task
```bash
npm run build   # Verify no TypeScript errors
git add -A
git commit -m "feat: [task description]"
```
