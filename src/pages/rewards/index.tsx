import { useState } from 'react'
import MainLayout from '../../components/layout'
import Tabs from '../../components/tabs'
import Title from '../../components/title'
import ContentTabs from '../../components/tabs/components/contentTabs'
import ModalRewards from './components/ModalRewards'
import Table from '../../components/table'
import { rewards } from '../../constants/dumies/rewards'

const Rewards = () => {
  const [tab, setTab] = useState<string>('Todas')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')

  return (
    <MainLayout>
      <Title title="Recompensas" />
      <div className="flex justify-between items-center mt-10 w-full">
        <Tabs
          tabs={['Todas', 'Descuentos', 'Donativos', 'Servicios']}
          action={(data) => setTab(data)}
        />
      </div>
      <ContentTabs>
        <Table
          addButton={true}
          filters={[
            { label: 'Folio', name: 'folio' },
            { label: 'Nombre', name: 'nombre' },
            { label: 'Dirección', name: 'direccion' },
            { label: 'Rfc', name: 'rfc' },
          ]}
          tableContent={{
            headers: ['Folio', 'Nombre', 'Categoría', 'Empresa', 'Estatus'],
            data: rewards,
          }}
          columns={[
            'id',
            'name',
            'category',
            'company',
            { column: 'status', type: 'chip' },
          ]}
          openModal={() => setIsOpen(true)}
          setTitleModal={setTitleModal}
          handleDelete={() => {}}
        />
      </ContentTabs>
      {isOpen && (
        <ModalRewards onClose={() => setIsOpen(false)} title={titleModal} />
      )}
    </MainLayout>
  )
}

export default Rewards
