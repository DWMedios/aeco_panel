import { useState, useEffect } from 'react'
import Modal from '../../../components/modals/Form'
import InputUpload from '../../../components/inputUpload'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import SearchableSelect from '../../../components/inpuSelect'
import { useLoading } from '../../../hooks/loading'
import { useWebApiAeco } from '../../../utils/api/webApiAeco'
import { useWebApiCompany } from '../../../utils/api/webApiCompany'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import useFormWithValidation from '../../../hooks/useForm'
import InputField from '../../../components/inputField'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  companyId?: number | null
}

const ModalCompanies = ({ onClose, title, onSaved, companyId }: Props) => {
  const { withLoading, loading } = useLoading()
  const { createCompany, updateCompany, getCompany } = useWebApiCompany()
  const { getAecos } = useWebApiAeco()
  const [selectedAeco, setSelectedAeco] = useState<any>([])
  const [aecoOptions, setAecoOptions] = useState<any>([])
  const [companyData, setCompanyData] = useState<any>({})
  const initialValues = {
    name: '',
    rfc: '',
    state: '',
    city: '',
    postalCode: '',
    address: '',
    phone: '',
    legalRepresentative: {
      name: '',
      position: '',
      phone: '',
      email: '',
    },
    userAdmin: {
      name: '',
      email: '',
      password: '',
    },
    passwordConfirmation: '',
  }
  const mergedValues = { ...initialValues, ...companyData }
  const validationRules = {
    name: {
      required: true,
      errorMessages: {
        required: 'El nombre de la empresa es obligatorio',
      },
    },
    rfc: {
      required: true,
      errorMessages: {
        required: 'El RFC es obligatorio',
      },
    },
    'userAdmin.name': {
      required: Object.keys(companyData).length === 0, // Solo requerido para nuevos registros
      errorMessages: {
        required: 'El nombre de usuario es obligatorio',
      },
    },
    'userAdmin.email': {
      required: Object.keys(companyData).length === 0,
      pattern: /\S+@\S+\.\S+/,
      errorMessages: {
        required: 'El correo electrónico es obligatorio',
        pattern: 'Por favor ingresa un correo electrónico válido',
      },
    },
    'userAdmin.password': {
      required: Object.keys(companyData).length === 0,
      minLength: 6,
      errorMessages: {
        required: 'La contraseña es obligatoria',
        minLength: 'La contraseña debe tener al menos 6 caracteres',
      },
    },
    passwordConfirmation: {
      required: Object.keys(companyData).length === 0,
      validate: (value: any, allValues: any) =>
        value !== allValues.userAdmin?.password
          ? 'Las contraseñas no coinciden'
          : undefined,
    },
    'legalRepresentative.email': {
      pattern: /\S+@\S+\.\S+/,
      errorMessages: {
        pattern: 'Por favor ingresa un correo electrónico válido',
      },
    },
  }
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormWithValidation(mergedValues, { validationRules })

  useEffect(() => {
    if (companyId) getCompanyData(companyId)
  }, [companyId])

  useEffect(() => {
    if (companyData && Object.keys(companyData).length > 0) {
      setValues({ ...initialValues, ...companyData })
    }
  }, [companyData, setValues])

  const handleImageUpload = (file: File) => {
    console.log('Imagen subida:', file)
  }

  const getCompanyData = async (id: number) => {
    try {
      const response = await getCompany(id)
      setCompanyData(response)
      if (response.aecos) {
        setSelectedAeco(
          response.aecos.map((item: any) => ({
            label: item.name,
            value: item.id,
            status: item.status,
          }))
        )
      }
    } catch (error) {
      console.log('Error al obtener los datos de la empresa:', error)
    }
  }

  const onFormSubmit = async (data: any) => {
    try {
      const cleanedData: any = cleanEmptyFields({
        ...data,
        aecos: selectedAeco.map((item: any) => item.value),
      })

      if (companyData && Object.keys(companyData).length > 0) {
        await withLoading(() => updateCompany(companyData.id, cleanedData))
      } else {
        await withLoading(() => createCompany(cleanedData))
      }

      onSaved()
      onClose()
    } catch (error) {
      console.log('Error en el envío del formulario:', error)
    }
  }

  const filterAecos = async (value: string) => {
    try {
      const response = await getAecos(
        `?serialNumber=${value}&folio=${value}&withoutCompany=true`
      )
      setAecoOptions(
        response.records.map((item: any) => ({
          label: item.name,
          value: item.id,
          status: item.status,
        }))
      )
    } catch (error) {
      console.log('Error buscando AECOs:', error)
    }
  }

  // Helper para obtener valores anidados
  const getValue = (path: string) => {
    const keys = path.split('.')
    return keys.reduce((o, k) => (o || {})[k], values)
  }

  return (
    <Modal onClose={onClose} title={`${title} empresa`}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="mt-8">
            <InputUpload
              title="Personalización"
              onImageUpload={handleImageUpload}
            />
          </div>

          {/* Datos de la empresa */}
          <div className="flex flex-col gap-4 rounded-xl mt-8 p-4 flex-wrap">
            <div className="flex items-center justify-start gap-6">
              <span className="text-2xl">Datos de la empresa</span>
            </div>
            <span>
              Los siguientes campos corresponden a la información básica
              necesaria de la empresa a ingresar
            </span>
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <InputField
                name="name"
                placeholder="Nombre de la empresa"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                divClassName="w-3/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
                required={true}
              />
              <InputField
                name="rfc"
                placeholder="RFC"
                value={values.rfc}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.rfc}
                touched={touched.rfc}
                divClassName="w-2/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
                required={true}
              />
              <InputField
                name="state"
                placeholder="Estado"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.state}
                touched={touched.state}
                divClassName="w-1/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="city"
                placeholder="Ciudad"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.city}
                touched={touched.city}
                divClassName="w-1/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="postalCode"
                placeholder="Código postal"
                value={values.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.postalCode}
                touched={touched.postalCode}
                divClassName="w-1/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="address"
                placeholder="Dirección"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address}
                touched={touched.address}
                divClassName="w-2/5"
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
          </div>

          {/* Datos del representante */}
          <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-8 p-4">
            <div className="flex items-center justify-start gap-6">
              <img src="/images/user.png" alt="" />
              <span className="text-2xl">
                Datos del representante principal
              </span>
            </div>
            <span>
              Los siguientes datos conformarán el perfil del administrativo
              principal
            </span>
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <InputField
                name="legalRepresentative.name"
                placeholder="Nombre del encargado"
                value={getValue('legalRepresentative.name')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors['legalRepresentative.name']}
                touched={touched['legalRepresentative.name']}
                divClassName="w-2/4"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="legalRepresentative.position"
                placeholder="Puesto"
                value={getValue('legalRepresentative.position')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors['legalRepresentative.position']}
                touched={touched['legalRepresentative.position']}
                divClassName="w-1/4"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="legalRepresentative.phone"
                placeholder="Teléfono"
                value={getValue('legalRepresentative.phone')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors['legalRepresentative.phone']}
                touched={touched['legalRepresentative.phone']}
                divClassName="w-1/4"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="legalRepresentative.email"
                placeholder="Correo"
                type="email"
                value={String(getValue('legalRepresentative.email') || '')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors['legalRepresentative.email']}
                touched={touched['legalRepresentative.email']}
                divClassName="w-2/4"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
            </div>
          </div>

          {/* Credenciales (sólo para nuevos registros) */}
          {!companyId && (
            <div>
              <div className="flex flex-col mt-6">
                <span className="text-2xl">Credenciales de acceso</span>
                <span>
                  Los siguientes datos serán para el ingreso al panel
                  administrativo de la empresa en cuestión.
                </span>
              </div>
              <div className="flex flex-wrap justify-start gap-2 mt-6">
                <InputField
                  name="userAdmin.name"
                  placeholder="Nombre de usuario"
                  value={getValue('userAdmin.name')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors['userAdmin.name']}
                  touched={touched['userAdmin.name']}
                  divClassName="w-2/5"
                  className="w-full rounded-full border-2 border-gray-300 p-2"
                  required={true}
                />
                <InputField
                  name="userAdmin.email"
                  placeholder="Correo"
                  type="email"
                  value={getValue('userAdmin.email')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors['userAdmin.email']}
                  touched={touched['userAdmin.email']}
                  divClassName="w-2/5"
                  className="w-full rounded-full border-2 border-gray-300 p-2"
                  required={true}
                />
                <InputField
                  name="userAdmin.password"
                  placeholder="Contraseña"
                  type="password"
                  value={getValue('userAdmin.password')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors['userAdmin.password']}
                  touched={touched['userAdmin.password']}
                  divClassName="w-2/5"
                  className="w-full rounded-full border-2 border-gray-300 p-2"
                  required={true}
                />
                <InputField
                  name="passwordConfirmation"
                  placeholder="Confirmación de contraseña"
                  type="password"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.passwordConfirmation}
                  touched={touched.passwordConfirmation}
                  divClassName="w-2/5"
                  className="w-full rounded-full border-2 border-gray-300 p-2"
                  required={true}
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <SearchableSelect
              title="Máquinas"
              options={aecoOptions}
              search={filterAecos}
              className="w-2/4"
              setSelected={setSelectedAeco}
              selected={selectedAeco}
            />
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalCompanies
