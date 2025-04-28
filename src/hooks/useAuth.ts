import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export const useAuth = () => {
  const navigate = useNavigate()

  const login = (token: string) => {
    Cookies.set('token', token)
    navigate('/dashboard') // Puedes cambiar esta ruta si deseas
  }

  const logout = () => {
    Cookies.remove('token')
    navigate('/')
  }

  const isAuthenticated = () => {
    const token = Cookies.get('token')
    return Boolean(token && token.trim() !== '')
  }

  const getToken = () => {
    const token = Cookies.get('token')
    return token || ''
  }

  return {
    login,
    logout,
    isAuthenticated,
    getToken,
  }
}
