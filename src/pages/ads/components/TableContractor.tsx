import { useEffect, useState } from 'react'
import Table from '../../../components/table'
import usePagination from '../../../hooks/usePagination'
import Filters from '../../../components/filters'
import { useWebApiContractors } from '../../../utils/api/webApiContractor'
import ModalContractors from './ModalContractors'

const TableContractor = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [data, setData] = useState<any[]>([])
  const [formData, setFormData] = useState<any | Record<string, any>>({})
  const { deleteContractor, getContractors } = useWebApiContractors()
  const { page, totalPages, setPage, refresh, setFilters } = usePagination<any>(
    getContractors,
    10,
    setData
  )

  const handleDelete = async (id: number) => {
    try {
      await deleteContractor(id)
      refresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Error deleting user:', error)
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
          { name: 'name', label: 'Nombre' },
          { name: 'email', label: 'Email' },
        ]}
        setFilters={setFilters}
      />
      <Table
        tableContent={{
          headers: ['Folio', 'Nombre', 'Empresa', 'Telefono'],
          data: data.map((item: any) => ({
            ...item,
            companyName: item.company.name,
          })),
        }}
        columns={['id', 'name', 'companyName', 'phone']}
        openModal={() => {
          setIsOpen(true)
          setFormData({})
        }}
        setTitleModal={setTitleModal}
        pagination={{ page, totalpages: totalPages }}
        changePage={setPage}
        handleDelete={handleDelete}
        setFormData={setFormData}
      />
      {isOpen && (
        <ModalContractors
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          contractorId={formData.id}
        />
      )}
    </>
  )
}

export default TableContractor
