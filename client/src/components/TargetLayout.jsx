import { Outlet } from 'react-router-dom'
import Navbar from './NavBar.jsx'
import Footer from './Footer.jsx'

export default function TargetLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
