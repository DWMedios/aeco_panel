import { useEffect, useState } from 'react'
import InputField from '../../../components/inputField'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'
import useFormWithValidation from '../../../hooks/useForm'
import { useWebApiUser } from '../../../api/webApiUser'
import { IUserForm } from '../interface'
import { initialValues, validationRulesUser } from './formValidations'
import InputSelect from '../../../components/inputSelect'
import { useWebApiCompany } from '../../../api/webApiCompany'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { Alert } from '../../../interfaces/types'

interface Props {
  onClose: () => void
  title?: string
  onSaved: () => void
  user?: any
  setShowAlert: (alert: Alert) => void
}

const ModalUsers = ({ onClose, title, onSaved, user, setShowAlert }: Props) => {
  const [companies, setCompanies] = useState<any[]>([])

  const { withLoading, loading } = useLoading()
  const { createUser, updateUser } = useWebApiUser()
  const { getCompanies } = useWebApiCompany()

  const mergedValues =
    user && Object.keys(user).length > 0
      ? { ...initialValues, ...user }
      : initialValues
  const validationRules = validationRulesUser(user)
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormWithValidation(mergedValues, { validationRules })

  useEffect(() => {
    const fetchCompanies = async () => {
      const response: any = await withLoading(() => getCompanies(''))
      setCompanies(
        response.records.map((company: any) => ({
          value: company.id,
          label: company.name,
        }))
      )
    }
    fetchCompanies()
  }, [])

  useEffect(() => {
    if (user && Object.keys(user).length > 0)
      setValues({ ...initialValues, ...user, role: user.role.role })
    else resetForm()
  }, [user, setValues])

  const handleFormSubmit = async (data: Partial<IUserForm>) => {
    try {
      const cleanedData: any = cleanEmptyFields({
        ...data,
        isActive: data.isActive === 'true' ? true : false,
      })
      if (Number(cleanedData.companyId) !== user.companyId) {
        cleanedData.companyId = Number(cleanedData.companyId)
      } else delete cleanedData.companyId

      if (user && Object.keys(user).length > 0) {
        await withLoading(() => updateUser(user.id, cleanedData))
      } else {
        await withLoading(() => createUser(cleanedData))
      }

      onSaved()
      resetForm()
      onClose()
      setShowAlert({
        message: 'Usuario guardado correctamente',
        type: 'success',
      })
    } catch (error: any) {
      setShowAlert({
        message: error.message,
        type: 'error',
      })
      console.log('Error en el envío del formulario:', error)
    }
  }

  return (
    <Modal onClose={onClose} title={`${title} usuario`}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      >
        <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-2 p-4">
          <div className="flex items-center justify-start gap-6">
            <img src="/images/user.png" alt="" className="h-4 w-4" />{' '}
            <span className="text-lg">Datos del usuario</span>
          </div>
          <span className="text-sm">
            Los siguientes campos conformarán el perfil del usuario
          </span>
          <div className="flex items-center justify-start gap-2">
            <InputField
              name="name"
              placeholder="Nombre"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              divClassName="w-2/4"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
            <InputField
              name="position"
              placeholder="Puesto"
              value={values.position}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.position}
              touched={touched.position}
              divClassName="w-1/4"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
            <InputField
              name="phone"
              placeholder="Teléfono"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              divClassName="w-1/4"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
          </div>
          <div className="flex items-center justify-start gap-8 mt-6">
            <InputSelect
              name="isActive"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.isActive}
              touched={touched.isActive}
              value={String(values.isActive)}
              options={[
                { value: 'true', label: 'Activo' },
                { value: 'false', label: 'Inactivo' },
              ]}
              placeholder="Estatus"
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />

            <InputSelect
              name="companyId"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.companyId}
              touched={touched.companyId}
              value={values.companyId}
              options={companies}
              placeholder="Empresa"
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />

            <InputSelect
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.role}
              touched={touched.role}
              value={values.role}
              options={[
                { value: 'admin', label: 'Administrador' },
                { value: 'operator', label: 'Operador' },
                { value: 'maintenance', label: 'Mantenimiento' },
                { value: 'recolector', label: 'Recolector' },
              ]}
              placeholder="Rol"
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col mt-6">
            <span className="text-lg">Credenciales de acceso</span>

            <span className="text-sm">
              Los siguientes datos serán para el ingreso al panel administrativo
              de la empresa en cuestión.
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 mt-6">
            <InputField
              name="email"
              placeholder="Correo"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
            <InputField
              name="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
              type="password"
            />
            <InputField
              name="passwordConfirmation"
              placeholder="Confirmación de contraseña"
              value={values.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
              type="password"
            />
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalUsers
