import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import ModalMachines from './components/ModalMachines'
import { Aeco } from '../../interfaces/types'
import usePagination from '../../hooks/usePagination'
import { useWebApiAeco } from '../../utils/api/webApiAeco'
import Filters from '../../components/filters'

const Aecos = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [aecos, setAecos] = useState<Aeco[]>([])
  const [formData, setFormData] = useState<Aeco | Record<string, any>>({})

  const { getAecos, deleteAeco } = useWebApiAeco()

  const { page, totalPages, setPage, refresh, setFilters } =
    usePagination<Aeco>(getAecos, 10, setAecos)

  const handleDelete = async (id: number) => {
    try {
      await deleteAeco(id)
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
    <MainLayout>
      <Title title="Maquinas" />
      <Filters
        addButton={true}
        filters={[
          { name: 'folio', label: 'Folio' },
          { name: 'name', label: 'Nombre' },
          { name: 'status', label: 'Estatus' },
        ]}
        refresh={refresh}
        setFilters={setFilters}
      />
      <Table
        tableContent={{
          headers: ['Folio', 'Nombre', 'Numero de serie', 'Estatus'],
          data: aecos,
        }}
        columns={[
          'folio',
          'name',
          'serialNumber',
          { column: 'status', type: 'chip' },
        ]}
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
        <ModalMachines
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          aeco={formData}
        />
      )}
    </MainLayout>
  )
}
export default Aecos
