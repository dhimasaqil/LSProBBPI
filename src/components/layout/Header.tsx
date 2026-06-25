import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Mail } from 'lucide-react'
import { NAV_ITEMS, CONTACT, SITE_NAME } from '../../constants'

function NavDropdown({ item }: { item: { label: string; children?: { label: string; path: string }[] } }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isActive = item.children?.some(c => location.pathname === c.path)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'text-primary' : 'text-neutral-700 hover:text-primary'
        }`}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && item.children && (
        <div className="absolute top-full left-0 min-w-[240px] bg-white rounded-lg shadow-lg border border-neutral-100 py-2 z-50">
          {item.children.map(child => (
            <Link
              key={child.path}
              to={child.path}
              className={`block px-4 py-2 text-sm transition-colors ${
                location.pathname === child.path
                  ? 'text-primary bg-primary/5'
                  : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary text-white text-xs py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1 hover:text-white/80">
              <Mail className="w-3 h-3" />
              <span>{CONTACT.email}</span>
            </a>
          </div>
          <span className="opacity-90">Kementerian Kelautan dan Perikanan RI</span>
        </div>
      </div>

      <div
        className={`bg-white border-b transition-shadow ${
          scrolled ? 'shadow-md border-neutral-200' : 'border-neutral-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/Logo LSPRO.png"
                alt="Logo LSPro BBPI"
                className="h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-primary leading-tight">{SITE_NAME}</div>
                <div className="text-xs text-neutral-500">{CONTACT.shortAddress}</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(item =>
                item.children ? (
                  <NavDropdown key={item.label} item={item} />
                ) : (
                  <Link
                    key={item.path}
                    to={item.path!}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-neutral-700 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <button
              className="lg:hidden p-2 text-neutral-700 hover:text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map(item =>
              item.children ? (
                <div key={item.label} className="space-y-1">
                  <div className="px-3 py-2 text-sm font-semibold text-neutral-900">{item.label}</div>
                  {item.children.map(child => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block px-3 py-2 text-sm rounded-md ${
                        location.pathname === child.path
                          ? 'text-primary bg-primary/5'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path!}
                  className={`block px-3 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/5'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
