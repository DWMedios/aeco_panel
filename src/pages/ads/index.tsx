import { useState } from 'react'
import MainLayout from '../../components/layout'
import Title from '../../components/title'
import Tabs from '../../components/tabs'
import TableAds from './components/TableAds'
import TableContractors from './components/TableContractor'
import TableCampaings from './components/TableCampaings'

const Ads = () => {
  const [tab, setTab] = useState<string>('ads')

  const tabs = [
    { name: 'Publicidad', value: 'ads' },
    { name: 'Contratistas', value: 'contractors' },
    { name: 'Campañas', value: 'campaings' },
  ]

  return (
    <MainLayout>
      <Title title="Publicidad" />
      <div className="flex justify-between items-center mt-10 w-full">
        <Tabs tabs={tabs} selected={tab} action={(data) => setTab(data)} />
      </div>

      {tab == 'ads' ? (
        <TableAds />
      ) : tab == 'contractors' ? (
        <TableContractors />
      ) : (
        <TableCampaings />
      )}
    </MainLayout>
  )
}
export default Ads
