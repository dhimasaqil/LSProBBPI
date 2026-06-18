export interface SiteContent {
  id: number
  page: string
  section: string
  judul: string
  deskripsi: string
  gambar_url: string | null
  created_at: string
  updated_at: string
}

export interface FormDownload {
  id: number
  slug: string
  label: string
  file_url: string
  created_at: string
}

export interface GoogleForm {
  id: number
  slug: string
  form_id: string
  created_at: string
}

export interface SiteSetting {
  id: number
  key: string
  value: string
  created_at: string
}

export interface NavItem {
  label: string
  path?: string
  children?: { label: string; path: string }[]
}

export interface AdminPageDef {
  name: string
  label: string
  sections: string[]
}
