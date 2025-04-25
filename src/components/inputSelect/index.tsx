import React, { useState } from 'react'

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
}: Props) => {
  const [focused, setFocused] = useState(false)

  const shouldShowLabel = focused || value !== ''

  return (
    <div className={`relative ${divClassName}`}>
      {shouldShowLabel && (
        <label
          htmlFor={name}
          className="absolute -top-2 left-2 bg-white px-1 text-sm text-gray-600 z-10"
        >
          {placeholder}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          onBlur(e)
          setFocused(false)
        }}
        onFocus={() => setFocused(true)}
        className={`rounded-full border-2 border-gray-300 p-2 ${className}`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
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
