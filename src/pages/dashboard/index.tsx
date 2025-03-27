import BarChart from '../../components/charts/barChart'
import ColumnChart from '../../components/charts/columnChart'
import InputSelct from '../../components/inpuSelect'
import MainLayout from '../../components/layout'
import Title from '../../components/title'
import {
  containersCharts,
  productsCharts,
} from '../../constants/dumies/products'
import { rewardsCharts } from '../../constants/dumies/rewards'

const Dashboard = () => {
  return (
    <MainLayout>
      <Title title="Inicio" />
      <div className="flex justify-end mt-8 ">
        <div className="w-[10%]">
          <InputSelct
            placeholder="Periodicidad"
            bg={'#bbb8b8'}
            textColor="black"
          />
        </div>
      </div>
      <div className="flex justify-center items-center bg-gray-200 mt-8 rounded-full py-4">
        <div className="flex justify-center items-center text-3xl border-x-2 border-gray-300 w-[10%] p-6">
          50.9K
        </div>
      </div>
      <div className=" bg-gray-200 mt-8 rounded-3xl">
        <ColumnChart />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-8 bg-gray-200 mt-8 rounded-3xl">
          <BarChart
            title="Top Recompensas"
            subTitle="Recompensas Emitidas"
            data={rewardsCharts}
          />
        </div>
        <div className="p-8 bg-gray-200 mt-8 rounded-3xl">
          <BarChart
            title="Top Refresco"
            subTitle="Marca"
            data={productsCharts}
          />
        </div>
        <div className="p-8 bg-gray-200 mt-8 rounded-3xl">
          <BarChart
            title="Top Tipo de Envase"
            subTitle="Tipo"
            data={containersCharts}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
