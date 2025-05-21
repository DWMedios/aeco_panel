import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

interface Props {
  data: any[]
  categories: any[]
}

const ColumnChart = ({ categories, data }: Props) => {
  const [state, setState] = useState<{
    series: { name: string; data: number[] }[]
    options: ApexOptions
  }>({
    series: [
      {
        name: 'envases',
        data: data,
      },
    ],
    options: {
      colors: ['#EC5454'],
      chart: {
        type: 'bar',
        height: 380,
        width: 500,
        toolbar: {
          tools: {
            download: true,
            zoom: false,
            pan: false,
            reset: false,
            zoomin: false,
            zoomout: false,
          },
        },
      },
      xaxis: {
        tickAmount: 30,
        categories: categories,
        labels: {
          style: {
            fontSize: '12px',
            colors: '#000',
          },
        },
      },
      title: {
        text: 'Envases Depositados por día',
      },
      yaxis: {
        min: 0,
        max: 400,
        tickAmount: 4,
      },
      plotOptions: {
        bar: {
          borderRadius: 15,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  })

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: 'envases',
          data: data, // Actualiza los datos del gráfico
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: categories, // Actualiza las categorías del gráfico
        },
      },
    }))
  }, [categories, data])

  return (
    <div className="p-2">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={300}
      />
    </div>
  )
}

export default ColumnChart
