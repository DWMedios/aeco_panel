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
    setDates,
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
      
      {/* DateRangePicker - Mantiene diseño original en desktop */}
      <div className="flex justify-center sm:justify-end mt-4 sm:mt-8 px-4 lg:px-0">
        <div className="w-full sm:w-auto max-w-sm sm:max-w-none">
          <InputDateRangePicker setDates={setDates} />
        </div>
      </div>

      {/* Stats Card - Mantiene diseño original en desktop */}
      <div className="flex justify-center items-center bg-gray-200 mt-4 sm:mt-8 mx-4 lg:mx-0 rounded-full py-2 lg:py-1">
        <div className="border-x-2 border-gray-300 px-6 lg:px-4">
          <div className="flex justify-center items-center text-lg sm:text-xl">
            {dailyStats
              ? dailyStats.totalTickets >= 1000
                ? `${(dailyStats.totalTickets / 1000).toFixed(1)}K`
                : dailyStats.totalTickets
              : 0}
          </div>
          <span className="text-xs sm:text-sm text-center block">
            Total de tickets emitidos
          </span>
        </div>
      </div>

      {/* Column Chart - Con overflow control */}
      <div className="bg-gray-200 mt-4 sm:mt-8 mx-4 lg:mx-0 rounded-2xl sm:rounded-3xl p-4 lg:p-0 overflow-hidden">
        <div className="w-full h-auto">
          <ColumnChart
            categories={packagingsPerDay ? packagingsPerDay.categories : []}
            data={packagingsPerDay ? packagingsPerDay.data : []}
          />
        </div>
      </div>

      {/* Bar Charts Grid - Mantiene 2 columnas en desktop, 1 en móvil */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-0 mt-4 sm:mt-8">
        {/* Comentado como en el original */}
        {/* <div className="p-6 lg:p-8 bg-gray-200 rounded-2xl sm:rounded-3xl">
          <BarChart
            title="Top Recompensas"
            subTitle="Recompensas Emitidas"
            data={[]}
          />
        </div> */}
        
        <div className="p-6 lg:p-8 bg-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="w-full h-auto">
            <BarChart
              title="Top Refresco"
              subTitle="Marca"
              data={topProducts ? topProducts : []}
            />
          </div>
        </div>
        
        <div className="p-6 lg:p-8 bg-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="w-full h-auto">
            <BarChart
              title="Top Tipo de Envase"
              subTitle="Tipo"
              data={topPackagings ? topPackagings : containersCharts}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard