import React, { useEffect, useState } from 'react'

interface Props {
  name: string
  placeholder: string
  value: string | number | boolean | any
  options: Array<{ value: string | number; label: string }>
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
  error?: string
  touched?: boolean
  className?: string
  divClassName?: string
  defaultPlaceholder?: string
}

const InputSelect = ({
  name,
  placeholder,
  value = '',
  options,
  onChange,
  onBlur,
  error,
  touched,
  className = 'w-full',
  divClassName = '',
  defaultPlaceholder = 'Selecciona una opción',
}: Props) => {
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (touched && error) {
      setShowError(true)
      const timer = setTimeout(() => setShowError(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [onBlur])

  return (
    <div className={`relative ${divClassName}`}>
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600 z-10"
      >
        {placeholder}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          onBlur(e)
        }}
        className={`rounded-full border-2 border-gray-300 p-2 text-xs ${className}`}
      >
        <option value="" disabled hidden>
          {defaultPlaceholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showError && touched && error && (
        <div className="absolute -top-5 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-50 flex items-start gap-2 min-w-44">
          <span className="flex-1">{error}</span>
          <button
            className="text-white text-xs font-bold"
            onClick={() => setShowError(false)}
          >
            ✕
          </button>
          <div className="absolute left-20 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-500" />
        </div>
      )}
    </div>
  )
}

export default InputSelect
