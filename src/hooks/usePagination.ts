import { useState, useEffect } from 'react'
import { fetchRequest } from '../utils/api/fetch' // Asegúrate de tener un helper para las peticiones API
import { ApiResponseList } from '../interfaces/types'

// Definimos el hook para manejar la paginación
const usePagination = <T>(
  url: string,
  perPage: number,
  setData: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (page: number) => {
    setLoading(true)
    setError(null)

    try {
      // Aquí realizamos la petición a la API con la paginación
      const response = await fetchRequest<ApiResponseList>({
        url: `${url}?page=${page}&perpage=${perPage}`,
        method: 'GET',
      })

      // Al recibir la respuesta, actualizamos el estado de los datos y la paginación
      setData(response.records || [])
      setTotalPages(response.totalpages || 1)
      setPage(response.page || 1)
    } catch (err) {
      console.log('Error al cargar los datos', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page) // Obtiene los datos al cargar el hook o al cambiar la página
  }, [page])

  return {
    page,
    totalPages,
    setPage,
    loading,
    error,
  }
}

export default usePagination
