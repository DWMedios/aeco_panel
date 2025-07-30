import { Broom } from '@phosphor-icons/react'
import useFormWithValidation from '../../../hooks/useForm'
import { FilterOption } from '../../../interfaces/types'
import { cleanEmptyFields } from '../../../utils/cleanObject'

interface props {
  filters: FilterOption[]
  setFilters: (filters: Record<string, any>) => void
}

const FormFilters = ({ filters, setFilters }: props) => {
  const { handleChange, handleSubmit, resetForm, values } =
    useFormWithValidation<Record<string, any>>({}, {})

  const handleFormSubmit = async (data: Record<string, any>) => {
    setFilters(cleanEmptyFields(data))
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className=" w-full flex justify-between items-center p-2 text-sm">
          <div className="border-r-2 border-gray-300">
            <span className="text-gray-400 p-2">Filtros</span>
          </div>
          {filters.map((filter, index) => (
            <>
              {filter.type === 'select' ? (
                <select
                  key={index}
                  onChange={handleChange}
                  name={filter.name}
                  value={values[filter.name] || ''}
                  className="border-2 border-dark-gray rounded-full px-2 py-1 m-1 text-xs"
                >
                  <option value="">{filter.label}</option>
                  {filter.options?.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={index}
                  placeholder={filter.label}
                  onChange={handleChange}
                  name={filter.name}
                  value={values[filter.name] || ''}
                  className="border-2 border-dark-gray rounded-full px-2 py-1 m-1 text-xs"
                />
              )}
            </>
          ))}
          <button
            type="submit"
            className="h-10 w-10 hover:bg-slate-400 rounded-lg flex items-center justify-center"
          >
            <img src="/images/search.png" alt="" className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              resetForm()
              setFilters({})
            }}
            className="p-2 hover:bg-slate-400 rounded-lg flex items-center justify-center"
          >
            <Broom size={20} color="blue" weight="fill" />
          </button>
        </div>
      </form>
    </>
  )
}

export default FormFilters
