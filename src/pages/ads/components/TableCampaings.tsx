import { useEffect, useState } from 'react'
import Table from '../../../components/table'
import usePagination from '../../../hooks/usePagination'
import Filters from '../../../components/filters'
import { useWebApiCampaings } from '../../../utils/api/webApiCampaing'
import ModalCampaings from './ModalCampaings'

const TableCampaings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [data, setData] = useState<any[]>([])
  const [formData, setFormData] = useState<any | Record<string, any>>({})
  const { deleteCampaing, getCampaings } = useWebApiCampaings()
  const { page, totalPages, setPage, refresh, setFilters } = usePagination<any>(
    getCampaings,
    10,
    setData
  )

  const handleDelete = async (id: number) => {
    try {
      await deleteCampaing(id)
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
          { name: 'rfc', label: 'RFC' },
          { name: 'status', label: 'Estatus' },
        ]}
        setFilters={setFilters}
      />
      <Table
        tableContent={{
          headers: [
            'Folio',
            'Empresa',
            'Descripcion',
            'Descripciond del plan',
            'Estatus',
          ],
          data: data.map((item: any) => ({
            ...item,
            companyName: item.company.name,
          })),
        }}
        columns={[
          'id',
          'companyName',
          'description',
          'planDescription',
          { column: 'isEnabled', type: 'chip' },
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
        <ModalCampaings
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          campaingId={formData.id}
        />
      )}
    </>
  )
}

export default TableCampaings
