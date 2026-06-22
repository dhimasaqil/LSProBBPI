import { Link } from 'react-router-dom'
import { FileText, Download, Settings, ExternalLink } from 'lucide-react'
import { ADMIN_PAGES } from '../../constants'

const quickLinks = [
  { to: '/admin/form-download', label: 'Kelola Form Download', icon: Download, desc: 'Atur link Google Drive formulir' },
  { to: '/admin/settings', label: 'Pengaturan Akun', icon: Settings, desc: 'Ubah password admin' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-1">Kelola konten website LSPro BBPI dari satu tempat.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADMIN_PAGES.map(page => (
          <Link
            key={page.name}
            to={`/admin/halaman/${page.name}`}
            className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary" />
            </div>
            <h3 className="font-semibold text-neutral-900 mt-4">{page.label}</h3>
            <p className="text-sm text-neutral-500 mt-1">{page.sections.length} bagian konten</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Pengaturan Cepat</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-4 p-4 rounded-lg border border-neutral-100 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                <link.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">{link.label}</h3>
                <p className="text-xs text-neutral-500">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
