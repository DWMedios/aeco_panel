import { Aeco, ApiResponseList } from '../../interfaces/types'
import { IAecoForm } from '../../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiCampaings = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getCampaings = async (filters: string) => {
    return fetchRequest<ApiResponseList<any>>({
      url: `/advertisings/campaigns${filters}`,
      method: 'GET',
    })
  }

  const getCampaing = async (id: number) => {
    return fetchRequest<Aeco>({
      url: `/advertisings/campaigns/${id}`,
      method: 'GET',
    })
  }

  const createCampaing = async (aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/advertisings/campaigns`,
      method: 'POST',
      body: aeco,
    })
  }

  const updateCampaing = async (id: number, aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/advertisings/campaigns/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteCampaing = async (id: number) => {
    return fetchRequest<any>({
      url: `/advertisings/campaigns/${id}`,
      method: 'DELETE',
    })
  }

  return {
    getCampaings,
    getCampaing,
    createCampaing,
    updateCampaing,
    deleteCampaing,
  }
}
