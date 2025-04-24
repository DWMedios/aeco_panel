import useFormWithValidation from '../../../hooks/useForm'
import { FilterOption } from '../../../interfaces/types'

interface props {
  filters?: FilterOption[]
  setFilters?: (filters: Record<string, any> | null) => void
  refresh?: () => void
}

const Filters = ({ filters, setFilters, refresh }: props) => {
  const { handleChange, handleSubmit } = useFormWithValidation<T>({})

  const handleFormSubmit = async (data: Record<string, any>) => {
    setFilters(data)
    if (refresh) refresh()
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className=" w-full flex justify-between items-center p-2">
          <div className="border-r-2 border-gray-300">
            <span className="text-gray-400 p-2">Filtros</span>
          </div>
          {filters.map((filter, index) => (
            <input
              key={index}
              placeholder={filter.label}
              onChange={handleChange}
              name={filter.name}
              className="text-sm border-2 border-dark-gray rounded-full px-2 py-1 m-1"
            />
          ))}
          <button type="submit">
            <img src="/images/search.png" alt="" />
          </button>
        </div>
      </form>
    </>
  )
}

export default Filters
