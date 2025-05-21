import Navbar from '../navbar'
import SideBar from '../sidebar'

interface Props {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <SideBar />
      <div className="p-4 sm:ml-[225px]">
        <div className="p-4">{children}</div>
      </div>
    </>
  )
}

export default MainLayout
