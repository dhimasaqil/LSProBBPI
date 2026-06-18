import { useSiteContent } from '../../hooks/useSiteContent'

interface SectionRendererProps {
  page: string
  section: string
  fallback?: {
    judul?: string
    deskripsi?: string
    gambar_url?: string
  }
  className?: string
}

export default function SectionRenderer({ page, section, fallback, className = '' }: SectionRendererProps) {
  const { data, loading } = useSiteContent(page, section)

  const content = data || fallback || { judul: '', deskripsi: '', gambar_url: '' }

  if (loading) {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="h-8 bg-neutral-200 rounded w-1/3" />
        <div className="h-4 bg-neutral-200 rounded w-full" />
        <div className="h-4 bg-neutral-200 rounded w-5/6" />
      </div>
    )
  }

  return (
    <section className={className} id={section}>
      {content.judul && (
        <h2 className="text-2xl font-bold text-primary mb-4">{content.judul}</h2>
      )}
      {content.gambar_url && (
        <img
          src={content.gambar_url}
          alt={content.judul || ''}
          className="w-full max-w-2xl rounded-lg mb-6 object-cover"
        />
      )}
      {content.deskripsi && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content.deskripsi }}
        />
      )}
    </section>
  )
}
