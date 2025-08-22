import { ILoginForm } from '../pages/login/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiAuth = () => {
  const { fetchRequest } = useFetchWithAuth()

  const login = async (data: ILoginForm) => {
    return fetchRequest({ url: '/auth/login', method: 'POST', body: data })
  }

  const forgotPassword = async (data: { email: string }) => {
    return fetchRequest({
      url: '/auth/forgot-password',
      method: 'POST',
      body: data,
    })
  }

  const resetPassword = async (data: { password: string }, token: string) => {
    return fetchRequest({
      url: `/auth/forgot-password/reset`,
      method: 'POST',
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  const tokenVerify = async (token: string) => {
    return fetchRequest({
      url: `/auth/forgot-password/verify`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  const emailVerify = async (token: string) => {
    return fetchRequest({
      url: `/auth/email/verify`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return {
    login,
    resetPassword,
    forgotPassword,
    tokenVerify,
    emailVerify,
  }
}
