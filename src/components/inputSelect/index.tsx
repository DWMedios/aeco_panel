import React from 'react'

interface Props {
  name: string
  placeholder: string
  value: string | number
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
  defaultPlaceholder = 'Selecciona una opcion',
}: Props) => {
  return (
    <div className={`relative ${divClassName}`}>
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 text-xs bg-white px-1 text-sm text-gray-600 z-10"
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
        <option value="">{defaultPlaceholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default InputSelect
