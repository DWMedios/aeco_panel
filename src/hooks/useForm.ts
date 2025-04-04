import { useState } from 'react'

type FormValues = Record<string, any>

export const useFormHelper = <T extends FormValues>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (callback: (data: T) => void) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      callback(formData)
    }
  }

  return { formData, handleChange, handleSubmit }
}
