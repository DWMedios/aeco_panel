import { useState } from 'react'
import MainLayout from '../../components/layout'
import Title from '../../components/title'
import Tabs from '../../components/tabs'
import TableContractors from './components/TableContractor'
import TableCampaings from './components/TableCampaings'
import TableAdvertising from './components/TableAdvertising'
import { Alert } from '../../interfaces/types'

const Advertising = () => {
  const [showAlert, setShowAlert] = useState<Alert | null>(null)
  const [tab, setTab] = useState<string>('ads')

  const tabs = [
    { name: 'Publicidad', value: 'ads' },
    { name: 'Anunciantes', value: 'contractors' },
    { name: 'Campañas', value: 'campaings' },
  ]

  return (
    <MainLayout alertProps={showAlert}>
      <Title title="Publicidad" />
      <div className="flex justify-between items-center mt-10 w-full">
        <Tabs tabs={tabs} selected={tab} action={(data) => setTab(data)} />
      </div>

      {tab == 'ads' ? (
        <TableAdvertising setShowAlert={setShowAlert} />
      ) : tab == 'contractors' ? (
        <TableContractors setShowAlert={setShowAlert} />
      ) : (
        <TableCampaings setShowAlert={setShowAlert} />
      )}
    </MainLayout>
  )
}
export default Advertising
