import { useEffect, useState } from 'react'
import Table from '../../../components/table'
import usePagination from '../../../hooks/usePagination'
import Filters from '../../../components/filters'
import { useWebApiAds } from '../../../utils/api/webApiAds'
import ModalAds from './ModalAds'

const TableAds = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [ads, setAds] = useState<any[]>([])
  const [formData, setFormData] = useState<any | Record<string, any>>({})
  const { getAds, deleteAds } = useWebApiAds()
  const { page, totalPages, setPage, refresh, setFilters } = usePagination<any>(
    getAds,
    10,
    setAds
  )

  const handleDelete = async (id: number) => {
    try {
      await deleteAds(id)
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
          headers: ['Folio', 'Empresa', 'Contratsitas', 'Campaña', 'Estatus'],
          data: ads.map((item: any) => ({
            ...item,
            companyName: item.company.name,
          })),
        }}
        columns={[
          'id',
          'companyName',
          'totalContractors',
          'totalCampaigns',
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
        <ModalAds
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          adsId={formData.id}
        />
      )}
    </>
  )
}

export default TableAds
