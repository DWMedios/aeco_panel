import { useState } from 'react'

type FormValues = Record<string, any>

export const useFormHelper = <T extends FormValues>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState)
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)

  const fillFormWithData = (data: Partial<T>) => {
    // Elimina los campos directamente usando destructuring
    const { createdAt, updatedAt, deletedAt, id, ...cleanedData } = data

    setFormData((prevData) => {
      const mergedData = recursiveMerge(prevData, cleanedData)
      return mergedData as T
    })

    const password = findValueByKey(data, 'password')
    if (password) {
      setPasswordConfirmation(password)
      setPasswordsMatch(true)
    }
  }

  const recursiveMerge = (target: any, source: any): any => {
    if (!source) return target

    const output = { ...target }

    Object.keys(source).forEach((key) => {
      if (
        source[key] !== null &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        if (target[key] && typeof target[key] === 'object') {
          output[key] = recursiveMerge(target[key], source[key])
        } else {
          output[key] = { ...source[key] }
        }
      } else {
        output[key] = source[key]
      }
    })

    return output
  }

  const findValueByKey = (obj: any, keyToFind: string): any => {
    for (const key in obj) {
      if (key === keyToFind) return obj[key]

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const value = findValueByKey(obj[key], keyToFind)
        if (value !== undefined) return value
      }
    }
    return undefined
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    // Manejo especial para campos booleanos y numéricos
    if (name === 'isActive') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === 'true',
      }))
      return
    }

    if (type === 'select-one') {
      const numericValue = isNaN(Number(value)) ? value : Number(value)
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }))
      return
    }

    // Manejo para password confirmation
    if (name === 'passwordConfirmation') {
      setPasswordConfirmation(value)
      const password = findValueByKey(formData, 'password') || ''
      setPasswordsMatch(password === value)
      return
    }

    // Manejo para campos anidados
    if (name.includes('.')) {
      const [parent, child] = name.split('.')

      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value, // Siempre establece el valor, incluso si está vacío
        },
      }))

      if (name === 'user.password') {
        setPasswordsMatch(value === passwordConfirmation)
      }
    } else {
      // Manejo para campos normales
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Siempre establece el valor, incluso si está vacío
      }))
    }
  }

  const handleSubmit = (callback: (data: Partial<T>) => void) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Obtener todos los elementos del formulario
      const formElements = e.currentTarget.elements

      // Crear objeto solo con los valores de los inputs
      const formInputValues: Partial<T> = {}

      // Recorrer todos los elementos del formulario
      Array.from(formElements).forEach((element) => {
        if (
          (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement) &&
          element.name // Solo elementos con nombre
        ) {
          // Manejar diferentes tipos de inputs
          let value: any

          if (element.type === 'checkbox') {
            value = (element as HTMLInputElement).checked
          } else if (element.type === 'number') {
            value = Number(element.value)
          } else if (element.type === 'file') {
            value = (element as HTMLInputElement).files
          } else {
            value = element.value
          }

          // Manejar campos anidados (ej: "user.name")
          if (element.name.includes('.')) {
            const keys = element.name.split('.')
            let current: any = formInputValues

            keys.forEach((key, index) => {
              if (index === keys.length - 1) {
                current[key] = value
              } else {
                current[key] = current[key] || {}
                current = current[key]
              }
            })
          } else {
            formInputValues[element.name as keyof T] = value
          }
        }
      })

      // Llamar al callback con solo los valores de los inputs
      callback(formInputValues)
    }
  }

  return {
    handleChange,
    handleSubmit,
    passwordsMatch,
    formData,
    fillFormWithData,
    setFormData,
  }
}
