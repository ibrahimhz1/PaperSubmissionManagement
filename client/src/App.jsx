import { Routes, Route, Navigate } from 'react-router-dom'
import TargetLayout from './components/TargetLayout.jsx'
import Home from './pages/public/Home.jsx'
import About from './pages/public/About.jsx'
import Contact from './pages/public/Contact.jsx'
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
import CallForPapers from './pages/public/CallForPapers.jsx'
import Committee from './pages/public/Committee.jsx'
import Speakers from './pages/public/Speakers.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<TargetLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="call-for-papers" element={<CallForPapers />} />
        <Route path="committee" element={<Committee />} />
        <Route path="speakers" element={<Speakers />} />

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
