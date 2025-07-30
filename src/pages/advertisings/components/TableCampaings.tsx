import { useEffect, useState } from 'react'
import Table from '../../../components/table'
import usePagination from '../../../hooks/usePagination'
import Filters from '../../../components/filters'
import ModalCampaings from './ModalCampaings'
import { useWebApiCampaings } from '../../../api/webApiCampaing'
import { Alert } from '../../../interfaces/types'

interface Props {
  setShowAlert: (alert: Alert) => void
}

const TableCampaings = ({ setShowAlert }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [data, setData] = useState<any[]>([])
  const [formData, setFormData] = useState<any | Record<string, any>>({})
  const [mediaKey, setMediaKey] = useState<string | null>(null)
  const { deleteCampaing, getCampaings } = useWebApiCampaings()
  const { page, totalPages, setPage, refresh, setFilters } = usePagination<any>(
    getCampaings,
    10,
    setData,
    'createdAt',
    'desc'
  )

  const handleDelete = async (id: number) => {
    try {
      await deleteCampaing(id)
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
          { name: 'contractName', label: 'Nombre' },
          { name: 'description', label: 'Descripción' },
          {
            name: 'isEnabled',
            label: 'Estatus',
            type: 'select',
            options: [
              { value: 'true', label: 'Activo' },
              { value: 'false', label: 'Inactivo' },
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
          headers: [
            'Folio',
            'Nombre',
            'Descripción',
            'Fecha de inicio',
            'Fecha de fin',
            'Empresa',
            'Estatus',
          ],
          data: data.map((item: any) => ({
            ...item,
            startDate: item.startDate.substring(0, 10),
            endDate: item.endDate.substring(0, 10),
            companyName: item.company.name,
          })),
        }}
        columns={[
          'id',
          'contractName',
          'description',
          'startDate',
          'endDate',
          'companyName',
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
        page={page}
        setFormData={setFormData}
      />
      {isOpen && (
        <ModalCampaings
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          campaingId={formData.id}
          mediaKey={mediaKey}
          setMediaKey={setMediaKey}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  )
}

export default TableCampaings
