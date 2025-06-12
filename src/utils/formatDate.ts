export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0] // YYYY-MM-DD
}

export const getFirstAndLastDayOfMonth = () => {
  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1) // Primer día del mes
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0) // Último día del mes
  return { startDate, endDate }
}
