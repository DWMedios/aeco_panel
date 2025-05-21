interface Props {
  onClose: () => void
  onDelete: () => void
}

const ModalDelete = ({ onClose, onDelete }: Props) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="bg-white dark:bg-gray-800 p-4 rounded-[30px] shadow-lg w-full max-w-lg relative  max-h-[80%] ">
        <div className="flex justify-center items-center py-4 px-6 ">
          <h2 className="text-xl font-semibold text-center">
            ¿Deseas eliminar de manera permanente?
          </h2>
        </div>
        <div className="flex justify-center text-lg gap-8 mx-8 mt-4">
          <button
            onClick={onClose}
            className="rounded-2xl bg-red-500 w-20 p-1 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            No
          </button>
          <button
            onClick={onDelete}
            className="rounded-2xl bg-green-600 p-1 w-20 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Si
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
