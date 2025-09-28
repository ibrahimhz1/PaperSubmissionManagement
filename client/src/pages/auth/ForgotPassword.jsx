import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { forgotPassword } from '../../services/auth.js'
import toast from 'react-hot-toast'

const schema = z.object({ email: z.string().email() })

export default function ForgotPassword(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(values){
    try {
      await forgotPassword(values)
      toast.success('If the email exists, a reset link was sent')
    } catch (e) { toast.error('Failed to send reset link') }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded">{isSubmitting? 'Submitting...':'Submit'}</button>
      </form>
    </div>
  )
}
