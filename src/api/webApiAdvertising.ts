import { Aeco, ApiResponseList } from '../interfaces/types'
import { IAecoForm } from '../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiAdvertising = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getAdvertisings = async (filters: string) => {
    return fetchRequest<ApiResponseList<Aeco>>({
      url: `/advertisings${filters}`,
      method: 'GET',
    })
  }

  const getAdvertisingById = async (id: number) => {
    return fetchRequest<Aeco>({ url: `/advertisings/${id}`, method: 'GET' })
  }

  const createAdvertising = async (aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/advertisings`,
      method: 'POST',
      body: aeco,
    })
  }

  const updateAdvertising = async (id: number, aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/advertisings/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteAdvertising = async (id: number) => {
    return fetchRequest<any>({ url: `/advertisings/${id}`, method: 'DELETE' })
  }

  return {
    getAdvertisings,
    getAdvertisingById,
    createAdvertising,
    updateAdvertising,
    deleteAdvertising,
  }
}
