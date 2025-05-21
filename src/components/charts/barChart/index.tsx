import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  title: string
  subTitle: string
  data: { x: string; y: number }[]
}

const BarChart = ({ subTitle, title, data }: Props) => {
  const series = [
    {
      name: 'Cantidad',
      data,
    },
  ]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        barHeight: '20px',
        horizontal: true,
        borderRadius: 10,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#F4A8A3'],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000'],
        fontSize: '10px',
      },
      formatter: (_val, opts) => {
        return `${opts.w.config.series[0].data[opts.dataPointIndex].x}`
      },
      textAnchor: 'start',
      offsetX: 0,
    },
    xaxis: {
      labels: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    grid: { show: false },
    tooltip: { enabled: true },
  }

  return (
    <div className="p-2 rounded-lg shadow-lg" style={{ fontWeight: 400 }}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>{subTitle}</span>
        <span>Cantidad</span>
      </div>
      <div className="flex ">
        <div className="flex-grow">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={250}
          />
        </div>
        <div className="flex flex-col h-[100%vh] p-8">
          <div className={`grid grid-rows-${data.length} h-full text-sm`}>
            {data.map(({ y }, index) => (
              <div
                key={index}
                className="border p-2 flex items-center justify-center"
              >
                <span>{y >= 1000 ? `${(y / 1000).toFixed(1)}K` : y}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarChart
