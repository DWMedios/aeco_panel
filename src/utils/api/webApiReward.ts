import { ApiResponseList, Reward } from '../../interfaces/types'
import { useFetchWithAuth } from './fetch'

export const useWebApiReward = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getRewards = async (filters: string) => {
    return fetchRequest<ApiResponseList<Reward>>({
      url: `/rewards${filters}`,
      method: 'GET',
    })
  }

  // const getAeco = async (id: number) => {
  //   return fetchRequest<Aeco>({ url: `/aecos/${id}`, method: 'GET' })
  // }

  // const createAeco = async (aeco: IAecoForm) => {
  //   return fetchRequest<Aeco>({ url: `/aecos`, method: 'POST', body: aeco })
  // }

  // const updateAeco = async (id: number, aeco: IAecoForm) => {
  //   return fetchRequest<Aeco>({
  //     url: `/aecos/${id}`,
  //     method: 'PUT',
  //     body: aeco,
  //   })
  // }

  // const deleteAeco = async (id: number) => {
  //   return fetchRequest<any>({ url: `/aecos/${id}`, method: 'DELETE' })
  // }

  return {
    getRewards,
    // getAeco,
    // createAeco,
    // updateAeco,
    // deleteAeco,
  }
}
