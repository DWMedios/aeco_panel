import { useState } from 'react'
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
import Filters from '../../components/filters'

const Rewards = () => {
  const [tab, setTab] = useState<string>('all')
  const [rewards, setRewards] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [formData, setFormData] = useState<Reward | Record<string, any>>({})
  const { getRewards } = useWebApiReward()
  const { page, totalPages, setPage, refresh, setFilters } =
    usePagination<Reward>(getRewards, 10, setRewards)

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
        <Filters
          addButton={true}
          filters={[
            { name: 'folio', label: 'Folio' },
            { name: 'name', label: 'Nombre' },
            { name: 'type', label: 'Categoria' },
            { name: 'establishment', label: 'Establecimiento' },
            { name: 'status', label: 'Estatus' },
          ]}
          refresh={refresh}
          setFilters={setFilters}
        />
        <Table
          tableContent={{
            headers: [
              'Folio',
              'Nombre',
              'Categoria',
              'Establecimiento',
              'Estatus',
            ],
            data: rewards,
          }}
          columns={[
            'id',
            'name',
            'type',
            'establishment',
            { column: 'status', type: 'chip' },
          ]}
          openModal={() => {
            setIsOpen(true)
            setFormData({})
          }}
          setTitleModal={setTitleModal}
          handleDelete={() => {}}
          pagination={{ page, totalpages: totalPages }}
          changePage={setPage}
          setFormData={setFormData}
        />
      </ContentTabs>
      {isOpen &&
        (tab == 'donation' ? (
          <ModalDonative
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            reward={formData}
          />
        ) : tab == 'services' ? (
          <ModalService
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            reward={formData}
          />
        ) : (
          <ModalDiscount
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            reward={formData}
          />
        ))}
    </MainLayout>
  )
}

export default Rewards
