import { useEffect, useState } from 'react'
import Table from '../../../components/table'
import usePagination from '../../../hooks/usePagination'
import Filters from '../../../components/filters'
import { useWebApiContractors } from '../../../api/webApiContractor'
import ModalContractors from './ModalContractors'
import { Alert } from '../../../interfaces/types'

interface Props {
  setShowAlert: (alert: Alert) => void
}

const TableContractor = ({ setShowAlert }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [data, setData] = useState<any[]>([])
  const [formData, setFormData] = useState<any | Record<string, any>>({})
  const [mediaKey, setMediaKey] = useState<string | null>(null)
  const { deleteContractor, getContractors } = useWebApiContractors()
  const { page, totalPages, setPage, refresh, setFilters } = usePagination<any>(
    getContractors,
    10,
    setData,
    'createdAt',
    'desc'
  )

  const handleDelete = async (id: number) => {
    try {
      await deleteContractor(id)
      refresh()
      setIsOpen(false)
      setShowAlert({
        message: 'La empresa ha sido eliminada correctamente',
        type: 'success',
      })
    } catch (error: any) {
      setShowAlert({
        message: error.message,
        type: 'error',
      })
    }
  }

  useEffect(() => {
    if (formData.id) {
      setTitleModal('Editar')
    }
  }, [formData])

  return (
    <>
      <Filters
        addButton={true}
        filters={[
          {
            name: 'companyName',
            label: 'Empresa',
          },
          { name: 'name', label: 'Nombre' },
          { name: 'email', label: 'Correo' },
        ]}
        setFilters={setFilters}
        openModal={() => {
          setTitleModal('Crear')
          setIsOpen(true)
          setFormData({})
        }}
      />
      <Table
        tableContent={{
          headers: ['Id', 'Nombre', 'Empresa', 'Correo', 'Teléfono'],
          data: data.map((item: any) => ({
            ...item,
            companyName: item.company.name,
          })),
        }}
        columns={['id', 'name', 'companyName', 'email', 'phone']}
        openModal={() => {
          setIsOpen(true)
          setFormData({})
        }}
        setTitleModal={setTitleModal}
        pagination={{ page, totalpages: totalPages }}
        changePage={setPage}
        handleDelete={handleDelete}
        page={page}
        setFormData={setFormData}
      />
      {isOpen && (
        <ModalContractors
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          contractorId={formData.id}
          mediaKey={mediaKey}
          setMediaKey={setMediaKey}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  )
}

export default TableContractor
