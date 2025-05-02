import { Plus } from '@phosphor-icons/react'

interface Props {
  openModal?: () => void
  label?: boolean
}

const ButtonAdd = ({ openModal, label = true }: Props) => {
  return (
    <div className="flex flex-col items-center">
      {label ? <span>Agregar</span> : ''}
      <button
        onClick={openModal}
        className="flex justify-center btn btn-primary rounded-full bg-[#0D6EFD] w-24 p-2"
      >
        <Plus size={20} color="white" weight="bold" />
      </button>
    </div>
  )
}

export default ButtonAdd
