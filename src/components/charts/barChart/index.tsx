
interface Props {
  title: string
  subTitle: string
  data: { x: string; y: number }[]
}

const BarChart = ({ subTitle, title, data }: Props) => {
  const maxValue = Math.max(...data.map(d => d.y))

  return (
    <div className="w-full h-full overflow-hidden p-2 font-normal">
      {/* Título principal */}
      <h2 className="text-lg sm:text-xl font-semibold mb-2 truncate">{title}</h2>

      {/* Subtítulo y encabezado */}
      <div className="flex justify-between text-xs sm:text-sm font-semibold mb-4">
        <span className="truncate flex-1">{subTitle}</span>
        <span className="ml-2 text-right">Cantidad</span>
      </div>

      {/* Barras */}
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.y / maxValue) * 100
          const showText = percentage > 15 // Mostrar el texto solo si hay suficiente espacio

          return (
            <div key={index} className="flex items-center group">

              {/* Barra visual */}
              <div className="flex-1 relative bg-gray-200 rounded-full h-5 overflow-hidden">
                <div
                  className="h-5 bg-[#F4A8A3] rounded-full transition-all duration-300 group-hover:bg-[#F08A84] flex items-center px-2"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                  title={`${item.x}: ${item.y}`}
                >
                  {showText && (
                    <span className="text-[10px] text-gray-100 tracking-wider font-black truncate">
                      {item.x}
                    </span>
                  )}
                </div>
              </div>

              {/* Valor a la derecha */}
              <div className="w-12 text-right ml-2 text-xs font-medium">
                {item.y >= 1000 ? `${(item.y / 1000).toFixed(1)}K` : item.y}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BarChart
