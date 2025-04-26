import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Tabs from '../../components/tabs'
import Title from '../../components/title'
import ContentTabs from '../../components/tabs/components/contentTabs'
import Table from '../../components/table'
import { useWebApiReward } from '../../utils/api/webApiReward'
import usePagination from '../../hooks/usePagination'
import { Reward } from '../../interfaces/types'
import ModalDiscount from './components/ModalDiscount'
import ModalDonative from './components/ModalDonative'
import ModalService from './components/ModalService'

const Rewards = () => {
  const [tab, setTab] = useState<string>('all')
  const [rewards, setRewards] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const { getRewards } = useWebApiReward()
  const { page, totalPages, setPage, refresh, setFilters } =
    usePagination<Reward>(getRewards, 10, setRewards)

  useEffect(() => {
    console.log('🚀 ~ Rewards ~ tab:', tab)
  }, [tab])

  const tabs = [
    { name: 'Todas', value: 'all' },
    { name: 'Descuentos', value: 'discount' },
    { name: 'Donativos', value: 'donation' },
    { name: 'Servicios', value: 'services' },
  ]

  return (
    <MainLayout>
      <Title title="Recompensas" />
      <div className="flex justify-between items-center mt-10 w-full">
        <Tabs tabs={tabs} selected={tab} action={(data) => setTab(data)} />
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
          pagination={{ page, totalpages: totalPages }}
          changePage={setPage}
          refresh={refresh}
        />
      </ContentTabs>
      {isOpen &&
        (tab == 'donation' ? (
          <ModalDonative
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            type={tab}
          />
        ) : tab == 'services' ? (
          <ModalService
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            type={tab}
          />
        ) : (
          <ModalDiscount
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            type={tab}
          />
        ))}
    </MainLayout>
  )
}

export default Rewards
