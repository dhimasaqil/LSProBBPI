import { useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../lib/supabase'
import type { GoogleForm } from '../types'

interface UseGoogleFormsResult {
  data: GoogleForm[]
  loading: boolean
  error: Error | null
}

export function useGoogleForms(): UseGoogleFormsResult {
  const [data, setData] = useState<GoogleForm[]>([])
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
          .from('google_forms')
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

export function useGoogleFormBySlug(slug: string): GoogleForm | null {
  const { data } = useGoogleForms()
  return data.find(f => f.slug === slug) || null
}
