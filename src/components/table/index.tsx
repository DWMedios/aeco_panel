import { useState } from 'react'
import { ColumnType, TableContent } from '../../interfaces/table'
import ButtonAdd from './components/ButtonAdd'
import Filters from './components/Filters'
import Pagination from './components/table/Pagination'
import TBody from './components/table/TBody'
import THeader from './components/table/THeader'
import ModalDelete from '../modals/Delete'
import { ApiResponseList } from '../../interfaces/types'

interface Props {
  filters?: string[]
  addButton?: boolean
  tableContent: TableContent
  columns: (string | ColumnType)[]
  openModal?: () => void
  setTitleModal?: (title: string) => void
  pagination?: Omit<ApiResponseList, 'records'> | null
  changePage?: (page: number) => void
}
const Table = ({
  filters,
  addButton = false,
  tableContent,
  columns,
  openModal,
  setTitleModal,
  pagination = null,
  changePage,
}: Props) => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)

  return (
    <>
      <div className="flex justify-between items-center my-4 w-[90%]">
        <div>{addButton && <ButtonAdd openModal={openModal} />}</div>
        <div className="justify-end">
          {filters && <Filters filters={filters} />}
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-[90%]">
          <THeader headers={tableContent.headers} />
          <TBody
            content={tableContent.data}
            columns={columns}
            setTitleModal={setTitleModal}
            openModal={openModal}
            openModalDelete={() => setIsOpenDelete(true)}
          />
        </table>
      </div>
      <div className="w-[90%] m-6 flex justify-center content-center">
        {pagination && (
          <Pagination
            page={pagination.page}
            changePage={() => changePage}
            totalPage={pagination.totalpages}
          />
        )}
      </div>
      {isOpenDelete && <ModalDelete onClose={() => setIsOpenDelete(false)} />}
    </>
  )
}

export default Table
