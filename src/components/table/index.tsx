import { useState } from 'react'
import { ColumnType, TableContent } from '../../interfaces/table'
import Pagination from './components/table/Pagination'
import TBody from './components/table/TBody'
import THeader from './components/table/THeader'
import ModalDelete from '../modals/Delete'
import { ApiResponseBase } from '../../interfaces/types'

interface Props {
  tableContent: TableContent
  columns: (string | ColumnType)[]
  openModal?: () => void
  setTitleModal?: (title: string) => void
  pagination?: ApiResponseBase | null
  changePage?: (page: number) => void
  handleDelete?: (id: number) => void
  setFormData?: (data: any) => void
  page?: number
  actionRemove?: boolean
}
const Table = ({
  tableContent,
  columns,
  openModal,
  setTitleModal,
  pagination = null,
  changePage = () => {},
  handleDelete,
  setFormData,
  page = 1,
  actionRemove = false,
}: Props) => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<number>(0)

  return (
    <>
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
            actionRemove={actionRemove}
          />
        </table>
      </div>
      {pagination && pagination.totalpages > 1 && (
        <div className="w-[90%] m-6 flex justify-center content-center">
          {pagination && (
            <Pagination
              page={page}
              changePage={changePage}
              totalPage={pagination.totalpages}
            />
          )}
        </div>
      )}
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
