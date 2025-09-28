import api from './api.js'

export function register(payload){ return api.post('/auth/register', payload).then(r=>r.data) }
export function login(payload){ return api.post('/auth/login', payload).then(r=>r.data) }
export function forgotPassword(payload){ return api.post('/auth/forgot-password', payload).then(r=>r.data) }
export function resetPassword(payload){ return api.post('/auth/reset-password', payload).then(r=>r.data) }
