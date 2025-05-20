import Modal from '../../../components/modals/Form'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  contractorId?: number | null
}

const ModalContractors = ({ onClose, title, onSaved, companyId }: Props) => {
  return (
    <Modal
      onClose={() => {
        onClose()
        // resetForm()
      }}
      title={`${title} empresa`}
    >
      <div className="flex justify-center bg-gray-300 p-3 rounded-full w-36">
        Folio: 1234567
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-8 p-4">
        <div className="flex items-center justify-start gap-6">
          <img src="/images/user.png" alt="" /> <span>Datos del usuario</span>
        </div>
        <span>Los siguientes campos conformarán el perfil del usuario</span>
        <div className="flex items-center justify-start gap-2">
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
        </div>
      </div>
      <div className="flex items-center justify-start gap-2 mt-6"></div>
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
    </Modal>
  )
}

export default ModalContractors
