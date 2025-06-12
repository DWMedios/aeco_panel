import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

interface Props {
  data: any[]
  categories: any[]
}

const ColumnChart = ({ categories, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 7 // Mostrar 7 días en móvil

  // Hook para detectar el tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Calcular datos paginados para móvil
  const getPaginatedData = () => {
    if (!isMobile) {
      return { data, categories }
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    
    return {
      data: data.slice(startIndex, endIndex),
      categories: categories.slice(startIndex, endIndex)
    }
  }

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = getPaginatedData()

  // Funciones de navegación
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))
  }

  const [state, setState] = useState<{
    series: { name: string; data: number[] }[]
    options: ApexOptions
  }>({
    series: [
      {
        name: 'envases',
        data: paginatedData.data,
      },
    ],
    options: {
      colors: ['#EC5454'],
      chart: {
        type: 'bar',
        height: isMobile ? 300 : 380,
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
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 300,
        },
      },
      xaxis: {
        categories: paginatedData.categories,
        labels: {
          style: {
            fontSize: isMobile ? '11px' : '12px',
            colors: '#000',
          },
          rotate: 0,
          hideOverlappingLabels: false,
        },
      },
      title: {
        text: isMobile 
          ? `Envases Depositados (Del ${currentPage * itemsPerPage + 1} al ${Math.min((currentPage + 1) * itemsPerPage, data.length)})`
          : 'Envases Depositados por día',
        style: {
          fontSize: isMobile ? '14px' : '16px',
        },
      },
      yaxis: {
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            fontSize: isMobile ? '10px' : '12px',
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: isMobile ? 8 : 15,
          columnWidth: isMobile ? '70%' : '70%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: !isMobile,
      },
      grid: {
        padding: {
          left: isMobile ? 15 : 20,
          right: isMobile ? 15 : 20,
          top: isMobile ? 10 : 20,
          bottom: isMobile ? 10 : 30,
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 300,
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '11px',
                },
                rotate: 0,
              },
            },
            title: {
              style: {
                fontSize: '12px',
              },
            },
            plotOptions: {
              bar: {
                borderRadius: 8,
                columnWidth: '70%',
              },
            },
          },
        },
      ],
    },
  })

  // Actualizar estado cuando cambien los datos, categorías, página o tamaño de pantalla
  useEffect(() => {
    const newPaginatedData = getPaginatedData()
    
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: 'envases',
          data: newPaginatedData.data,
        },
      ],
      options: {
        ...prevState.options,
        chart: {
          ...prevState.options.chart,
          height: isMobile ? 300 : 380,
        },
        xaxis: {
          ...prevState.options.xaxis,
          categories: newPaginatedData.categories,
          labels: {
            ...prevState.options.xaxis?.labels,
            style: {
              fontSize: isMobile ? '11px' : '12px',
              colors: '#000',
            },
            rotate: 0,
            hideOverlappingLabels: false,
          },
        },
        title: {
          ...prevState.options.title,
          text: isMobile 
            ? `Envases Depositados (Del ${currentPage * itemsPerPage + 1} al ${Math.min((currentPage + 1) * itemsPerPage, data.length)})`
            : 'Envases Depositados por día',
          style: {
            fontSize: isMobile ? '12px' : '16px',
          },
        },
        yaxis: {
          ...prevState.options.yaxis,
          labels: {
            style: {
              fontSize: isMobile ? '10px' : '12px',
            },
          },
        },
        plotOptions: {
          ...prevState.options.plotOptions,
          bar: {
            borderRadius: isMobile ? 8 : 15,
            columnWidth: '70%',
          },
        },
        legend: {
          show: !isMobile,
        },
        grid: {
          padding: {
            left: isMobile ? 15 : 20,
            right: isMobile ? 15 : 20,
            top: isMobile ? 10 : 20,
            bottom: isMobile ? 10 : 30,
          },
        },
      },
    }))
  }, [isMobile, categories, data, currentPage])

  // Reset página cuando cambien los datos
  useEffect(() => {
    setCurrentPage(0)
  }, [data, categories])

  return (
    <div className="w-full">
      {/* Controles de navegación para móvil */}
      {isMobile && data.length > itemsPerPage && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-t-lg">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#f38687] text-white hover:bg-[#f38687] active:bg-[#f38687]'
            }`}
          >
            <svg 
              className="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentPage ? 'bg-[#f38687]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              currentPage === totalPages - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#f38687] text-white hover:bg-[#f38687] active:bg-[#f38687]'
            }`}
          >
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Gráfica */}
      <div className="p-2 w-full overflow-hidden">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={isMobile ? 300 : 380}
          width="100%"
        />
      </div>
    </div>
  )
}

export default ColumnChart