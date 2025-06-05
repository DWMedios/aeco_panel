import { useAuth } from '../hooks/useAuth'
import { ApiParams } from '../interfaces/api'
import { useCallback } from 'react'

const api = import.meta.env.VITE_API_BASE_URL

export const useFetchWithAuth = () => {
  const { logout, getToken, sessionTimeout } = useAuth()

  const fetchRequest = useCallback(
    async <T>({ url, method, headers, body }: ApiParams): Promise<T> => {
      const token = getToken()

      sessionTimeout()
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

      if (response.status === 403) logout()

      if (!response.ok) {
        throw response.status === 500
          ? {
              message: 'Error interno estamos trabajando para mejorar.!',
              type: 'error',
            }
          : data
      }

      return data
    },
    [logout, getToken]
  )

  return { fetchRequest }
}
