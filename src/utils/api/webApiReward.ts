import { ApiResponseList, Reward } from '../../interfaces/types'
import { useFetchWithAuth } from './fetch'

export const useWebApiReward = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getRewards = async (
    filters: string
  ): Promise<ApiResponseList<Reward>> => {
    return fetchRequest({
      url: `/rewards${filters}`,
      method: 'GET',
    })
  }

  const getReward = async (id: number): Promise<Reward> => {
    return fetchRequest({ url: `/rewards/${id}`, method: 'GET' })
  }

  const createReward = async (aeco: any): Promise<Reward> => {
    return fetchRequest<Reward>({ url: `/rewards`, method: 'POST', body: aeco })
  }

  const updateReward = async (id: number, aeco: any): Promise<Reward> => {
    console.log('🚀 ~ updateReward ~ id:', id)
    return fetchRequest<Reward>({
      url: `/rewards/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteReward = async (id: number): Promise<Reward> => {
    return fetchRequest<any>({ url: `/rewards/${id}`, method: 'DELETE' })
  }

  return {
    getRewards,
    getReward,
    createReward,
    updateReward,
    deleteReward,
  }
}
