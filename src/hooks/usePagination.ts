import { useState, useEffect } from 'react'
import { ApiResponseList } from '../interfaces/types'

const generateQueryString = (filters: Record<string, any>): string => {
  const params = new URLSearchParams()

  Object.keys(filters).forEach((key) => {
    const value = filters[key]
    if (value !== undefined && value !== null) {
      params.append(key, value.toString())
    }
  })

  return params.toString() ? `?${params.toString()}` : ''
}

// Definimos el hook para manejar la paginación
const usePagination = <T>(
  fetchDataFunction: (queryString: string) => Promise<ApiResponseList<T>>, // Ahora toma una cadena (queryString)
  perPage: number,
  setData: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const [filters, setFilters] = useState<Record<string, any> | null>({})
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (page: number) => {
    setLoading(true)
    setError(null)

    const queryString = generateQueryString({
      ...filters,
      page,
      perpage: perPage,
    })

    try {
      const response = await fetchDataFunction(queryString)
      setData(response.records || [])
      setTotalPages(response.totalpages || 1)
      setPage(response.page || 1)
    } catch (err) {
      console.log('Error al cargar los datos', err)
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  return {
    page,
    totalPages,
    setPage,
    loading,
    error,
    setFilters,
    refresh: () => fetchData(page),
  }
}

export default usePagination
