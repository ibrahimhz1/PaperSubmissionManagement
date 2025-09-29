import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { register as registerApi } from '../../services/auth.js'
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['Author', 'Reviewer'])
})

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: 'Author' }
  })

  async function onSubmit(values) {
    try {
      await registerApi(values)
      toast.success('Registered. Please check your email to verify.')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h1>
        <p className="text-center text-gray-500 text-sm">Join us as an Author or Reviewer</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
              {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Role */}
<div className="relative">
  <label className="block text-gray-700 font-medium mb-1">Role</label>
  <select
    className="appearance-none w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 bg-white cursor-pointer"
    {...register('role')}
  >
    <option value="Author">Author</option>
    <option value="Reviewer">Reviewer</option>
 
  </select>

  {/* Dropdown Arrow Icon */}
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
</div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 flex justify-center items-center space-x-2"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            <span>{isSubmitting ? 'Submitting...' : 'Register'}</span>
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-blue-500 font-medium hover:underline">Login here</a>
        </p>
      </div>
    </div>
  )
}
