import { FilterOption } from '../../interfaces/types'
import ButtonAdd from './components/ButtonAdd'
import FormFilters from './components/Form'

interface Props {
  addButton?: boolean
  openModal?: () => void
  filters: FilterOption[]
  setFilters: (filters: Record<string, any>) => void
  refresh: () => void
}

const Filters = ({
  openModal,
  addButton,
  filters,
  setFilters,
  refresh,
}: Props) => {
  return (
    <div className="flex justify-between items-center my-4 w-[90%]">
      <div>{addButton && <ButtonAdd openModal={openModal} />}</div>
      <div className="justify-end">
        <FormFilters
          filters={filters}
          setFilters={setFilters}
          refresh={refresh}
        />
      </div>
    </div>
  )
}

export default Filters
