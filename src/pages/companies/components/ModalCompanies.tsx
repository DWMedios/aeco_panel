import Modal from '../../../components/modals/Form'
import InputUpload from '../../../components/inputUpload'
import InputSelct from '../../../components/inpuSelect'
import Button from '../../../components/button'
import Table from '../../../components/table'
import { ICompanyForm } from '../interface'
import { useFormHelper } from '../../../hooks/useForm'

interface Props {
  onClose: () => void
  title?: string
}

const ModalCompanies = ({ onClose, title }: Props) => {
  const { handleChange, handleSubmit } = useFormHelper<Partial<ICompanyForm>>(
    {}
  )

  const handleImageUpload = (file: File) => {
    console.log('Imagen subida:', file)
  }

  const handleFormSubmit = (data: Partial<ICompanyForm>) => {
    console.log('Formulario enviado con:', data)
    // Aquí puedes hacer la petición API
  }

  return (
    <Modal
      onClose={onClose}
      title={`${title} empresa`}
      handleSubmit={() => handleSubmit(handleFormSubmit)}
    >
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
            name="name"
            onChange={handleChange}
            type="text"
            className="w-3/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Nombre de la empresa"
            required
          />
          <input
            name="rfc"
            onChange={handleChange}
            type="text"
            className="w-2/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Rfc"
          />
          <input
            name="satte"
            onChange={handleChange}
            type="text"
            className="w-1/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Estado"
          />
          <input
            name="city"
            onChange={handleChange}
            type="text"
            className="w-1/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Ciudad"
          />
          <input
            name="postalCode"
            onChange={handleChange}
            type="text"
            className="w-1/6 rounded-full border-2 border-gray-300 p-2"
            placeholder="Codigo postal"
          />
          <input
            name="address"
            onChange={handleChange}
            type="text"
            className="w-2/5 rounded-full border-2 border-gray-300 p-2"
            placeholder="Dirección"
          />
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="w-2/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Correo"
          />
          <input
            name="phone"
            onChange={handleChange}
            type="text"
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
            name="user.email"
            onChange={handleChange}
            type="text"
            className="w-1/3 rounded-full border-2 border-gray-300 p-2"
            placeholder="Correo"
          />
          <input
            name="user.password"
            onChange={handleChange}
            type="text"
            className="w-1/3 rounded-full border-2 border-gray-300 p-2"
            placeholder="Contraseña"
          />
          <input
            name="user.passwordConfirmation"
            onChange={handleChange}
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
            name="legalRepresentative.name"
            onChange={handleChange}
            type="text"
            className="w-2/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Nombre del encargado"
          />
          <input
            name="legalRepresentative.position"
            onChange={handleChange}
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Puesto"
          />
          <input
            name="legalRepresentative.phone"
            onChange={handleChange}
            type="text"
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            placeholder="Teléfono"
          />
          <input
            name="legalRepresentative.email"
            onChange={handleChange}
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
            <InputSelct placeholder="" key={1} name="machine" />
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
