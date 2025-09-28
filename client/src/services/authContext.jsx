import { createContext, useContext, useEffect, useState } from 'react'
import api from './api.js'
import toast from 'react-hot-toast'
import { getAuth, setAuth, clearAuth } from './authStore.js'

const AuthCtx = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(getAuth()?.user || null)

  function login(data){
    setAuth({ user: data.user, tokens: { access: data.accessToken, refresh: data.refreshToken } })
    setUser(data.user)
    toast.success('Logged in')
  }
  function logout(){ clearAuth(); setUser(null); toast.success('Logged out') }

  useEffect(()=>{ const a = getAuth(); if (a?.user) setUser(a.user) }, [])

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth(){ return useContext(AuthCtx) }
