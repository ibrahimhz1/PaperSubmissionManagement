import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { register as registerApi } from '../../services/auth.js'
import toast from 'react-hot-toast'

const schema = z.object({ email: z.string().email(), password: z.string().min(6), role: z.enum(['Author','Reviewer']) })

export default function Register(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { role: 'Author' } })

  async function onSubmit(values){
    try {
      await registerApi(values)
      toast.success('Registered. Please check your email to verify.')
    } catch (e) { toast.error(e.response?.data?.message || 'Registration failed') }
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-6 mt-8">
      <h1 className="text-lg font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="block w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 leading-6 shadow-none focus:outline focus:outline-2 focus:outline-blue-100 focus:border-blue-600" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        <input type="password" className="block w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 leading-6 shadow-none focus:outline focus:outline-2 focus:outline-blue-100 focus:border-blue-600" placeholder="Password" {...register('password')} />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        <select className="block w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 leading-6 shadow-none focus:outline focus:outline-2 focus:outline-blue-100 focus:border-blue-600" {...register('role')}>
          <option value="Author">Author</option>
          <option value="Reviewer">Reviewer</option>
        </select>
        {errors.role && <p className="text-red-600 text-sm">{errors.role.message}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center font-medium rounded-lg px-4 py-2 no-underline transition bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 disabled:opacity-60"
          style={{ backgroundColor: '#2563eb', color: '#ffffff', borderColor: '#2563eb' }}
        >
          {isSubmitting? 'Submitting...':'Register'}
        </button>
      </form>
    </div>
  )
}
