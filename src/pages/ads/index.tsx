import { useState } from 'react'
import MainLayout from '../../components/layout'
import ButtonAdd from '../../components/table/components/ButtonAdd'
import Title from '../../components/title'
import { ads } from '../../constants/dumies/ads'
import AdsCard from './components/AdsCard'
import { Trash } from '@phosphor-icons/react'

const Ads = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  return (
    <MainLayout>
      <Title title="Publicidad" />
      <div className="flex justify-between items-center my-4 w-[90%]">
        <div className="justify-end">
          <div className=" w-full flex justify-between items-center p-2">
            <div className="border-r-2 border-gray-300">
              <span className="text-gray-400 p-2">Agregar</span>
            </div>
            <div className="ml-4">
              <ButtonAdd label={false} openModal={() => setIsOpen(true)} />
            </div>
          </div>
        </div>
        <div className="justify-end">
          <div className="flex items-center bg-red-500 rounded-full p-2">
            <Trash size={25} color="white" weight="bold" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {ads.map((ad) => (
          <AdsCard key={ad.id} img={ad.image} name={ad.name} />
        ))}
      </div>
    </MainLayout>
  )
}
export default Ads
