import { useEffect, useState } from 'react'
import Table from '../table'

interface Props {
  title?: string
  options?: Record<string, any>[]
  search: (value: string) => void
  className?: string
  setSelected: (option: any) => void
  selected: any[]
}

const SearchableSelect = ({
  options = [],
  search,
  className = '',
  setSelected,
  selected = [],
  title = 'maquinas',
}: Props) => {
  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    if (options.length > 0 && inputValue.length >= 3) {
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }, [options, inputValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.length >= 3) {
      search(value)
    } else {
      setShowOptions(false)
    }
  }

  const handleSelect = (option: any) => {
    setSelected([...selected, option])
    setShowOptions(false)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false)
    }, 200)
  }

  const handleFocus = () => {
    if (options.length > 0 && inputValue.length >= 3) {
      setShowOptions(true)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xlmt-8 p-4">
      <div className="flex items-center justify-start gap-6">
        <span className="text-2xl">Listado de {title}</span>
      </div>
      <div className="flex items-center justify-start gap-4 flex-wrap">
        <div className={`relative ${className}`}>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Buscar máquina..."
            className="border-2 border-gray-300 text-sm rounded-full 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {showOptions && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {options.map((option, i) => (
                <li
                  key={`${option.value}-${i}`}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Table
        columns={['value', 'label', { column: 'status', type: 'chip' }]}
        tableContent={{
          headers: ['Id', 'Nombre', 'Estatus'],
          data: [...selected],
        }}
      />
    </div>
  )
}

export default SearchableSelect
