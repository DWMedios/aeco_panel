import { useState, useEffect } from 'react'
interface ChangeEvent {
  target: {
    name: string
    value: any
  }
}

interface BlurEvent {
  target: {
    name: string
  }
}

interface ValidationRules {
  [field: string]: {
    required?: boolean
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    validate?: (
      value: any,
      allValues: Record<string, any>
    ) => string | undefined
    errorMessages?: {
      required?: string
      pattern?: string
      minLength?: string
      maxLength?: string
    }
  }
}

interface FormOptions {
  validationRules?: ValidationRules
  validateOnChange?: boolean
  validateOnBlur?: boolean
  validateOnSubmit?: boolean
}

const useFormWithValidation = <T extends Record<string, any>>(
  initialValues: T,
  options: FormOptions = {}
) => {
  const {
    validationRules = {},
    validateOnChange = true,
    validateOnBlur = true,
    validateOnSubmit = true,
  } = options

  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // // Actualizar valores iniciales si cambian
  // useEffect(() => {
  //   setValues(initialValues)
  // }, [initialValues])

  // Validar un campo específico
  const validateField = (name: string, value: any): string => {
    const rules = getFieldRules(name)
    if (!rules) return ''

    // Validación de campo requerido
    if (rules.required && (!value || value === '')) {
      return rules.errorMessages?.required || `Este campo es obligatorio`
    }

    // Si el valor está vacío y no es requerido, no validar más
    if (!value && value !== 0) return ''

    // Validación de patrón (expresión regular)
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.errorMessages?.pattern || `Formato inválido`
    }

    // Validación de longitud mínima
    if (rules.minLength && String(value).length < rules.minLength) {
      return (
        rules.errorMessages?.minLength || `Mínimo ${rules.minLength} caracteres`
      )
    }

    // Validación de longitud máxima
    if (rules.maxLength && String(value).length > rules.maxLength) {
      return (
        rules.errorMessages?.maxLength || `Máximo ${rules.maxLength} caracteres`
      )
    }

    // Validación personalizada
    if (rules.validate) {
      const validationError = rules.validate(value, values)
      if (validationError) return validationError
    }

    return ''
  }

  // Obtener reglas de validación para un campo (incluye campos anidados)
  const getFieldRules = (
    fieldPath: string
  ): ValidationRules[string] | undefined => {
    // Si tenemos reglas directas para este campo
    if (validationRules[fieldPath]) {
      return validationRules[fieldPath]
    }

    // Si es un campo anidado (como 'user.name'), verificar si hay reglas para él
    const parts = fieldPath.split('.')
    if (parts.length > 1) {
      // Intentar encontrar reglas para el campo anidado
      let currentPath = ''
      for (let i = 0; i < parts.length; i++) {
        if (i === 0) {
          currentPath = parts[i]
        } else {
          currentPath += `.${parts[i]}`
        }

        if (validationRules[currentPath]) {
          return validationRules[currentPath]
        }
      }
    }

    return undefined
  }

  // Helper para acceder a propiedades anidadas
  const get = (obj: Record<string, any>, path: string): any => {
    const keys = path.split('.')
    return keys.reduce((o, k) => (o || {})[k], obj)
  }

  // Helper para establecer propiedades anidadas
  const set = (
    obj: Record<string, any>,
    path: string,
    value: any
  ): Record<string, any> => {
    const keys = path.split('.')
    const lastKey = keys.pop() as string
    const target = keys.reduce((o, k) => {
      if (!o[k]) o[k] = {}
      return o[k]
    }, obj)
    target[lastKey] = value
    return { ...obj }
  }

  // Manejar cambio de valor en un campo
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target
    const newValues = set({ ...values }, name, value)
    setValues(newValues as T)

    // Validación si está habilitada
    if (validateOnChange || touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }

    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  // Manejo personalizado para cambiar un valor
  const setValue = (name: string, value: any) => {
    const newValues = set({ ...values }, name, value)
    setValues(newValues as T)

    // Validación si está habilitada
    if (validateOnChange || touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }

    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  // Manejar evento de pérdida de foco
  const handleBlur = (e: BlurEvent) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    if (validateOnBlur) {
      const value = get(values, name)
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  // Validar todos los campos
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    const newTouched: Record<string, boolean> = {}
    let isValid = true

    // Validar todos los campos con reglas
    Object.keys(validationRules).forEach((fieldName) => {
      const value = get(values, fieldName)
      const error = validateField(fieldName, value)

      if (error) {
        isValid = false
      }

      newErrors[fieldName] = error
      newTouched[fieldName] = true
    })

    setErrors(newErrors)
    setTouched(newTouched)
    return isValid
  }

  // Manejar envío del formulario
  const handleSubmit =
    (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      if (validateOnSubmit && !validateForm()) {
        setIsSubmitting(false)
        return
      }

      onSubmit(values)
      setIsSubmitting(false)
    }

  // Resetear formulario
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setValues,
    resetForm,
    validateForm,
  }
}

export default useFormWithValidation
