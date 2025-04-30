import { Aeco, ApiResponseList } from '../../interfaces/types'
import { IAecoForm } from '../../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiProducts = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getProducts = async (filters: string) => {
    return fetchRequest<ApiResponseList<any>>({
      url: `/products${filters}`,
      method: 'GET',
    })
  }

  const getProduct = async (id: number) => {
    return fetchRequest<Aeco>({ url: `/products/${id}`, method: 'GET' })
  }

  const createProduct = async (aeco: IAecoForm) => {
    return fetchRequest<Aeco>({ url: `/products`, method: 'POST', body: aeco })
  }

  const updateProduct = async (id: number, aeco: IAecoForm) => {
    return fetchRequest<Aeco>({
      url: `/products/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteProduct = async (id: number) => {
    return fetchRequest<any>({ url: `/products/${id}`, method: 'DELETE' })
  }

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
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCapacities,
    getCapacity,
    createCapacity,
    updateCapacity,
    deleteCapacity,
  }
}
