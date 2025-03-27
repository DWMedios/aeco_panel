import Button from '../../../components/button'
import InputSelct from '../../../components/inpuSelect'
import MapView from '../../../components/mapview'
import Modal from '../../../components/modals/Form'
import Table from '../../../components/table'

interface Props {
  onClose: () => void
  title?: string
}

const ModalMachines = ({ onClose, title }: Props) => {
  return (
    <Modal onClose={onClose} title={`${title} máquina`}>
      <div className="flex gap-4">
        <div className="flex justify-center bg-gray-300 p-3 rounded-full w-36">
          Folio: 1234567
        </div>
        <div className="flex justify-center bg-gray-300 p-3 rounded-full w-40">
          Fecha: {new Date().toLocaleDateString()}
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl mt-8 p-4">
        <div className="flex items-center justify-start gap-6">
          <span className="text-2xl">Datos de la máquina</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <input
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Nombre"
          />
          <input
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Estatus"
          />
          <input
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Mac address"
          />
          <input
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Empresa"
          />
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 mt-6">
        <MapView large={30} />
      </div>
      <div>
        <div className="flex flex-col mt-6">
          <span className="text-2xl">Asignar publicidad</span>
        </div>
        <div className="flex items-center justify-start gap-4 flex-wrap">
          <div className="w-2/4">
            <InputSelct placeholder="" key={1} />
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
          pagination={false}
        />
      </div>
    </Modal>
  )
}

export default ModalMachines
