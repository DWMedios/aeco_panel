import { Aeco, ApiResponseList } from '../interfaces/types'
import { IAecoForm } from '../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiCapacities = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getCapacities = async (filters: string) => {
    return fetchRequest<ApiResponseList<any>>({
      url: `/products/capacities${filters}`,
      method: 'GET',
    })
  }

  const getCapacity = async (id: number) => {
    return fetchRequest<Aeco>({
      url: `/products/capacities/${id}`,
      method: 'GET',
    })
  }

  const createCapacity = async (aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/products/capacities`,
      method: 'POST',
      body: aeco,
    })
  }

  const updateCapacity = async (id: number, aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/products/capacities/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteCapacity = async (id: number) => {
    return fetchRequest<any>({ url: `/aecos/${id}`, method: 'DELETE' })
  }

  return {
    getCapacities,
    getCapacity,
    createCapacity,
    updateCapacity,
    deleteCapacity,
  }
}
