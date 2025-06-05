import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import ModalCompanies from './components/ModalCompanies'
import { Alert, Company } from '../../interfaces/types'
import usePagination from '../../hooks/usePagination'
import { useWebApiCompany } from '../../api/webApiCompany'
import Filters from '../../components/filters'
import { useInputUpload } from '../../components/inputUpload'

const Companies = () => {
  const [showAlert, setShowAlert] = useState<Alert | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [companies, setCompanies] = useState<Company[]>([])
  const [formData, setFormData] = useState<Company | Record<string, any>>({})
  const [mediaKey, setMediaKey] = useState<string | null>(null)

  const { getCompanies, deleteCompany } = useWebApiCompany()
  const { deleteMediaAsset } = useInputUpload({
    title: '',
    type: 'image',
  })

  const { page, totalPages, setPage, refresh, setFilters } =
    usePagination<Company>(getCompanies, 10, setCompanies)

  const handleDelete = async (id: number) => {
    try {
      await deleteCompany(id)
      if (mediaKey) deleteMediaAsset(mediaKey)
      setMediaKey(null)
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
    <MainLayout alertProps={showAlert}>
      <Title title="Empresas" />
      <Filters
        addButton={true}
        filters={[
          { name: 'name', label: 'Nombre' },
          { name: 'rfc', label: 'RFC' },
          {
            name: 'status',
            label: 'Estatus',
            type: 'select',
            options: [
              { label: 'Activo', value: true },
              { label: 'Inactivo', value: false },
            ],
          },
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
          headers: ['Id', 'Nombre', 'Máquinas', 'Dirección', 'RFC', 'Estatus'],
          data: companies,
        }}
        columns={[
          'id',
          'name',
          'totalAecos',
          'address',
          'rfc',
          { column: 'status', type: 'chip' },
        ]}
        openModal={() => {
          setIsOpen(true)
          setFormData({})
        }}
        handleDelete={handleDelete}
        setTitleModal={setTitleModal}
        pagination={{ page, totalpages: totalPages }}
        changePage={setPage}
        page={page}
        setFormData={setFormData}
      />
      {isOpen && (
        <ModalCompanies
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          companyId={formData.id}
          mediaKey={mediaKey}
          setMediaKey={setMediaKey}
          setShowAlert={setShowAlert}
        />
      )}
    </MainLayout>
  )
}
export default Companies
