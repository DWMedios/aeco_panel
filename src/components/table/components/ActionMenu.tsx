import { DotsThree, PencilSimple, Trash } from '@phosphor-icons/react'

interface Props {
  openModal?: () => void
  setTitleModal?: (title: string) => void
  openModalDelete?: () => void
}

const ActtionMenu = ({ openModal, setTitleModal, openModalDelete }: Props) => {
  return (
    <div className="absolute top-1/2 right-[-150px] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex justify-between gap-2">
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-yellow-400 shadow-md">
          <PencilSimple
            onClick={() => {
              setTitleModal?.('Editar')
              openModal?.()
            }}
            size={25}
            color="black"
            weight="bold"
          />
        </div>
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-red-500 shadow-md">
          <Trash
            onClick={() => openModalDelete?.()}
            size={25}
            color="white"
            weight="bold"
          />
        </div>
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-blue-500 shadow-md">
          <DotsThree size={25} color="white" weight="bold" />
        </div>
      </div>
    </div>
  )
}

export default ActtionMenu
