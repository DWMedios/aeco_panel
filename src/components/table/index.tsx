import React, { useState } from 'react'
import { ColumnType, TableContent } from '../../interfaces/table'
import ButtonAdd from './components/ButtonAdd'
import Filters from './components/Filters'
import Pagination from './components/table/Pagination'
import TBody from './components/table/TBody'
import THeader from './components/table/THeader'
import ModalDelete from '../modals/Delete'
import { ApiResponseBase, FilterOption } from '../../interfaces/types'

interface Props {
  addButton?: boolean
  tableContent: TableContent
  columns: (string | ColumnType)[]
  openModal?: () => void
  setTitleModal?: (title: string) => void
  pagination?: ApiResponseBase | null
  changePage?: (page: number) => void
  filters?: FilterOption[] | null
  setFilters?: (filters: Record<string, any> | null) => void
  refresh?: () => void
  handleDelete?: (id: number) => void
  setFormData?: (data: any) => void
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
  setFilters,
  refresh,
  handleDelete,
  setFormData,
}: Props) => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)

  return (
    <>
      <div className="flex justify-between items-center my-4 w-[90%]">
        <div>{addButton && <ButtonAdd openModal={openModal} />}</div>
        <div className="justify-end">
          {filters && (
            <Filters
              filters={filters}
              setFilters={setFilters}
              refresh={refresh}
            />
          )}
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
            setDeleteId={setDeleteId}
            setFormData={setFormData}
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
      {isOpenDelete && (
        <ModalDelete
          onClose={() => setIsOpenDelete(false)}
          onDelete={() => {
            if (handleDelete) {
              handleDelete(deleteId)
            }
            setIsOpenDelete(false)
          }}
        />
      )}
    </>
  )
}

export default Table
