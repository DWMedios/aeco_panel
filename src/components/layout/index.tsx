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
    <>
      <Navbar />
      <SideBar />
      <div className="p-4 sm:ml-[225px]">
        <div className="p-4">{children}</div>
      </div>
      {AlertModal}
    </>
  )
}

export default MainLayout
