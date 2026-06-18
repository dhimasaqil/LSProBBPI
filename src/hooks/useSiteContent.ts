import { useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../lib/supabase'
import type { SiteContent } from '../types'

interface UseSiteContentResult {
  data: SiteContent | null
  loading: boolean
  error: Error | null
}

export function useSiteContent(page: string, section: string): UseSiteContentResult {
  const [data, setData] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchContent() {
      if (!hasSupabaseConfig) {
        setLoading(false)
        return
      }

      try {
        const { data: rows, error: supaError } = await supabase
          .from('site_content')
          .select('*')
          .eq('page', page)
          .eq('section', section)
          .order('id', { ascending: false })
          .limit(1)

        if (cancelled) return

        if (supaError) {
          setError(new Error(supaError.message))
        } else {
          setData(rows?.[0] || null)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchContent()

    return () => {
      cancelled = true
    }
  }, [page, section])

  return { data, loading, error }
}

export function useSiteContentByPage(page: string): { data: SiteContent[]; loading: boolean; error: Error | null } {
  const [data, setData] = useState<SiteContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchContent() {
      if (!hasSupabaseConfig) {
        setLoading(false)
        return
      }

      try {
        const { data: rows, error: supaError } = await supabase
          .from('site_content')
          .select('*')
          .eq('page', page)

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

    fetchContent()

    return () => {
      cancelled = true
    }
  }, [page])

  return { data, loading, error }
}
