import { useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../../lib/supabase'
import type { GoogleForm } from '../../types'
import { Plus, Trash2, Save, Loader2, AlertCircle, CheckCircle2, FormInput } from 'lucide-react'

const defaultForms = [
  { slug: 'pendaftaran', label: 'Formulir Pendaftaran' },
  { slug: 'kuesioner', label: 'Kuesioner' },
]

export default function GoogleFormEditor() {
  const [forms, setForms] = useState<GoogleForm[]>([])
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
        .from('google_forms')
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
      { id: 0, slug: '', form_id: '', created_at: '' },
    ])
  }

  function removeForm(index: number) {
    setForms(prev => prev.filter((_, i) => i !== index))
  }

  function updateForm(index: number, field: keyof GoogleForm, value: string) {
    setForms(prev => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)))
  }

  async function handleSave() {
    if (!hasSupabaseConfig) return

    setSaving(true)
    setError('')
    setSuccess('')

    const payload = forms.map(f => ({
      slug: f.slug,
      form_id: f.form_id,
    }))

    const { error: upsertError } = await supabase
      .from('google_forms')
      .upsert(payload, { onConflict: 'slug' })

    if (upsertError) {
      setSaving(false)
      setError(upsertError.message)
      return
    }

    const { data: rows } = await supabase
      .from('google_forms')
      .select('*')
      .order('id', { ascending: true })

    setForms(rows || [])
    setSaving(false)
    setSuccess('Google Forms berhasil disimpan')
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
          <h1 className="text-2xl font-bold text-neutral-900">Google Forms</h1>
          <p className="text-neutral-600 mt-1">
            Kelola Google Form ID untuk formulir pendaftaran dan kuesioner.
          </p>
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
          <h2 className="font-semibold text-neutral-900">Daftar Google Forms</h2>
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
                  placeholder="pendaftaran"
                  list="default-form-slugs"
                />
                <datalist id="default-form-slugs">
                  {defaultForms.map(df => (
                    <option key={df.slug} value={df.slug} />
                  ))}
                </datalist>
              </div>
              <div className="md:col-span-8">
                <label className="block text-xs font-medium text-neutral-500 mb-1">Google Form ID</label>
                <div className="relative">
                  <FormInput className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={form.form_id}
                    onChange={e => updateForm(index, 'form_id', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="1FAIpQLS..."
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Masukkan bagian ID dari URL Google Form embed. Contoh: https://docs.google.com/forms/d/e/<strong>ID_DISINI</strong>/viewform
                </p>
              </div>
              <div className="md:col-span-1 flex md:justify-end">
                <button
                  onClick={() => removeForm(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Hapus form"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {forms.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
              Belum ada Google Form. Klik "Tambah Form" untuk menambahkan.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
