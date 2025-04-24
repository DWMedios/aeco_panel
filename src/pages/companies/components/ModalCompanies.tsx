import Modal from '../../../components/modals/Form'
import InputUpload from '../../../components/inputUpload'
import { ICompanyForm } from '../interface'
import { useFormHelper } from '../../../hooks/useForm'
import { useLoading } from '../../../hooks/loading'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import SearchableSelect from '../../../components/inpuSelect'
import { useEffect, useState } from 'react'
import { useWebApiAeco } from '../../../utils/api/webApiAeco'
import { useWebApiCompany } from '../../../utils/api/webApiCompany'
import { cleanEmptyFields } from '../../../utils/cleanObject'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  formData: Partial<ICompanyForm>
}

const ModalCompanies = ({ onClose, title, onSaved, formData }: Props) => {
  const { withLoading, loading } = useLoading()
  const {
    handleChange,
    handleSubmit,
    passwordsMatch,
    fillFormWithData,
    formData: formValues,
  } = useFormHelper<Partial<ICompanyForm>>({})

  const { createCompany, updateCompany } = useWebApiCompany()
  const { getAecos } = useWebApiAeco()
  const [options, setOptions] = useState<any>([])
  const [selectedAeco, setSelectedAeco] = useState<any>([])

  useEffect(() => {
    if (formData) {
      fillFormWithData(formData)
    }
  }, [formData])

  const handleImageUpload = (file: File) => {
    console.log('Imagen subida:', file)
  }

  const handleFormSubmit = async (data: Partial<ICompanyForm>) => {
    try {
      data = cleanEmptyFields(data)
      data = { ...data, aecos: selectedAeco.map((item: any) => item.value) }
      if (formData && Object.keys(formData).length > 0) {
        await withLoading(() =>
          updateCompany(formData.id, data as ICompanyForm)
        )
      } else await withLoading(() => createCompany(data as ICompanyForm))
      onSaved()
      onClose()
    } catch (error) {
      console.log('~ handleFormSubmit ~ error:', error)
    }
  }

  const filterAecos = async (value: string) => {
    try {
      const response = await getAecos(
        `?serialNumber=${value}&folio=${value}&withoutCompany=true`
      )
      setOptions(
        response.records.map((item: any) => ({
          label: item.name,
          value: item.id,
          status: item.status,
        }))
      )
    } catch (error) {
      console.log('~ filterAecos ~ error:', error)
    }
  }

  return (
    <Modal onClose={onClose} title={`${title} empresa`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="mt-8">
            <InputUpload
              title="Personalización"
              onImageUpload={handleImageUpload}
            />
          </div>
          <div className="flex flex-col gap-4 rounded-xl mt-8 p-4 flex-wrap">
            <div className="flex items-center justify-start gap-6">
              <span className="text-2xl">Datos de la empresa</span>
            </div>
            <span>
              Los siguientes campos corresponden a la información básica
              necesaria de la empresa a ingresar
            </span>
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <input
                value={formValues?.name || ''}
                name="name"
                onChange={handleChange}
                type="text"
                className="w-3/6 rounded-full border-2 border-gray-300 p-2"
                placeholder="Nombre de la empresa"
                required
              />
              <input
                value={formValues?.rfc || ''}
                name="rfc"
                onChange={handleChange}
                type="text"
                className="w-2/6 rounded-full border-2 border-gray-300 p-2"
                placeholder="Rfc"
                required
              />
              <input
                value={formValues?.state || ''}
                name="state"
                onChange={handleChange}
                type="text"
                className="w-1/6 rounded-full border-2 border-gray-300 p-2"
                placeholder="Estado"
              />
              <input
                value={formValues?.city || ''}
                name="city"
                onChange={handleChange}
                type="text"
                className="w-1/6 rounded-full border-2 border-gray-300 p-2"
                placeholder="Ciudad"
              />
              <input
                value={formValues?.postalCode || ''}
                name="postalCode"
                onChange={handleChange}
                type="text"
                className="w-1/6 rounded-full border-2 border-gray-300 p-2"
                placeholder="Codigo postal"
              />
              <input
                value={formValues?.address || ''}
                name="address"
                onChange={handleChange}
                type="text"
                className="w-2/5 rounded-full border-2 border-gray-300 p-2"
                placeholder="Dirección"
              />
              {/* <input
              value={formValues?.name || ''}
                name="email"
                onChange={handleChange}
                type="email"
                className="w-2/4 rounded-full border-2 border-gray-300 p-2"
                placeholder="Correo"
              /> */}
              <input
                value={formValues?.phone || ''}
                name="phone"
                onChange={handleChange}
                type="text"
                className="w-1/4 rounded-full border-2 border-gray-300 p-2"
                placeholder="Telefono"
              />
            </div>
          </div>

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
              <input
                value={formValues?.legalRepresentative?.name || ''}
                name="legalRepresentative.name"
                onChange={handleChange}
                type="text"
                className="w-2/4 rounded-full border-2 border-gray-300 p-2"
                placeholder="Nombre del encargado"
              />
              <input
                value={formValues?.legalRepresentative?.position || ''}
                name="legalRepresentative.position"
                onChange={handleChange}
                type="text"
                className="w-1/4 rounded-full border-2 border-gray-300 p-2"
                placeholder="Puesto"
              />
              <input
                value={formValues?.legalRepresentative?.phone || ''}
                name="legalRepresentative.phone"
                onChange={handleChange}
                type="text"
                className="w-1/4 rounded-full border-2 border-gray-300 p-2"
                placeholder="Teléfono"
              />
              <input
                value={formValues?.legalRepresentative?.email || ''}
                name="legalRepresentative.email"
                onChange={handleChange}
                type="email"
                className="w-2/4 rounded-full border-2 border-gray-300 p-2"
                placeholder="Correo"
              />
            </div>
          </div>
          {Object.keys(formData).length === 0 && (
            <div>
              <div className="flex flex-col mt-6">
                <span className="text-2xl">Credenciales de acceso</span>
                <span>
                  Los siguientes datos serán para el ingreso al panel
                  administrativo de la empresa en cuestión.
                </span>
              </div>
              <div className="flex flex-wrap justify-start gap-2 mt-6">
                <input
                  value={formValues?.userAdmin?.name || ''}
                  name="userAdmin.name"
                  onChange={handleChange}
                  type="text"
                  className="w-2/5 rounded-full border-2 border-gray-300 p-2"
                  placeholder="Nombre de usuario"
                  required
                />{' '}
                <input
                  value={formValues?.userAdmin?.email || ''}
                  name="userAdmin.email"
                  onChange={handleChange}
                  type="email"
                  className="w-2/5 rounded-full border-2 border-gray-300 p-2"
                  placeholder="Correo"
                  required
                />
                <input
                  value={formValues?.userAdmin?.password || ''}
                  name="userAdmin.password"
                  onChange={handleChange}
                  type="password"
                  className="w-2/5 rounded-full border-2 border-gray-300 p-2"
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
          )}
          <SearchableSelect
            title="maquinas"
            options={options}
            search={filterAecos}
            className={'w-2/4'}
            setSelected={setSelectedAeco}
            selected={selectedAeco}
          />
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalCompanies
