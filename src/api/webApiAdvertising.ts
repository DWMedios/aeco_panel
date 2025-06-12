import { Advertising, ApiResponseList } from '../interfaces/types'
import { IAecoForm } from '../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiAdvertising = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getAdvertisings = async (filters: string) => {
    return fetchRequest<ApiResponseList<Advertising>>({
      url: `/advertisings${filters}`,
      method: 'GET',
    })
  }

  const getAdvertising = async (id: number) => {
    return fetchRequest<Advertising>({
      url: `/advertisings/${id}`,
      method: 'GET',
    })
  }

  const createAdvertising = async (advertising: IAecoForm) => {
    return fetchRequest<Advertising>({
      url: `/advertisings`,
      method: 'POST',
      body: advertising,
    })
  }

  const updateAdvertising = async (id: number, advertising: IAecoForm) => {
    return fetchRequest<Advertising>({
      url: `/advertisings/${id}`,
      method: 'PUT',
      body: advertising,
    })
  }

  const deleteAdvertising = async (id: number) => {
    return fetchRequest<any>({ url: `/advertisings/${id}`, method: 'DELETE' })
  }

  return {
    getAdvertisings,
    getAdvertising,
    createAdvertising,
    updateAdvertising,
    deleteAdvertising,
  }
}
