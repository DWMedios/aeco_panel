import { useEffect } from 'react'
import { useAlertModal } from '../alert'
import Navbar from '../navbar'
import SideBar from '../sidebar'
import { Alert } from '../../interfaces/types'

interface Props {
  children: React.ReactNode
  alertProps?: Alert | null
}

const MainLayout = ({ children, alertProps }: Props) => {
  const { component: AlertModal, showAlert } = useAlertModal()

  useEffect(() => {
    if (alertProps) {
      showAlert(alertProps)
    }
  }, [alertProps])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar fijo en la parte superior */}
      <Navbar />
      
      {/* Sidebar */}
      <SideBar />
      
      {/* Contenido principal con margen responsivo que coincide con el sidebar */}
      <div className="transition-all duration-300 ease-in-out sm:ml-56 md:ml-60 lg:ml-64 xl:ml-72 ml-0 pt-16">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </div>
      
      {/* Modal de alertas */}
      {AlertModal}
    </div>
  )
}

export default MainLayout