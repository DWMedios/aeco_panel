import { useState, useEffect } from 'react'
import { ApiResponseList } from '../interfaces/types'

const generateQueryString = (
  filters: Record<string, any>,
  signo: boolean = true
): string => {
  const params = new URLSearchParams()

  params.append('orderByDirection', 'asc')
  params.append('orderByField', 'createdAt')

  Object.keys(filters).forEach((key) => {
    const value = filters[key]
    if (value !== undefined && value !== null) {
      params.append(
        key,
        value.toString().toLowerCase() == 'donativo'
          ? 'donation'
          : value.toString().toLowerCase() == 'servicio'
          ? 'service'
          : value.toString().toLowerCase() == 'descuento'
          ? 'discount'
          : value.toString()
      )
    }
  })

  return params.toString() ? `${signo ? '?' : ''}${params.toString()}` : ''
}

// Definimos el hook para manejar la paginación
const usePagination = <T>(
  fetchDataFunction: (queryString: string) => Promise<ApiResponseList<T>>, // Ahora toma una cadena (queryString)
  perPage: number,
  setData: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const [filters, setFilters] = useState<Record<string, any> | null>({})
  const [defaultFilter, setDefaultFilters] = useState<Record<
    string,
    any
  > | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (page: number) => {
    setLoading(true)
    setError(null)

    let queryString = generateQueryString({
      ...filters,
      page,
      perpage: perPage,
    })
    if (defaultFilter) {
      const newFilter = generateQueryString(defaultFilter, false)
      if (!queryString.includes(newFilter)) queryString += `&${newFilter}`
    }

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

  useEffect(() => {
    if (filters) {
      fetchData(1) // Reset to page 1 when filters change
    }
  }, [filters])

  return {
    page,
    totalPages,
    setPage,
    loading,
    error,
    setFilters,
    refresh: () => fetchData(page),
    setDefaultFilters,
  }
}

export default usePagination
