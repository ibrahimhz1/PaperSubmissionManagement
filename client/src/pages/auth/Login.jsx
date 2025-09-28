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
    <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-6 mt-8">
      <h1 className="text-lg font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          spellCheck={false}
          className="block w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 leading-6 shadow-none focus:outline focus:outline-2 focus:outline-blue-100 focus:border-blue-600"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        <input
          type="password"
          className="block w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 leading-6 shadow-none focus:outline focus:outline-2 focus:outline-blue-100 focus:border-blue-600"
          placeholder="Password"
          {...register('password')}
        />
        <button disabled={isSubmitting} className="w-full inline-flex items-center justify-center font-medium rounded-lg px-4 py-2 no-underline transition bg-blue-600 text-white hover:bg-blue-700">{isSubmitting? 'Signing in...':'Login'}</button>
        <div className="text-sm flex justify-between">
          <Link to="/register" className="text-blue-700">Create account</Link>
          <Link to="/forgot-password" className="text-blue-700">Forgot password?</Link>
        </div>
      </form>
    </div>
  )
}
