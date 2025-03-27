import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

interface Props {
  title: string
  subTitle: string
  data: { x: string; y: number }[]
}

const BarChart = ({ subTitle, title, data }: Props) => {
  const [state] = useState<{
    series: { name: string; data: { x: string; y: number }[] }[]
    options: ApexOptions
  }>({
    series: [
      {
        name: 'Cantidad',
        data: data,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          barHeight: '40px',
          horizontal: true,
          borderRadius: 20,
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
          fontSize: '14px',
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
    },
  })

  return (
    <div className="p-4 rounded-lg shadow-lg" style={{ fontWeight: 400 }}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>{subTitle}</span>
        <span>Cantidad</span>
      </div>
      <div className="flex ">
        <div className="flex-grow">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={300}
          />
        </div>
        <div className="flex flex-col h-[100%vh] py-8">
          <div className={`grid grid-rows-${data.length} h-full`}>
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
