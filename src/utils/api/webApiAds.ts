import { Aeco, ApiResponseList } from '../../interfaces/types'
import { IAecoForm } from '../../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiAds = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getAds = async (filters: string) => {
    return fetchRequest<ApiResponseList<Aeco>>({
      url: `/advertisings${filters}`,
      method: 'GET',
    })
  }

  const getAdsById = async (id: number) => {
    return fetchRequest<Aeco>({ url: `/advertisings/${id}`, method: 'GET' })
  }

  const createAds = async (aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/advertisings`,
      method: 'POST',
      body: aeco,
    })
  }

  const updateAds = async (id: number, aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/advertisings/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteAds = async (id: number) => {
    return fetchRequest<any>({ url: `/advertisings/${id}`, method: 'DELETE' })
  }

  return {
    getAds,
    getAdsById,
    createAds,
    updateAds,
    deleteAds,
  }
}
