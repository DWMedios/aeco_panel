import { ApiParams } from '../../interfaces/api'

const api = import.meta.env.VITE_API_BASE_URL

export const fetchRequest = async <T>({
  url,
  method,
  headers,
  body,
}: ApiParams): Promise<T> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    }

    const response = await fetch(`${api}${url}`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error
  }
}
