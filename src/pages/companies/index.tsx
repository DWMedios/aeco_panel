import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import ModalCompanies from './components/ModalCompanies'
import { ApiResponseList, Company } from '../../interfaces/types'
import { fetchRequest } from '../../utils/api/fetch'
import usePagination from '../../hooks/usePagination'

const Companies = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [companies, setCompanies] = useState<Company[]>([])

  const { page, totalPages, setPage } = usePagination<Company>(
    '/companies',
    10,
    setCompanies
  )

  useEffect(() => {
    getCompanies()
  }, [])

  const getCompanies = async () => {
    try {
      const response = await fetchRequest<ApiResponseList>({
        url: '/companies',
        method: 'GET',
      })
      setCompanies(response?.records)
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }

  return (
    <MainLayout>
      <Title title="Empresas" />
      <Table
        addButton={true}
        filters={['Folio', 'Nombre', 'RFC', 'Estatus']}
        tableContent={{
          headers: [
            'Folio',
            'Nombre',
            'Maquinas',
            'Dirección',
            'Rfc',
            'Estatus',
          ],
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
        openModal={() => setIsOpen(true)}
        setTitleModal={setTitleModal}
        pagination={{ page, totalpages: totalPages }}
        changePage={setPage}
      />
      {isOpen && (
        <ModalCompanies onClose={() => setIsOpen(false)} title={titleModal} />
      )}
    </MainLayout>
  )
}
export default Companies
