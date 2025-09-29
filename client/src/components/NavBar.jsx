import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/authContext.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth() || {}
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const dashboardPath =
    user?.role === 'Admin'
      ? '/admin'
      : user?.role === 'Reviewer'
      ? '/reviewer'
      : user?.role === 'Author'
      ? '/author'
      : null

  return (
    <header className="header sticky top-0 z-50 bg-white shadow">
      <div className="header-container flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link to="/" className="logo flex items-center gap-2 text-xl font-bold">
          <i className="logo-icon fas fa-book-open" />
          <span className="logo-text">RPMS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex gap-6">
            <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink></li>
            <li><NavLink to="/call-for-papers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Call for Papers</NavLink></li>
            <li><NavLink to="/speakers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Speakers</NavLink></li>
            <li><NavLink to="/committee" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Committee</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink></li>
            {user && dashboardPath && (
              <li><NavLink to={dashboardPath} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink></li>
            )}
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          ) : (
            <>
              {dashboardPath && (
                <button className="btn btn-outline" onClick={() => navigate(dashboardPath)}>
                  {user.role} Dashboard
                </button>
              )}
              <button className="btn btn-primary" onClick={() => { logout(); navigate('/') }}>Logout</button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-4 py-4 space-y-4">
          <nav>
            <ul className="flex flex-col gap-3">
              <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
              <li><NavLink to="/call-for-papers" onClick={() => setMenuOpen(false)}>Call for Papers</NavLink></li>
              <li><NavLink to="/speakers" onClick={() => setMenuOpen(false)}>Speakers</NavLink></li>
              <li><NavLink to="/committee" onClick={() => setMenuOpen(false)}>Committee</NavLink></li>
              <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
              {user && dashboardPath && (
                <li><NavLink to={dashboardPath} onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
              )}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 mt-4">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            ) : (
              <>
                {dashboardPath && (
                  <button className="btn btn-outline" onClick={() => { navigate(dashboardPath); setMenuOpen(false) }}>
                    {user.role} Dashboard
                  </button>
                )}
                <button className="btn btn-primary" onClick={() => { logout(); navigate('/'); setMenuOpen(false) }}>Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
