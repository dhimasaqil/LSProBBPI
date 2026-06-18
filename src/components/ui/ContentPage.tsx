import PageHero from './PageHero'
import CtaStrip from './CtaStrip'
import SectionRenderer from './SectionRenderer'

interface BreadcrumbItem {
  label: string
  path?: string
}

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-12">
          {sections.map(s => (
            <SectionRenderer
              key={s.key}
              page={pageKey}
              section={s.key}
              fallback={s.fallback}
            />
          ))}
        </div>
      </div>
      <CtaStrip />
    </>
  )
}
