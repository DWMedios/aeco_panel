import { ILoginForm } from '../pages/login/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiAuth = () => {
  const { fetchRequest } = useFetchWithAuth()

  const login = async (data: ILoginForm) => {
    return fetchRequest({ url: '/auth/login', method: 'POST', body: data })
  }

  return {
    login,
  }
}
