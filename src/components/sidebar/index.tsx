import { useState, useEffect } from 'react'
import { menu } from '../../constants/menu'
import MenuItem from './components/MenuItem'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Bloquear/desbloquear scroll del body cuando el sidebar esté abierto en móvil
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    // Cleanup: restaurar scroll cuando se desmonte el componente
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Botón de hamburguesa - solo visible en pantallas pequeñas */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-md"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Overlay para cerrar sidebar en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
          onClick={toggleSidebar}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        ></div>
      )}

      {/* Sidebar - responsivo con diferentes anchos */}
      <aside
        className={`
          fixed top-0 z-40 h-screen transition-transform duration-300 ease-in-out
          ${isOpen ? 'left-0' : '-left-full'} sm:left-0 
          w-60
          mx-2 my-4
        `}
        style={{ position: 'fixed' }}
        aria-label="Sidebar"
      >
        <div className="flex justify-center h-[97%] w-full py-4 sm:py-6 md:py-8 lg:py-9 bg-[#EDEDED] dark:bg-gray-800 border rounded-[30px] sm:rounded-[40px] md:rounded-[50px] shadow-lg">
          <ul className="flex flex-col items-center space-y-2 font-medium pb-4 w-full px-2">
            {/* Logo - responsivo */}
            <div className="mb-4 flex-shrink-0">
              <img 
                src="/images/dw.png" 
                alt="Logo" 
                className="w-auto h-10 object-contain"
              />
            </div>
            
            {/* Contenedor de menú con scroll */}
            <div className="overflow-y-auto h-full w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              {menu.map((item, index) => (
                <MenuItem key={index} menu={item} />
              ))}
            </div>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar