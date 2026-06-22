import { createClient } from '@supabase/supabase-js'
import type { SiteContent, FormDownload, SiteSetting } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (null as unknown as ReturnType<typeof createClient>)

if (!hasSupabaseConfig && import.meta.env.DEV) {
  console.warn('Supabase config missing. App will use fallback/empty data. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
}

export type { SiteContent, FormDownload, SiteSetting }
