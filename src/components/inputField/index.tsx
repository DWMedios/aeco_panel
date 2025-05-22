import React, { useState } from 'react'

interface Props {
  name: string
  placeholder: string
  type?: string
  value?: string | number | undefined | any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  className?: string
  divClassName?: string
}

const InputField = ({
  name,
  placeholder,
  type = 'text',
  value = '',
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
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          onBlur(e)
          setFocused(false)
        }}
        onFocus={() => setFocused(true)}
        placeholder={shouldShowLabel ? '' : placeholder}
        className={`${className} text-xs`}
      />
      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default InputField
