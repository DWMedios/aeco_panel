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

        if (response.status === 403) {
          logout()
          throw new Error('No autorizado, redirigiendo a login')
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        console.error('Error en la solicitud:', error)
        throw error
      }
    },
    [logout, getToken]
  )

  return { fetchRequest }
}
