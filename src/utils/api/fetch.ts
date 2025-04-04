import { ApiParams } from '../../interfaces/api'

const api = import.meta.env.VITE_API_BASE_URL

export const fetchRequest = async <T>({
  url,
  method,
  headers,
  body,
}: ApiParams): Promise<T> => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZmU4OTg4Zi02MmU5LTRlMWMtOGMyYS01ZDY2NzIyNjRkNjEiLCJ1c2VybmFtZSI6IlN1cGVyIEFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGV4YW1wbGUuY29tIiwicm9sZVR5cGUiOiJzdXBlcl9hZG1pbiIsImNvbXBhbnkiOnt9LCJpYXQiOjE3NDM3NDYzNzksImV4cCI6MTc0Mzc4OTU3OX0.WuCujjNTIv_Vm2jfLXeWnbqBFr1ggTjN1FtWuWV7fIg'
  try {
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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error
  }
}
