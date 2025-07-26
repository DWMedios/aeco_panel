import { set } from 'lodash'
import { useState, useCallback } from 'react'

export function useLoading() {
  const [loading, setLoading] = useState(false)

  const withLoading = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T> => {
      setLoading(true)

      //   await new Promise((resolve) => setTimeout(resolve, 100))
      try {
        return await fn()
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { loading, withLoading, setLoading }
}
