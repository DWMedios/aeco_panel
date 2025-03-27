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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-[50px] shadow-lg w-full max-w-3xl relative  max-h-[90%] ">
        <div className="flex justify-between items-center rounded-full bg-gray-300 py-4 px-6 ">
          <h2 className="text-3xl font-semibold text-center">{title}</h2>
          <button
            onClick={onClose}
            className="bg-red-500 p-1 rounded-md text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition justify-end"
          >
            <X size={20} weight="bold" />
          </button>
        </div>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          {children}
        </div>
        <div className="flex justify-end gap-8 mx-8 mt-4">
          <button
            onClick={onClose}
            className="rounded-full bg-red-500 p-2 w-48 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-green-600 p-2 w-48 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
export default Modal
