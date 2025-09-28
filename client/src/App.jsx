import { Routes, Route, Navigate } from 'react-router-dom'
import TargetLayout from './components/TargetLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import RegisterAdmin from './pages/auth/RegisterAdmin.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import VerifyEmail from './pages/auth/VerifyEmail.jsx'
import AuthorDashboard from './pages/author/AuthorDashboard.jsx'
import ReviewerDashboard from './pages/reviewer/ReviewerDashboard.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<TargetLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register-admin" element={<RegisterAdmin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />

        <Route element={<ProtectedRoute roles={["Author"]} />}> 
          <Route path="author" element={<AuthorDashboard />} />
        </Route>
        <Route element={<ProtectedRoute roles={["Reviewer"]} />}> 
          <Route path="reviewer" element={<ReviewerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute roles={["Admin"]} />}> 
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
