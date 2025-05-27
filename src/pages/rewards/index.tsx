import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Tabs from '../../components/tabs'
import Title from '../../components/title'
import ContentTabs from '../../components/tabs/components/contentTabs'
import Table from '../../components/table'
import { useWebApiReward } from '../../api/webApiReward'
import usePagination from '../../hooks/usePagination'
import { Alert, Reward } from '../../interfaces/types'
import ModalDiscount from './components/ModalDiscount'
import ModalDonative from './components/ModalDonative'
import ModalService from './components/ModalService'
import Filters from '../../components/filters'
import { useInputUpload } from '../../components/inputUpload'

const Rewards = () => {
  const [showAlert, setShowAlert] = useState<Alert | null>(null)
  const [tab, setTab] = useState<string>('all')
  const [rewards, setRewards] = useState<any>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [formData, setFormData] = useState<Reward | Record<string, any>>({})
  const [mediaKey, setMediaKey] = useState<string | null>(null)
  const { getRewards, deleteReward, getReward } = useWebApiReward()
  const { page, totalPages, setPage, refresh, setFilters, setDefaultFilters } =
    usePagination<Reward>(getRewards, 10, setRewards)
  const { deleteMediaAsset } = useInputUpload({
    title: '',
    type: 'image',
  })

  const tabs = [
    { name: 'Todas', value: 'all' },
    { name: 'Descuentos', value: 'discount' },
    { name: 'Donativos', value: 'donation' },
    { name: 'Servicios', value: 'service' },
  ]
  useEffect(() => {
    if (tab == 'all') {
      setFilters({})
      setDefaultFilters({})
    } else {
      setFilters({ type: tab })
    }
  }, [tab])

  const handleDelete = async (id: number) => {
    try {
      await deleteReward(id)
      if (mediaKey) deleteMediaAsset(mediaKey)
      setMediaKey(null)
      refresh()
      setIsOpen(false)
      setShowAlert({
        message: 'La recompensa ha sido eliminada correctamente',
        type: 'success',
      })
    } catch (error) {
      setShowAlert({
        message: 'Error al eliminar la recompensa',
        type: 'error',
      })
      console.error('Error deleting:', error)
    }
  }

  const getRewardsData = async ({ id }: Reward) => {
    try {
      if (id) {
        const response = (await getReward(id)) as Reward
        setMediaKey(response?.mediaAsset?.fileKey ?? null)
        if (response) {
          setFormData(response)
        }
      }
    } catch (error) {
      console.error('Error fetching rewards:', error)
    }
  }

  return (
    <MainLayout alertProps={showAlert}>
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
              'Categoria',
              'Establecimiento',
              'Estatus',
            ],
            data: rewards.map((item: any) => ({
              ...item,
              category:
                item.type === 'donation'
                  ? 'Donativo'
                  : item.type === 'service'
                  ? 'Servicio'
                  : 'Descuento',
            })),
          }}
          columns={[
            'id',
            'name',
            'category',
            'establishment',
            { column: 'status', type: 'chip' },
          ]}
          openModal={() => {
            setIsOpen(true)
            setFormData({})
          }}
          setTitleModal={setTitleModal}
          handleDelete={handleDelete}
          pagination={{ page, totalpages: totalPages }}
          changePage={setPage}
          setFormData={getRewardsData}
        />
      </ContentTabs>
      {isOpen &&
        (tab == 'donation' ? (
          <ModalDonative
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            reward={formData}
            mediaKey={mediaKey}
            setMediaKey={setMediaKey}
            setShowAlert={setShowAlert}
          />
        ) : tab == 'service' ? (
          <ModalService
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            reward={formData}
            mediaKey={mediaKey}
            setMediaKey={setMediaKey}
            setShowAlert={setShowAlert}
          />
        ) : (
          <ModalDiscount
            onClose={() => setIsOpen(false)}
            title={titleModal}
            onSaved={refresh}
            reward={formData}
            mediaKey={mediaKey}
            setMediaKey={setMediaKey}
            setShowAlert={setShowAlert}
          />
        ))}
    </MainLayout>
  )
}

export default Rewards
