import InputSelct from '../../../components/inpuSelect'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'
import { useFormHelper } from '../../../hooks/useForm'
import { useWebApiUser } from '../../../utils/api/webApiUser'
import { IUserForm } from '../interface'

interface Props {
  onClose: () => void
  title?: string
  onSaved: () => void
}

const ModalUsers = ({ onClose, title, onSaved }: Props) => {
  const { withLoading, loading } = useLoading()
  const { handleChange, handleSubmit, passwordsMatch } = useFormHelper<
    Partial<IUserForm>
  >({})
  const { createUser } = useWebApiUser()

  const handleFormSubmit = async (data: Partial<IUserForm>) => {
    try {
      await withLoading(() => createUser(data as IUserForm))
      onSaved()
      onClose()
    } catch (error) {
      console.log('~ handleFormSubmit ~ error:', error)
    }
  }

  return (
    <Modal onClose={onClose} title={`${title} usuario`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-8 p-4">
          <div className="flex items-center justify-start gap-6">
            <img src="/images/user.png" alt="" /> <span>Datos del usuario</span>
          </div>
          <span>Los siguientes campos conformarán el perfil del usuario</span>
          <div className="flex items-center justify-start gap-2">
            <input
              name="name"
              onChange={handleChange}
              type="text"
              className="w-2/4 rounded-full border-2 border-gray-300 p-2"
              placeholder="Nombre"
              required
            />
            <input
              name="position"
              onChange={handleChange}
              type="text"
              className="w-1/4 rounded-full border-2 border-gray-300 p-2"
              placeholder="Puesto"
              required
            />
            <input
              name="phone"
              onChange={handleChange}
              type="text"
              className="w-1/4 rounded-full border-2 border-gray-300 p-2"
              placeholder="Teléfono"
            />
          </div>
        </div>
        <div className="flex items-center justify-start gap-8 mt-6">
          <select
            name="isActive"
            onChange={handleChange}
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            required
          >
            <option key={1} value="true">
              Activo
            </option>
            <option key={2} value="false">
              Inactivo
            </option>
          </select>
          <select
            name="companyId"
            onChange={handleChange}
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            required
            defaultValue={1}
          >
            <option key={1} value={1}>
              DW
            </option>
            <option key={2} value={2}>
              Demo
            </option>
          </select>
          <select
            name="role"
            onChange={handleChange}
            className="w-1/4 rounded-full border-2 border-gray-300 p-2"
            required
            defaultValue="admin"
          >
            <option key={1} value="admin">
              Administrador
            </option>
            <option key={2} value="operator">
              Operador
            </option>
            <option key={3} value="maintenance">
              Mantenimiento
            </option>
            <option key={4} value="recolector">
              Recolector
            </option>
          </select>
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
              name="email"
              onChange={handleChange}
              type="text"
              className="w-1/3 rounded-full border-2 border-gray-300 p-2"
              placeholder="Correo"
              required
            />
            <input
              name="password"
              onChange={handleChange}
              type="text"
              className="w-1/3 rounded-full border-2 border-gray-300 p-2"
              placeholder="Contraseña"
              required
            />
            <div className="w-2/5">
              <input
                name="passwordConfirmation"
                onChange={handleChange}
                type="password"
                className={`w-full rounded-full border-2 ${
                  passwordsMatch ? 'border-gray-300' : 'border-red-500'
                } p-2`}
                placeholder="Confirmación de contraseña"
                required
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-sm">
                  Las contraseñas no coinciden
                </p>
              )}
            </div>
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalUsers
