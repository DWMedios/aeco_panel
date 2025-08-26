import React, { useEffect, useState } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'

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
  suffix?: React.ReactNode
  showPasswordToggle?: boolean
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
  suffix,
  showPasswordToggle = false,
}: Props) => {
  const [focused, setFocused] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const shouldShowLabel = focused || value !== ''

  // Determinar el tipo de input actual
  const currentType =
    showPasswordToggle && type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type

  // Determinar si hay un sufijo (custom o password toggle)
  const hasPasswordToggle = showPasswordToggle && type === 'password'
  const finalSuffix = hasPasswordToggle ? (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
    </button>
  ) : (
    suffix
  )

  useEffect(() => {
    if (touched && error) {
      setShowError(true)
    } else if (!error) {
      setShowError(false)
    }
  }, [error, touched])

  return (
    <div className={`relative ${divClassName}`}>
      {shouldShowLabel && (
        <label
          htmlFor={name}
          className="absolute -top-2 left-2 bg-white px-1 text-sm text-gray-600 z-10 "
        >
          {placeholder}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={currentType}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          onBlur(e)
          setFocused(false)
        }}
        onFocus={() => setFocused(true)}
        placeholder={shouldShowLabel ? '' : placeholder}
        className={`${className} text-xs ${finalSuffix ? 'pr-10' : ''}`}
        autoComplete={currentType === 'password' ? 'new-password' : 'on'}
      />
      {finalSuffix && (
        <div className="absolute right-3 top-6 transform -translate-y-1/2 cursor-pointer">
          {finalSuffix}
        </div>
      )}
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

export default InputField
