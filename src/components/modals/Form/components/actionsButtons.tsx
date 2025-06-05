import { CircleNotch } from '@phosphor-icons/react'

interface Props {
  onClose: () => void
  loading: boolean
}
const ActionsButtons = ({ loading, onClose }: Props) => {
  return (
    <div className="flex justify-end gap-8 mx-8 mt-4">
      <button
        onClick={onClose}
        className="rounded-full text-sm bg-red-500 p-2 w-28 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="flex justify-center rounded-full text-sm bg-green-600 p-2 w-28 text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
        disabled={loading}
      >
        {loading && (
          <CircleNotch
            className="size-5 mr-3 animate-spin text-gray-500"
            weight="bold"
            color="white"
          />
        )}
        Guardar
      </button>
    </div>
  )
}

export default ActionsButtons
