import axios from 'axios'
import { getToken, setAccessToken, clearAuth } from './authStore.js'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config)=>{
  const token = getToken()?.access
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshing = null

api.interceptors.response.use((r)=>r, async (error)=>{
  const original = error.config
  if (error.response?.status === 401 && !original._retry){
    original._retry = true
    try {
      refreshing = refreshing || api.post('/auth/refresh', { refreshToken: getToken()?.refresh })
      const { data } = await refreshing
      refreshing = null
      setAccessToken(data.accessToken)
      original.headers.Authorization = `Bearer ${data.accessToken}`
      return api(original)
    } catch(e){
      refreshing = null
      clearAuth()
      window.location.href = '/login'
    }
  }
  return Promise.reject(error)
})

export default api
