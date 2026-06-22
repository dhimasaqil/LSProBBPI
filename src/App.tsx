import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Home from './pages/Home'
import TentangKami from './pages/TentangKami'
import VisiMisi from './pages/VisiMisi'
import StrukturOrganisasi from './pages/StrukturOrganisasi'
import Pemeliharaan from './pages/informasi/Pemeliharaan'
import KeluhanBanding from './pages/informasi/KeluhanBanding'
import HakKewajiban from './pages/informasi/HakKewajiban'
import SumberPendanaan from './pages/informasi/SumberPendanaan'
import BiayaSertifikasi from './pages/informasi/BiayaSertifikasi'
import Sertifikasi from './pages/layanan/Sertifikasi'
import RuangLingkup from './pages/RuangLingkup'
import FormDownload from './pages/FormDownload'
import Kontak from './pages/Kontak'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ContentEditor from './pages/admin/ContentEditor'
import FormDownloadEditor from './pages/admin/FormDownloadEditor'
import Settings from './pages/admin/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tentang-kami" element={<TentangKami />} />
          <Route path="visi-misi" element={<VisiMisi />} />
          <Route path="struktur-organisasi" element={<StrukturOrganisasi />} />
          <Route path="informasi/pemeliharaan" element={<Pemeliharaan />} />
          <Route path="informasi/keluhan-banding" element={<KeluhanBanding />} />
          <Route path="informasi/hak-kewajiban" element={<HakKewajiban />} />
          <Route path="informasi/sumber-pendanaan" element={<SumberPendanaan />} />
          <Route path="informasi/biaya-sertifikasi" element={<BiayaSertifikasi />} />
          <Route path="layanan/sertifikasi" element={<Sertifikasi />} />
          <Route path="ruang-lingkup" element={<RuangLingkup />} />
          <Route path="formulir/download" element={<FormDownload />} />
          <Route path="kontak" element={<Kontak />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="halaman/:page" element={<ProtectedRoute><ContentEditor /></ProtectedRoute>} />
          <Route path="form-download" element={<ProtectedRoute><FormDownloadEditor /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
