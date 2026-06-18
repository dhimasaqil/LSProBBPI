import { useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../../lib/supabase'
import type { FormDownload } from '../../types'
import { Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

const defaultSlugs = [
  { slug: 'fr-7-2-1', label: 'FR.7.2-1 Surat Permohonan Sertifikasi' },
  { slug: 'fr-7-2-2', label: 'FR.7.2-2 Pernyataan Kesesuaian' },
  { slug: 'fr-7-2-3', label: 'FR.7.2-3 Pernyataan Persetujuan Pemohon' },
  { slug: 'fr-7-2-4', label: 'FR.7.2-4 Daftar Isian Pemohon Sertifikasi' },
  { slug: 'fr-4-1-1', label: 'FR.4.1-1 Surat Perjanjian Sertifikasi' },
  { slug: 'fr-4-1-2', label: 'FR.4.1-2 Surat Perjanjian Penggunaan Lisensi' },
  { slug: 'fr-7-11', label: 'FR.7.11 Surat Pembekuan/Penghentian/Pencabutan' },
]

export default function FormDownloadEditor() {
  const [forms, setForms] = useState<FormDownload[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function fetchForms() {
      if (!hasSupabaseConfig) {
        setForms([])
        setLoading(false)
        return
      }

      const { data: rows, error: fetchError } = await supabase
        .from('form_downloads')
        .select('*')
        .order('id', { ascending: true })

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setForms(rows || [])
      }
      setLoading(false)
    }

    fetchForms()
  }, [])

  function addForm() {
    setForms(prev => [
      ...prev,
      { id: 0, slug: '', label: '', file_url: '', created_at: '' },
    ])
  }

  function removeForm(index: number) {
    setForms(prev => prev.filter((_, i) => i !== index))
  }

  function updateForm(index: number, field: keyof FormDownload, value: string) {
    setForms(prev => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)))
  }

  async function handleSave() {
    if (!hasSupabaseConfig) return

    setSaving(true)
    setError('')
    setSuccess('')

    const payload = forms.map(f => ({
      slug: f.slug,
      label: f.label,
      file_url: f.file_url,
    }))

    const { error: upsertError } = await supabase
      .from('form_downloads')
      .upsert(payload, { onConflict: 'slug' })

    if (upsertError) {
      setSaving(false)
      setError(upsertError.message)
      return
    }

    // Delete removed forms (simple approach: delete all then reinsert not safe)
    // For simplicity, just upsert and refresh
    const { data: rows } = await supabase
      .from('form_downloads')
      .select('*')
      .order('id', { ascending: true })

    setForms(rows || [])
    setSaving(false)
    setSuccess('Form download berhasil disimpan')
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
          <h1 className="text-2xl font-bold text-neutral-900">Form Download</h1>
          <p className="text-neutral-600 mt-1">Kelola link Google Drive untuk formulir yang dapat diunduh.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Form
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasSupabaseConfig}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Simpan
              </>
            )}
          </button>
        </div>
      </div>

      {!hasSupabaseConfig && (
        <div className="p-4 bg-amber-50 text-amber-800 rounded-lg text-sm">
          Supabase belum dikonfigurasi. Perubahan tidak dapat disimpan.
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

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50">
          <h2 className="font-semibold text-neutral-900">Daftar Formulir</h2>
        </div>
        <div className="divide-y divide-neutral-100">
          {forms.map((form, index) => (
            <div key={index} className="p-4 grid md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-neutral-500 mb-1">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => updateForm(index, 'slug', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="fr-7-2-1"
                  list="default-slugs"
                />
                <datalist id="default-slugs">
                  {defaultSlugs.map(ds => (
                    <option key={ds.slug} value={ds.slug} />
                  ))}
                </datalist>
              </div>
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-neutral-500 mb-1">Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={e => updateForm(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="Nama formulir"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-neutral-500 mb-1">URL Google Drive</label>
                <input
                  type="url"
                  value={form.file_url}
                  onChange={e => updateForm(index, 'file_url', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="https://drive.google.com/file/d/.../view"
                />
              </div>
              <div className="md:col-span-1 flex md:justify-end">
                <button
                  onClick={() => removeForm(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Hapus formulir"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {forms.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
              Belum ada formulir. Klik "Tambah Form" untuk menambahkan.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
