import { useAuth } from '../../hooks/useAuth'
import { ApiParams } from '../../interfaces/api'
import { useCallback } from 'react'

const api = import.meta.env.VITE_API_BASE_URL

export const useFetchWithAuth = () => {
  const { logout, getToken } = useAuth()

  const fetchRequest = useCallback(
    async <T>({ url, method, headers, body }: ApiParams): Promise<T> => {
      try {
        const token = getToken()

        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
          body: body ? JSON.stringify(body) : null,
        }

        const response = await fetch(`${api}${url}`, options)

        const data = await response.json()

        if (!response.ok) {
          throw response.status === 500
            ? {
                message: 'Error interno estamos trabajando para mejorar.!',
                type: 'error',
              }
            : data
        }

        return data
      } catch (error) {
        console.error('Error en la solicitud:', error)
        throw error
      }
    },
    [logout, getToken]
  )

  return { fetchRequest }
}
