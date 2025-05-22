import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import ModalMachines from './components/ModalMachines'
import { Aeco, Alert } from '../../interfaces/types'
import usePagination from '../../hooks/usePagination'
import { useWebApiAeco } from '../../utils/api/webApiAeco'
import Filters from '../../components/filters'

const Aecos = () => {
  const [showAlert, setShowAlert] = useState<Alert | null>(null)
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
      setShowAlert({
        message: 'La máquina ha sido eliminada correctamente',
        type: 'success',
      })
    } catch (error) {
      setShowAlert({
        message: 'Error al eliminar la máquina',
        type: 'error',
      })
      console.error('Error deleting user:', error)
    }
  }

  useEffect(() => {
    if (formData.id) {
      setTitleModal('Editar')
    }
  }, [formData])

  return (
    <MainLayout alertProps={showAlert}>
      <Title title="Maquinas" />
      <Filters
        addButton={true}
        filters={[
          { name: 'folio', label: 'Folio' },
          { name: 'name', label: 'Nombre' },
          { name: 'status', label: 'Estatus' },
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
          setShowAlert={setShowAlert}
        />
      )}
    </MainLayout>
  )
}
export default Aecos
