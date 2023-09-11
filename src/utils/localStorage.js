import localStorage from 'store'
const AUTH_TOKEN_STORE_KEY = 'auth-token'

export const removeAuthToken = () => {
  return localStorage.remove(AUTH_TOKEN_STORE_KEY)
}

export const setAuthToken = (token) => {
  return localStorage.set(AUTH_TOKEN_STORE_KEY, token)
}

export const getAuthToken = () => {
  return localStorage.get(AUTH_TOKEN_STORE_KEY)
}


export const hasAuthToken = () => {
  return !!getAuthToken()
}
