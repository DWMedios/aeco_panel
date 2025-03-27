import { useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import { companies } from '../../constants/dumies/companies'
import ModalCompanies from './components/ModalCompanies'

const Companies = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')

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
            'Maquinas activas',
            'Dirección',
            'Rfc',
            'Estatus',
          ],
          data: companies,
        }}
        columns={[
          'id',
          'name',
          'machines',
          'address',
          'rfc',
          { column: 'status', type: 'chip' },
        ]}
        openModal={() => setIsOpen(true)}
        setTitleModal={setTitleModal}
      />
      {isOpen && (
        <ModalCompanies onClose={() => setIsOpen(false)} title={titleModal} />
      )}
    </MainLayout>
  )
}
export default Companies
