import { useState, useEffect } from 'react'
import { ApiResponseList } from '../interfaces/types'
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction'

const generateQueryString = (
  orderByField: string = 'createdAt',
  direction: string = 'asc',
  filters: Record<string, any>,
  signo: boolean = true
): string => {
  const params = new URLSearchParams()

  params.append('orderByDirection', direction)
  params.append('orderByField', orderByField)

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
  setData: React.Dispatch<React.SetStateAction<T[]>>,
  orderByField: string = 'createdAt',
  direction: string = 'asc'
) => {
  const [filters, setFilters] = useState<Record<string, any> | null>(null)
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

    let queryString = generateQueryString(orderByField, direction, {
      ...filters,
      page,
      perpage: perPage,
    })
    if (defaultFilter) {
      const newFilter = generateQueryString(
        orderByField,
        direction,
        defaultFilter,
        false
      )
      if (!queryString.includes(newFilter)) queryString += `&${newFilter}`
    }

    try {
      if (page < 1) {
        return
      }
      const response = await fetchDataFunction(queryString)
      setData(response.records || [])
      setTotalPages(response.totalpages || 1)
      if (response.records.length === 0) setPage(page === 0 ? 1 : page - 1)
      else setPage(response.page || 1)
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
      fetchData(1)
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
