import { useState } from 'react'
import Button from '../../../components/button'
import InputSelct from '../../../components/inpuSelect'
import MapView from '../../../components/mapview'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import Table from '../../../components/table'
import { useLoading } from '../../../hooks/loading'
import useFormWithValidation from '../../../hooks/useForm'
import { IAecoForm } from '../interface'
import { useWebApiAeco } from '../../../utils/api/webApiAeco'

interface Props {
  onClose: () => void
  title?: string
  onSaved: () => void
}

const ModalAeco = ({ onClose, title, onSaved }: Props) => {
  const { withLoading, loading } = useLoading()
  const { handleChange, handleSubmit } = useFormWithValidation<
    Partial<IAecoForm>
  >({})
  const [markerCoordinates, setMarkerCoordinates] = useState<{
    lat: number
    lng: number
  }>({ lat: 0, lng: 0 })

  const { createAeco } = useWebApiAeco()

  const handleFormSubmit = async (data: Partial<IAecoForm>) => {
    try {
      const { lat, lng } = markerCoordinates

      const updatedData = {
        ...data,
        currentCoords: {
          ...(data.currentCoords || {}),
          latitude: String(lat),
          longitude: String(lng),
        },
      }
      await withLoading(() => createAeco(updatedData as IAecoForm))
      onSaved()
      onClose()
    } catch (error) {
      console.log('~ handleFormSubmit ~ error:', error)
    }
  }

  return (
    <Modal onClose={onClose} title={`${title} máquina`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-4 rounded-xl mt-8 p-4">
          <div className="flex items-center justify-start gap-6">
            <span className="text-2xl">Datos de la máquina</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <input
              name="name"
              onChange={handleChange}
              type="text"
              className="w-1/4 rounded-full border-2 border-gray-300 p-2"
              placeholder="Nombre"
              required
            />
            <select
              name="status"
              onChange={handleChange}
              className="w-1/4 rounded-full border-2 border-gray-300 p-2"
              required
              defaultValue="enabled"
            >
              <option key={1} value="enabled">
                Habilitado
              </option>
              <option key={2} value="disabled">
                Deshabilitado
              </option>
              <option key={3} value="suspended">
                Suspendido
              </option>
              <option key={4} value="deactivated">
                Desactivado
              </option>
              <option key={5} value="maintenance">
                Mantenimiento
              </option>
            </select>
            <input
              name="serialNumber"
              onChange={handleChange}
              type="text"
              className="w-1/4 rounded-full border-2 border-gray-300 p-2"
              placeholder="Numero de serie"
              required
            />
            <input
              name=""
              onChange={handleChange}
              type="text"
              className="w-1/4 rounded-full border-2 border-gray-300 p-2"
              placeholder="Empresa"
            />
          </div>
        </div>
        <div className="flex items-center justify-start gap-2 mt-6">
          <MapView large={30} onCoordinatesChange={setMarkerCoordinates} />
        </div>
        <div>
          <div className="flex flex-col mt-6">
            <span className="text-2xl">Asignar publicidad</span>
          </div>
          <div className="flex items-center justify-start gap-4 flex-wrap">
            <div className="w-2/4">
              <InputSelct placeholder="" key={1} name="" />
            </div>
            <div className="w-1/4">
              <Button action={() => {}} text="Añadir" />
            </div>
          </div>
          <Table
            columns={['id', 'status']}
            tableContent={{
              headers: ['Folio', 'Nombre de p.', 'Repeticiones', 'Estatus'],
              data: [],
            }}
            filters={null}
          />
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalAeco
