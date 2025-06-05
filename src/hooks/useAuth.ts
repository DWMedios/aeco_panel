import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const useAuth = () => {
  const navigate = useNavigate()

  const login = (token: string) => {
    Cookies.set('token', token)
    navigate('/dashboard')
  }

  const logout = () => {
    Cookies.remove('token')
    navigate('/')
  }

  const isAuthenticated = () => {
    const token = Cookies.get('token')
    return Boolean(token && token.trim() !== '')
  }

  const profile = () => {
    const token = Cookies.get('token')
    if (!token) return false

    try {
      const decoded = jwtDecode(token)
      return decoded
    } catch (err) {
      console.error('Token inválido:', err)
      return false
    }
  }

  const getToken = () => {
    const token = Cookies.get('token')
    return token || ''
  }

  const sessionTimeout = () => {
    const token = Cookies.get('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expiration = payload.exp * 1000
      const now = Date.now()
      if (now >= expiration) {
        logout()
      }
    }
  }

  return {
    login,
    logout,
    isAuthenticated,
    getToken,
    sessionTimeout,
    profile,
  }
}
