import React from 'react'

interface Props {
  title: string
  subTitle: string
  data: { x: string; y: number }[]
}

const BarChart = ({ subTitle, title, data }: Props) => {
  return (
    <div className="w-full h-full overflow-hidden p-2" style={{ fontWeight: 400 }}>
      <h2 className="text-lg sm:text-xl font-semibold mb-2 truncate">{title}</h2>
      <div className="flex justify-between text-xs sm:text-sm font-semibold mb-4">
        <span className="truncate flex-1">{subTitle}</span>
        <span className="ml-2">Cantidad</span>
      </div>
      
      {/* Contenedor principal - las barras y números deben estar alineados */}
      <div className="w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mb-3 w-full group">
            {/* Contenedor de la barra individual */}
            <div className="flex-1 min-w-0 mr-3">
              <div className="flex items-center">
                {/* Etiqueta del producto con tooltip */}
                <div 
                  className="w-16 sm:w-20 text-xs mr-2 truncate cursor-pointer"
                  title={item.x} // Tooltip nativo para mostrar el nombre completo
                >
                  {item.x.length > 10 ? item.x.substring(0, 8) + '...' : item.x}
                </div>
                {/* Barra de progreso visual */}
                <div className="flex-1 bg-gray-300 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="bg-[#F4A8A3] h-4 rounded-full transition-all duration-300 group-hover:bg-[#F08A84]"
                    style={{ 
                      width: `${Math.min((item.y / Math.max(...data.map(d => d.y))) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Número alineado con cada barra */}
            <div className="w-10 sm:w-12 text-right flex-shrink-0">
              <span className="text-xs font-medium">
                {item.y >= 1000 ? `${(item.y / 1000).toFixed(1)}K` : item.y}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BarChart