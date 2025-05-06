type Cleanable = Record<string, any> | any[]

export const cleanEmptyFields = <T extends Cleanable>(obj: T): Partial<T> => {
  if (typeof obj !== 'object' || obj === null) return obj

  if (Array.isArray(obj)) {
    return obj
      .map((item) => cleanEmptyFields(item))
      .filter(
        (item) =>
          item !== null &&
          item !== undefined &&
          (typeof item !== 'string' || item !== '')
      ) as any
  }

  const cleaned: Partial<T> = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    if (typeof value === 'object' && value !== null) {
      const cleanedValue = cleanEmptyFields(value)

      if (Array.isArray(cleanedValue)) {
        if (cleanedValue.length > 0) {
          cleaned[key as keyof T] = cleanedValue as any
        }
      } else {
        if (Object.keys(cleanedValue).length > 0) {
          cleaned[key as keyof T] = cleanedValue as any
        }
      }
    } else if (value !== '' && value !== null && value !== undefined) {
      cleaned[key as keyof T] = value
    }
  })

  return cleaned
}
