import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Download, Settings, LogOut, Menu } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { ADMIN_PAGES, SITE_NAME } from '../../constants'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ...ADMIN_PAGES.map(page => ({
    to: `/admin/halaman/${page.name}`,
    label: page.label,
    icon: FileText,
  })),
  { to: '/admin/form-download', label: 'Form Download', icon: Download },
  { to: '/admin/settings', label: 'Pengaturan', icon: Settings },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await signOut()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 text-white transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-neutral-800">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src="/logo-bbpi.png" alt="" className="h-10 w-auto bg-white rounded p-1" />
              <div>
                <div className="font-bold leading-tight">{SITE_NAME}</div>
                <div className="text-xs text-neutral-400">Admin</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-neutral-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-neutral-700 hover:text-primary"
              aria-label="Buka menu admin"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-neutral-900 hidden lg:block">Panel Administrasi</h1>
            <div className="flex items-center gap-3">
              <Link to="/" className="text-sm text-neutral-600 hover:text-primary">
                Lihat Website
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
