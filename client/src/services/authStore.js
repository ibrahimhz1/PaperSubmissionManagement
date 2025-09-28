let auth = null

export function setAuth(data){ auth = data; localStorage.setItem('auth', JSON.stringify(auth)) }
export function getAuth(){ if (!auth){ const v = localStorage.getItem('auth'); auth = v? JSON.parse(v): null } return auth }
export function getToken(){ return getAuth()?.tokens }
export function setAccessToken(access){ const a = getAuth(); if (a){ a.tokens.access = access; setAuth(a) } }
export function clearAuth(){ auth = null; localStorage.removeItem('auth') }
