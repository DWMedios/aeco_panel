import { ApiResponseList, Contractor } from '../interfaces/types'
import { IAecoForm } from '../pages/aecos/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiContractors = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getContractors = async (filters: string) => {
    return fetchRequest<ApiResponseList<any>>({
      url: `/advertisings/contractors${filters}`,
      method: 'GET',
    })
  }

  const getContractor = async (id: number) => {
    return fetchRequest<Contractor>({
      url: `/advertisings/contractors/${id}`,
      method: 'GET',
    })
  }

  const createContractor = async (contractor: IAecoForm) => {
    return fetchRequest<Contractor>({
      url: `/advertisings/contractors`,
      method: 'POST',
      body: contractor,
    })
  }

  const updateContractor = async (id: number, contractor: IAecoForm) => {
    return fetchRequest<Contractor>({
      url: `/advertisings/contractors/${id}`,
      method: 'PUT',
      body: contractor,
    })
  }

  const deleteContractor = async (id: number) => {
    return fetchRequest<any>({
      url: `/advertisings/contractors/${id}`,
      method: 'DELETE',
    })
  }

  return {
    getContractors,
    getContractor,
    createContractor,
    updateContractor,
    deleteContractor,
  }
}
