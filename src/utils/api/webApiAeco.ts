import { Aeco, ApiResponseList } from '../../interfaces/types'
import { IAecoForm } from '../../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiAeco = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getAecos = async (filters: string) => {
    return fetchRequest<ApiResponseList<Aeco>>({
      url: `/aecos${filters}`,
      method: 'GET',
    })
  }

  const getAeco = async (id: number) => {
    return fetchRequest<Aeco>({ url: `/aecos/${id}`, method: 'GET' })
  }

  const createAeco = async (aeco: IAecoForm) => {
    return fetchRequest<Aeco>({ url: `/aecos`, method: 'POST', body: aeco })
  }

  const updateAeco = async (id: number, aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/aecos/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteAeco = async (id: number) => {
    return fetchRequest<any>({ url: `/aecos/${id}`, method: 'DELETE' })
  }

  return {
    getAecos,
    getAeco,
    createAeco,
    updateAeco,
    deleteAeco,
  }
}
