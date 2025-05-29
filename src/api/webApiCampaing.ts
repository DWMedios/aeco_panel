import { ApiResponseList, Campaign } from '../interfaces/types'
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
    return fetchRequest<Campaign>({
      url: `/advertisings/campaigns/${id}`,
      method: 'GET',
    })
  }

  const createCampaing = async (campaign: any) => {
    return fetchRequest<Campaign>({
      url: `/advertisings/campaigns`,
      method: 'POST',
      body: campaign,
    })
  }

  const updateCampaing = async (id: number, campaign: any) => {
    return fetchRequest<Campaign>({
      url: `/advertisings/campaigns/${id}`,
      method: 'PUT',
      body: campaign,
    })
  }

  const deleteCampaing = async (id: number) => {
    return fetchRequest<any>({
      url: `/advertisings/campaigns/${id}`,
      method: 'DELETE',
    })
  }

  const getCampaingsByDate = async (filters: string) => {
    return fetchRequest<ApiResponseList<any>>({
      url: `/advertisings/campaigns/by-date?${filters}`,
      method: 'GET',
    })
  }

  return {
    getCampaings,
    getCampaing,
    createCampaing,
    updateCampaing,
    deleteCampaing,
    getCampaingsByDate,
  }
}
