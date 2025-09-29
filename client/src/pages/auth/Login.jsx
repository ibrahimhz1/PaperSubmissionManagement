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
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-8 mt-12">
      <h1 className="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
      <p className="text-sm text-gray-500 text-center mb-6">Sign in to your account to continue</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={`block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={`block w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>

        <div className="flex justify-between text-sm mt-4">
          <Link to="/register" className="text-blue-600 hover:underline">Create account</Link>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
        </div>
      </form>
    </div>
  )
}
