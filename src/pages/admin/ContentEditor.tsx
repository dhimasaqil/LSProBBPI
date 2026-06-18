import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase, hasSupabaseConfig } from '../../lib/supabase'
import { ADMIN_PAGES } from '../../constants'
import type { SiteContent } from '../../types'
import { Save, Loader2, AlertCircle, CheckCircle2, Image } from 'lucide-react'

interface SectionFormData {
  key: string
  judul: string
  deskripsi: string
  gambar_url: string
}

export default function ContentEditor() {
  const { page } = useParams<{ page: string }>()
  const pageDef = ADMIN_PAGES.find(p => p.name === page)

  const [sections, setSections] = useState<SectionFormData[]>([])
  const [loading, setLoading] = useState(Boolean(pageDef) && hasSupabaseConfig)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!pageDef) return
    const def = pageDef

    async function fetchContent() {
      if (!hasSupabaseConfig) {
        setSections(
          def.sections.map(key => ({
            key,
            judul: '',
            deskripsi: '',
            gambar_url: '',
          }))
        )
        setLoading(false)
        return
      }

      const { data: rows, error: fetchError } = await supabase
        .from('site_content')
        .select('*')
        .eq('page', def.name)

      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }

      const rowMap = new Map<string, SiteContent>()
      rows?.forEach(row => rowMap.set(row.section, row))

      setSections(
        def.sections.map(key => {
          const existing = rowMap.get(key)
          return {
            key,
            judul: existing?.judul || '',
            deskripsi: existing?.deskripsi || '',
            gambar_url: existing?.gambar_url || '',
          }
        })
      )
      setLoading(false)
    }

    fetchContent()
  }, [pageDef])

  function updateSection(key: string, field: keyof SectionFormData, value: string) {
    setSections(prev => prev.map(s => (s.key === key ? { ...s, [field]: value } : s)))
  }

  async function handleSave() {
    if (!pageDef || !hasSupabaseConfig) return

    setSaving(true)
    setError('')
    setSuccess('')

    const upserts = sections.map(s => ({
      page: pageDef.name,
      section: s.key,
      judul: s.judul,
      deskripsi: s.deskripsi,
      gambar_url: s.gambar_url || null,
    }))

    const { error: upsertError } = await supabase
      .from('site_content')
      .upsert(upserts, { onConflict: 'page,section' })

    setSaving(false)

    if (upsertError) {
      setError(upsertError.message)
      return
    }

    setSuccess('Konten berhasil disimpan')
  }

  if (!pageDef) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-6 h-6" />
        <div>
          <h2 className="font-semibold">Halaman tidak ditemukan</h2>
          <p className="text-sm">Pastikan URL admin benar.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{pageDef.label}</h1>
          <p className="text-neutral-600 mt-1">Edit konten halaman {pageDef.label.toLowerCase()}.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !hasSupabaseConfig}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Simpan Perubahan
            </>
          )}
        </button>
      </div>

      {!hasSupabaseConfig && (
        <div className="p-4 bg-amber-50 text-amber-800 rounded-lg text-sm">
          Supabase belum dikonfigurasi. Perubahan tidak dapat disimpan. Silakan atur VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env.
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {success}
        </div>
      )}

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.key} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <h2 className="text-lg font-semibold text-neutral-900 capitalize">{section.key.replace(/-/g, ' ')}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Judul</label>
                <input
                  type="text"
                  value={section.judul}
                  onChange={e => updateSection(section.key, 'judul', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="Judul bagian"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Deskripsi (HTML didukung)</label>
                <textarea
                  value={section.deskripsi}
                  onChange={e => updateSection(section.key, 'deskripsi', e.target.value)}
                  rows={8}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm"
                  placeholder="Konten bagian, dapat menggunakan tag HTML"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">URL Gambar (opsional)</label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="url"
                    value={section.gambar_url}
                    onChange={e => updateSection(section.key, 'gambar_url', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="https://contoh.com/gambar.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
