import { useEffect, useRef, useState } from 'react'

export default function VerifyEmail(){
  const [status, setStatus] = useState('Verifying...')
  const calledRef = useRef(false)

  useEffect(()=>{
    if (calledRef.current) return
    calledRef.current = true
    const token = new URLSearchParams(location.search).get('token')
    if (!token){ setStatus('Invalid verification link'); return }
    fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email?token=${token}`)
      .then(async (r)=>{ const d = await r.json(); if (r.ok) setStatus(d.message || 'Verified'); else setStatus(d.message || 'Verification failed') })
      .catch(()=> setStatus('Verification failed'))
  }, [])

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Email Verification</h1>
      <p>{status}</p>
    </div>
  )
}
