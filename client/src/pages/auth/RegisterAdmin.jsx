import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { register as registerApi } from '../../services/auth.js'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  adminSecret: z.string().min(4),
})

export default function RegisterAdmin(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values){
    try {
      await registerApi({ ...values, role: 'Admin' })
      toast.success('Admin registered. Please verify email and then login.')
    } catch (e) { toast.error(e.response?.data?.message || 'Registration failed') }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Register Admin</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Full Name (optional)" {...register('name')} />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" {...register('password')} />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Admin Registration Secret" {...register('adminSecret')} />
        {errors.adminSecret && <p className="text-red-600 text-sm">{errors.adminSecret.message}</p>}
        <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded">{isSubmitting? 'Submitting...':'Register Admin'}</button>
      </form>
    </div>
  )
}
