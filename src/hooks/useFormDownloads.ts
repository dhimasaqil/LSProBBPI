import { useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../lib/supabase'
import type { FormDownload } from '../types'

interface UseFormDownloadsResult {
  data: FormDownload[]
  loading: boolean
  error: Error | null
}

export function useFormDownloads(): UseFormDownloadsResult {
  const [data, setData] = useState<FormDownload[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchForms() {
      if (!hasSupabaseConfig) {
        setLoading(false)
        return
      }

      try {
        const { data: rows, error: supaError } = await supabase
          .from('form_downloads')
          .select('*')
          .order('id', { ascending: true })

        if (cancelled) return

        if (supaError) {
          setError(new Error(supaError.message))
        } else {
          setData(rows || [])
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchForms()

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
