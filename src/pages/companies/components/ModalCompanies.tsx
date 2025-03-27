import Modal from '../../../components/modals/Form'
import InputUpload from '../../../components/inputUpload'
import InputSelct from '../../../components/inpuSelect'
import Button from '../../../components/button'
import Table from '../../../components/table'

interface Props {
  onClose: () => void
  title?: string
}

const ModalCompanies = ({ onClose, title }: Props) => {
  const handleImageUpload = (file: File) => {
    console.log('Imagen subida:', file)
  }

  return (
    <Modal onClose={onClose} title={`${title} empresa`}>
      <div className="flex gap-4">
        <div className="flex justify-center bg-gray-300 p-3 rounded-full w-36">
          Folio: 1234567
        </div>
        <div className="flex justify-center bg-gray-300 p-3 rounded-full w-40">
          Fecha: {new Date().toLocaleDateString()}
        </div>
      </div>
      <div className="mt-8">
        <InputUpload
          title="Personalización"
          onImageUpload={handleImageUpload}
        />
      </div>
      <div className="flex flex-col gap-4 rounded-xl mt-8 p-4 flex-wrap">
        <div className="flex items-center justify-start gap-6">
          <span className="text-2xl">Datos del representante principal</span>
        </div>
        <span>
          Los siguientes datos conformarán el perfil del administrativo
          principal
        </span>
        <div className="flex items-center justify-start gap-4 flex-wrap">
          <input
            type="text"
            className="w-3/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Nombre de la empresa"
          />
          <input
            type="text"
            className="w-2/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Rfc"
          />
          <input
            type="text"
            className="w-1/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Estado"
          />
          <input
            type="email"
            className="w-1/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Ciudad"
          />
          <input
            type="email"
            className="w-1/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Codigo postal"
          />
          <input
            type="email"
            className="w-2/5 rounded-full border-2 border-gray-300 p-2"
            placeholder="Dirección"
          />
          <input
            type="email"
            className="w-2/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Correo"
          />
          <input
            type="email"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Telefono"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col mt-6">
          <span className="text-2xl">Credenciales de acceso</span>
          <span>
            Los siguientes datos serán para el ingreso al panel administrativo
            de la empresa en cuestión.
          </span>
        </div>
        <div className="flex items-center justify-start gap-2 mt-6">
          <input
            type="text"
            className="w-1/3 rounded-full border-2 border-gray-300 p-2"
            placeholder="Correo"
          />
          <input
            type="text"
            className="w-1/3 rounded-full border-2 border-gray-300 p-2"
            placeholder="Contraseña"
          />
          <input
            type="text"
            className="w-1/3 rounded-full border-2 border-gray-300 p-2"
            placeholder="Confirmación de contraseña"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-8 p-4">
        <div className="flex items-center justify-start gap-6">
          <img src="/images/user.png" alt="" />
          <span className="text-2xl">Datos del representante principal</span>
        </div>
        <span>
          Los siguientes datos conformarán el perfil del administrativo
          principal
        </span>
        <div className="flex items-center justify-start gap-4 flex-wrap">
          <input
            type="text"
            className="w-2/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Nombre del encargado"
          />
          <input
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Puesto"
          />
          <input
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Teléfono"
          />
          <input
            type="email"
            className="w-2/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Correo"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xlmt-8 p-4">
        <div className="flex items-center justify-start gap-6">
          <span className="text-2xl">Listado de maquinas</span>
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
          tableContent={{ headers: ['Id', 'status'], data: [] }}
          pagination={false}
        />
      </div>
    </Modal>
  )
}

export default ModalCompanies
