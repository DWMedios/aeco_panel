import { ApiResponseList, User } from '../interfaces/types'
import { IUserForm } from '../pages/users/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiUser = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getUsers = async (filters: string): Promise<ApiResponseList<User>> => {
    return fetchRequest({ url: `/users${filters}`, method: 'GET' })
  }

  const createUser = async (user: IUserForm): Promise<User> => {
    return fetchRequest({ url: '/users', method: 'POST', body: user })
  }

  const updateUser = async (id: number, user: IUserForm): Promise<User> => {
    return fetchRequest({ url: `/users/${id}`, method: 'PUT', body: user })
  }

  const deleteUser = async (id: number): Promise<any> => {
    return fetchRequest({ url: `/users/${id}`, method: 'DELETE' })
  }

  const resetPasswordUser = async (
    id: number,
    newPassword: string
  ): Promise<any> => {
    return fetchRequest({
      url: `users/${id}/reset-password`,
      method: 'POST',
      body: { password: newPassword },
    })
  }

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    resetPasswordUser,
  }
}
