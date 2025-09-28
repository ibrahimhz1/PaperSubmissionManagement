import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/authContext.jsx'

export default function TargetLayout(){
  const { user, logout } = useAuth() || {}
  const navigate = useNavigate()

  const dashboardPath = user?.role === 'Admin' ? '/admin' : user?.role === 'Reviewer' ? '/reviewer' : user?.role === 'Author' ? '/author' : null

  function toggleMobile(){
    const navMenu = document.getElementById('navMenu');
    const authButtons = document.getElementById('authButtons');
    const icon = document.getElementById('mobileMenuIcon');
    navMenu?.classList.toggle('active');
    authButtons?.classList.toggle('active');
    if (icon){
      const has = navMenu?.classList.contains('active')
      icon.classList.toggle('fa-bars', !has)
      icon.classList.toggle('fa-times', !!has)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <i className="logo-icon fas fa-book-open" />
            <span className="logo-text">RPMS</span>
          </Link>
          <nav>
            <ul className="nav-menu" id="navMenu">
              <li><NavLink to="/" className={({isActive})=> `nav-link ${isActive? 'active':''}`}>Home</NavLink></li>
              <li><NavLink to="/about" className={({isActive})=> `nav-link ${isActive? 'active':''}`}>About</NavLink></li>
              <li><NavLink to="/contact" className={({isActive})=> `nav-link ${isActive? 'active':''}`}>Contact</NavLink></li>
              {user && dashboardPath && (
                <li><NavLink to={dashboardPath} className={({isActive})=> `nav-link ${isActive? 'active':''}`}>Dashboard</NavLink></li>
              )}
            </ul>
          </nav>
          <div className="auth-buttons" id="authButtons">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            ) : (
              <>
                {dashboardPath && (
                  <button className="btn btn-outline" onClick={()=> navigate(dashboardPath)}>
                    {user.role} Dashboard
                  </button>
                )}
                <button className="btn btn-primary" onClick={()=>{ logout(); navigate('/') }}>Logout</button>
              </>
            )}
          </div>
          <button className="mobile-menu-btn" id="mobileMenuBtn" onClick={toggleMobile}>
            <i id="mobileMenuIcon" className="fas fa-bars" />
          </button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="footer">
        <div>
          <div className="footer-content">
            <div className="footer-about">
              <div className="footer-logo">
                <i className="footer-logo-icon fas fa-book-open" />
                <span className="footer-logo-text">RPMS</span>
              </div>
              <p className="footer-description">Streamline your academic workflow with our comprehensive platform for paper submission, peer review, and publication management.</p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter" /></a>
                <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
                <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div>
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li className="footer-link"><Link to="/">Home</Link></li>
                <li className="footer-link"><Link to="/about">About</Link></li>
                <li className="footer-link"><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-links">
                <li className="footer-link"><a href="#">Help Center</a></li>
                <li className="footer-link"><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3 className="footer-heading">Contact</h3>
              <ul className="contact-info">
                <li className="contact-item"><i className="contact-icon fas fa-envelope" /><span>support@example.com</span></li>
                <li className="contact-item"><i className="contact-icon fas fa-phone" /><span>+1 (555) 123-4567</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-links">
              <a className="footer-bottom-link" href="#">Privacy</a>
              <a className="footer-bottom-link" href="#">Terms</a>
            </div>
            <p className="copyright">© {new Date().getFullYear()} Research Paper Management System</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
