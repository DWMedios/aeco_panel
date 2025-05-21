import { X } from '@phosphor-icons/react'

interface Props {
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const Modal = ({ onClose, children, title }: Props) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="bg-white dark:bg-gray-800 p-4 rounded-[50px] shadow-lg w-full max-w-2xl relative  max-h-[90%] ">
        <div className="flex justify-between items-center rounded-full bg-gray-300 py-2 px-6 ">
          <h2 className="text-xl font-semibold text-center">{title}</h2>
          <button
            onClick={onClose}
            className="bg-red-500 p-1 rounded-md text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition justify-end"
          >
            <X size={15} weight="bold" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
export default Modal
