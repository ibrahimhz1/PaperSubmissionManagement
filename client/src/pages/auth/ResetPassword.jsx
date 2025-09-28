import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { resetPassword } from '../../services/auth.js'
import toast from 'react-hot-toast'

const schema = z.object({ token: z.string().min(1), password: z.string().min(6) })

export default function ResetPassword(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { token: new URLSearchParams(location.search).get('token') || '' } })

  async function onSubmit(values){
    try {
      await resetPassword(values)
      toast.success('Password updated. You can log in now')
    } catch (e) { toast.error('Failed to reset password') }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Token" {...register('token')} />
        {errors.token && <p className="text-red-600 text-sm">{errors.token.message}</p>}
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="New Password" {...register('password')} />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded">{isSubmitting? 'Submitting...':'Reset'}</button>
      </form>
    </div>
  )
}
