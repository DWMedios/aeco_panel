import { useEffect, useState } from 'react'
import { useFetchWithAuth } from '../api/fetch'
import { format, eachDayOfInterval, parseISO } from 'date-fns'

interface Params {
  companyId: number
}

export const useDashboardStats = ({ companyId }: Params) => {
  const [dates, setDates] = useState<string>('') // string tipo: &startDate=YYYY-MM-DD&endDate=YYYY-MM-DD

  const [dailyStats, setDailyStats] = useState(null)
  const [topProducts, setTopProducts] = useState(null)
  const [topPackagings, setTopPackagings] = useState(null)
  const [packagingsPerDay, setPackagingsPerDay] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { fetchRequest } = useFetchWithAuth()

  const fetchStats = async (query: string) => {
    try {
      setLoading(true)

      const [daily, products, packagings, perDay] = await Promise.all([
        fetchRequest({
          url: `/dashboard/stats/daily?companyId=${companyId}${query}`,
          method: 'GET',
        }),
        fetchRequest({
          url: `/dashboard/stats/top-products?companyId=${companyId}&limit=5&orderByDirection=desc`,
          method: 'GET',
        }),
        fetchRequest({
          url: `/dashboard/stats/top-packagings?companyId=${companyId}${query}`,
          method: 'GET',
        }),
        fetchRequest({
          url: `/dashboard/stats/packagings-per-day?companyId=${companyId}${query}`,
          method: 'GET',
        }),
      ])

      setDailyStats(daily)
      setTopProducts(
        products.map((item) => ({
          x: item.product.name, // Puedes ajustar el nombre si quieres darle un formato más específico
          y: item.totalCount,
        }))
      )
      setTopPackagings(
        packagings.map((packaging: any) => ({
          x: packaging.packagingType == 'bottle' ? 'Pet' : 'Aluminio', // Asumimos que 'type' es el nombre del tipo de envase
          y: packaging.totalCount || 0, // Asumimos que 'count' es el número total del envase
        }))
      )
      setPackagingsPerDay(statsPerDay(perDay))
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const statsPerDay = (rawData: []) => {
    const searchParams = new URLSearchParams(dates)
    const startDateStr = searchParams.get('startDate')!
    const endDateStr = searchParams.get('endDate')!

    const start = parseISO(startDateStr)
    const end = parseISO(endDateStr)

    const dataMap = new Map(
      rawData.map((item) => [
        format(new Date(item.createdAt), 'yyyy-MM-dd'),
        item,
      ])
    )

    // Genera los días del rango y construye el array final
    const result = eachDayOfInterval({ start, end }).map((date) => {
      const key = format(date, 'yyyy-MM-dd')
      const existing = dataMap.get(key)

      // Creamos los dos arrays que necesitamos
      const day = parseInt(format(date, 'd')) // Solo el día del mes
      const totalSum =
        (existing?.totalTickets ?? 0) + (existing?.totalBottles ?? 0)

      return { day, totalSum }
    })

    // Arrays separados
    const days = result.map((item) => item.day)
    const totalSums = result.map((item) => item.totalSum)

    return { categories: days, data: totalSums }
  }

  useEffect(() => {
    if (dates) fetchStats(dates)
  }, [dates])

  return {
    setDates,
    dailyStats,
    topProducts,
    topPackagings,
    packagingsPerDay,
    loading,
    error,
  }
}
