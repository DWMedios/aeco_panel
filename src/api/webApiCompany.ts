import { ApiResponseList, Company } from '../interfaces/types'
import { ICompanyForm } from '../pages/companies/interface'
import { useFetchWithAuth } from './fetch'

export const useWebApiCompany = () => {
  const { fetchRequest } = useFetchWithAuth()

  const getCompanies = async (
    filters: string
  ): Promise<ApiResponseList<Company>> => {
    return fetchRequest({
      url: `/companies${filters}`,
      method: 'GET',
    })
  }

  const getCompany = async (id: number): Promise<Company> => {
    return fetchRequest({ url: `/companies/${id}`, method: 'GET' })
  }

  const createCompany = async (company: ICompanyForm) => {
    return fetchRequest<Company>({
      url: `/companies`,
      method: 'POST',
      body: company,
    })
  }

  const updateCompany = async (
    id: number,
    company: ICompanyForm
  ): Promise<Company> => {
    return fetchRequest({
      url: `/companies/${id}`,
      method: 'PUT',
      body: company,
    })
  }

  const deleteCompany = async (id: number): Promise<any> => {
    return fetchRequest({ url: `/companies/${id}`, method: 'DELETE' })
  }

  return {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
  }
}
