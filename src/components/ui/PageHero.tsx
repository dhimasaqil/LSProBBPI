import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface PageHeroProps {
  title: string
  breadcrumbs: BreadcrumbItem[]
  description?: string
  backgroundImage?: string
}

export default function PageHero({ title, breadcrumbs, description, backgroundImage = '/Background Update.jpeg' }: PageHeroProps) {
  return (
    <section
      className="relative bg-primary py-16 lg:py-24 overflow-hidden"
      aria-label="Halaman judul"
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/55" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center text-sm text-white/90">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                {item.path ? (
                  <Link to={item.path} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">{title}</h1>
        {description && (
          <p className="text-lg text-white max-w-3xl drop-shadow-md">{description}</p>
        )}
      </div>
    </section>
  )
}
