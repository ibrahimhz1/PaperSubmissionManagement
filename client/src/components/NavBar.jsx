import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/authContext.jsx'

export default function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-semibold">Research System</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/about" className={({isActive})=> isActive? 'text-blue-600':'text-gray-600'}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=> isActive? 'text-blue-600':'text-gray-600'}>Contact</NavLink>
          {!user && (
            <>
              <NavLink to="/login" className={({isActive})=> isActive? 'text-blue-600':'text-gray-600'}>Login</NavLink>
              <NavLink to="/register" className={({isActive})=> isActive? 'text-blue-600':'text-gray-600'}>Register</NavLink>
            </>
          )}
          {user && (
            <div className="flex items-center gap-2">
              {user.role === 'Author' && <NavLink to="/author">Author</NavLink>}
              {user.role === 'Reviewer' && <NavLink to="/reviewer">Reviewer</NavLink>}
              {user.role === 'Admin' && <NavLink to="/admin">Admin</NavLink>}
              <button className="text-red-600" onClick={()=>{ logout(); navigate('/'); }}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
