interface Props {
  onClose: () => void
}

const ModalDelete = ({ onClose }: Props) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-[50px] shadow-lg w-full max-w-2xl relative  max-h-[90%] ">
        <div className="flex justify-center items-center py-4 px-6 ">
          <h2 className="text-3xl font-semibold text-center">
            ¿Deseas eliminar de manera permanente?
          </h2>
        </div>
        <div className="flex justify-center text-2xl gap-8 mx-8 mt-4">
          <button
            onClick={onClose}
            className="rounded-2xl bg-red-500 p-2 w-28 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            No
          </button>
          <button
            onClick={onClose}
            className="rounded-2xl bg-green-600 p-4 w-28 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Si
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalDelete
