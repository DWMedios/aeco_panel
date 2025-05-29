import { Aeco, ApiResponseList } from '../interfaces/types'
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

  const createProduct = async (aeco: any) => {
    return fetchRequest<Aeco>({ url: `/products`, method: 'POST', body: aeco })
  }

  const updateProduct = async (id: number, aeco: any) => {
    return fetchRequest<Aeco>({
      url: `/products/${id}`,
      method: 'PUT',
      body: aeco,
    })
  }

  const deleteProduct = async (id: number) => {
    return fetchRequest<any>({ url: `/products/${id}`, method: 'DELETE' })
  }

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
