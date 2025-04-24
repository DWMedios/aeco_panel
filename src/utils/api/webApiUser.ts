import { ApiResponseList, User } from '../../interfaces/types'
import { IUserForm } from '../../pages/users/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiUser = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getUsers = async (): Promise<ApiResponseList<User>> => {
    return fetchRequest({ url: '/users', method: 'GET' })
  }

  const createUser = async (user: IUserForm): Promise<User> => {
    return fetchRequest({ url: '/users', method: 'POST', body: user })
  }

  const deleteUser = async (id: number): Promise<any> => {
    return fetchRequest({ url: `/users/${id}`, method: 'DELETE' })
  }

  return {
    getUsers,
    createUser,
    deleteUser,
  }
}
