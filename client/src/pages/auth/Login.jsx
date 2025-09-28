import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { login as loginApi } from '../../services/auth.js'
import { useAuth } from '../../services/authContext.jsx'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })

export default function Login(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function onSubmit(values){
    try {
      const data = await loginApi(values)
      login(data)
      const role = data?.user?.role
      const rolePath = role === 'Admin' ? '/admin' : role === 'Reviewer' ? '/reviewer' : role === 'Author' ? '/author' : '/'
      const to = location.state?.from?.pathname || rolePath
      navigate(to)
    } catch (e) { toast.error(e.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="card" style={{ maxWidth: '28rem', margin: '2rem auto' }}>
      <h1 className="section-title" style={{fontSize:'1.25rem'}}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="w-full" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        <input type="password" className="w-full" placeholder="Password" {...register('password')} />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        <button disabled={isSubmitting} className="btn btn-primary" style={{width:'100%'}}>{isSubmitting? 'Signing in...':'Login'}</button>
        <div className="text-sm" style={{display:'flex', justifyContent:'space-between'}}>
          <Link to="/register">Create account</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </form>
    </div>
  )
}
