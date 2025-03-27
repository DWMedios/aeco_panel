import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const ColumnChart = () => {
  const [state] = useState<{
    series: { name: string; data: number[] }[]
    options: ApexOptions
  }>({
    series: [
      {
        name: 'envases',
        data: [
          120, 340, 98, 210, 87, 365, 190, 255, 315, 44, 380, 176, 295, 130,
          222, 399, 89, 312, 55, 183, 200, 267, 143, 352, 174, 99, 130, 210,
          167, 380,
        ],
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
        categories: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
        ],
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

  return (
    <div className="p-2">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={380}
      />
    </div>
  )
}

export default ColumnChart
