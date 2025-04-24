import { useState } from 'react'
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

  const validateField = (name: string, value: any): string => {
    const rules = getFieldRules(name)
    if (!rules) return ''

    if (rules.required && (!value || value === '')) {
      return rules.errorMessages?.required || `Este campo es obligatorio`
    }

    if (!value && value !== 0) return ''

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.errorMessages?.pattern || `Formato inválido`
    }

    if (rules.minLength && String(value).length < rules.minLength) {
      return (
        rules.errorMessages?.minLength || `Mínimo ${rules.minLength} caracteres`
      )
    }

    if (rules.maxLength && String(value).length > rules.maxLength) {
      return (
        rules.errorMessages?.maxLength || `Máximo ${rules.maxLength} caracteres`
      )
    }

    if (rules.validate) {
      const validationError = rules.validate(value, values)
      if (validationError) return validationError
    }

    return ''
  }

  const getFieldRules = (
    fieldPath: string
  ): ValidationRules[string] | undefined => {
    if (validationRules[fieldPath]) {
      return validationRules[fieldPath]
    }

    const parts = fieldPath.split('.')
    if (parts.length > 1) {
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

  const get = (obj: Record<string, any>, path: string): any => {
    const keys = path.split('.')
    return keys.reduce((o, k) => (o || {})[k], obj)
  }

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

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target
    const newValues = set({ ...values }, name, value)
    setValues(newValues as T)

    if (validateOnChange || touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }

    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const setValue = (name: string, value: any) => {
    const newValues = set({ ...values }, name, value)
    setValues(newValues as T)

    if (validateOnChange || touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }

    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleBlur = (e: BlurEvent) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    if (validateOnBlur) {
      const value = get(values, name)
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    const newTouched: Record<string, boolean> = {}
    let isValid = true

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

  const handleSubmit =
    (onSubmit: (values: T) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Obtener los datos actuales del formulario
      const formElement = e.currentTarget
      const formData = new FormData(formElement)

      // Convertir FormData a un objeto que siga la estructura de initialValues
      const currentFormValues = {} as T
      formData.forEach((value, key) => {
        // Ignorar el campo passwordConfirmation
        if (key !== 'passwordConfirmation') {
          // Para manejar campos anidados (como 'user.name')
          set(currentFormValues, key, value)
        }
      })

      if (validateOnSubmit && !validateForm()) {
        setIsSubmitting(false)
        return
      }

      // Usar los valores actuales del formulario en lugar de los del estado
      onSubmit(currentFormValues)
      setIsSubmitting(false)
    }

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
