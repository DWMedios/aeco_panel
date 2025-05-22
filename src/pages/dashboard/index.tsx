import { useEffect } from 'react'
import BarChart from '../../components/charts/barChart'
import ColumnChart from '../../components/charts/columnChart'
import InputDateRangePicker from '../../components/DateRangePicker'
import MainLayout from '../../components/layout'
import Title from '../../components/title'
import { containersCharts } from '../../constants/dumies/products'
import { useDashboardStats } from '../../hooks/useDashboardStats'

const Dashboard = () => {
  const {
    setDates, // viene del hook
    dailyStats,
    topProducts,
    topPackagings,
    packagingsPerDay,
    loading,
    error,
  } = useDashboardStats({ companyId: 1 })

  return (
    <MainLayout>
      <Title title="Inicio" />
      <div className="flex justify-end mt-8 ">
        <InputDateRangePicker setDates={setDates} />
      </div>
      <div className="flex justify-center items-center bg-gray-200 mt-8 rounded-full py-1">
        <div className="border-x-2 border-gray-300 px-4">
          <div className="flex justify-center items-center text-xl">
            {dailyStats
              ? dailyStats.totalTickets >= 1000
                ? `${(dailyStats.totalTickets / 1000).toFixed(1)}K`
                : dailyStats.totalTickets
              : 0}
          </div>
          <span className="text-xs">Total de tickets emitidos</span>
        </div>
      </div>
      <div className=" bg-gray-200 mt-8 rounded-3xl">
        <ColumnChart
          categories={packagingsPerDay ? packagingsPerDay.categories : []}
          data={packagingsPerDay ? packagingsPerDay.data : []}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* <div className="p-8 bg-gray-200 mt-8 rounded-3xl">
          <BarChart
            title="Top Recompensas"
            subTitle="Recompensas Emitidas"
            data={[]}
          />
        </div> */}
        <div className="p-8 bg-gray-200 mt-8 rounded-3xl">
          <BarChart
            title="Top Refresco"
            subTitle="Marca"
            data={topProducts ? topProducts : []}
          />
        </div>
        <div className="p-8 bg-gray-200 mt-8 rounded-3xl">
          <BarChart
            title="Top Tipo de Envase"
            subTitle="Tipo"
            data={topPackagings ? topPackagings : containersCharts}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
