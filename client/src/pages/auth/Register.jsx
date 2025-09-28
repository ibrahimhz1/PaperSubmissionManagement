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
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" {...register('password')} />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        <select className="w-full border px-3 py-2 rounded" {...register('role')}>
          <option value="Author">Author</option>
          <option value="Reviewer">Reviewer</option>
        </select>
        {errors.role && <p className="text-red-600 text-sm">{errors.role.message}</p>}
        <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded">{isSubmitting? 'Submitting...':'Register'}</button>
      </form>
    </div>
  )
}
