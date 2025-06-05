import { useState, useEffect } from 'react'
import Modal from '../../../components/modals/Form'
import { useInputUpload } from '../../../components/inputUpload'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import SearchableSelect from '../../../components/searchableSelect'
import { useLoading } from '../../../hooks/loading'
import { useWebApiAeco } from '../../../api/webApiAeco'
import { useWebApiCompany } from '../../../api/webApiCompany'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import useFormWithValidation from '../../../hooks/useForm'
import InputField from '../../../components/inputField'
import { initialValues, validationRulesCompany } from './formValidations'
import { MediaAsset } from '../../../interfaces/mediaAsset'
import { Alert, Company } from '../../../interfaces/types'
import InputSelect from '../../../components/inputSelect'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  companyId?: number | null
  mediaKey: string | null
  setMediaKey: (key: string | null) => void
  setShowAlert: (alert: Alert) => void
}

const ModalCompanies = ({
  onClose,
  title,
  onSaved,
  companyId,
  mediaKey,
  setMediaKey,
  setShowAlert,
}: Props) => {
  const { withLoading, loading } = useLoading()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { createCompany, updateCompany, getCompany } = useWebApiCompany()
  const { getAecos } = useWebApiAeco()
  const {
    component: InputUpload,
    uploadMediaAsset,
    deleteMediaAsset,
    key,
  } = useInputUpload({
    title: 'Personalización',
    type: 'image',
    previewUrl,
  })
  const [selectedAeco, setSelectedAeco] = useState<any>([])
  const [aecoOptions, setAecoOptions] = useState<any>([])
  const [companyData, setCompanyData] = useState<any>({})

  const mergedValues =
    companyData && Object.keys(companyData).length > 0
      ? { ...structuredClone(initialValues), ...structuredClone(companyData) }
      : structuredClone(initialValues)
  const validationRules = validationRulesCompany(companyData)
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
    if (companyId) getCompanyData(companyId)
  }, [companyId])

  useEffect(() => {
    if (companyData && Object.keys(companyData).length > 0)
      setValues({
        ...structuredClone(initialValues),
        ...structuredClone(companyData),
      })
    else resetForm()
  }, [companyData, setValues])

  const getCompanyData = async (id: number) => {
    try {
      const response = (await getCompany(id)) as Company
      setCompanyData(response)
      setMediaKey(response?.mediaAsset?.fileKey ?? null)
      setPreviewUrl(response?.logoUrl || null)
      if (response.aecos) {
        setSelectedAeco(
          response.aecos.map((item: any) => ({
            label: item.name,
            value: item.id,
            status: item.status,
            id: item.id,
          }))
        )
      }
    } catch (error) {
      console.log('Error al obtener los datos de la empresa:', error)
    }
  }

  const handleFormSubmit = async (data: any) => {
    try {
      const cleanedData: any = cleanEmptyFields({
        ...data,
        status: data.status === 'true' ? true : false,
        aecos: selectedAeco.map((item: any) => item.value),
      })

      const mediaAsset = (await uploadMediaAsset()) as MediaAsset | boolean
      if (mediaAsset) cleanedData.mediaAsset = mediaAsset

      if (companyData && Object.keys(companyData).length > 0) {
        await withLoading(() => updateCompany(companyData.id, cleanedData))
      } else {
        await withLoading(() => createCompany(cleanedData))
      }
      if (mediaKey && mediaAsset) {
        deleteMediaAsset(mediaKey)
        setMediaKey(null)
      }
      onSaved()
      resetForm()
      onClose()
      setShowAlert({
        message: `Empresa guardada correctamente`,
        type: 'success',
      })
    } catch (error: any) {
      if (key) deleteMediaAsset(key)
      setShowAlert({
        message: error.message,
        type: 'error',
      })
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

  const handleDelete = (id: number) => {
    setSelectedAeco(selectedAeco.filter((item: any) => item.value !== id))
  }

  const getValue = (path: string) => {
    const keys = path.split('.')
    return keys.reduce((o, k) => (o || {})[k], values)
  }

  return (
    <Modal
      onClose={() => {
        onClose()
        resetForm()
      }}
      title={`${title} empresa`}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="mt-2">{InputUpload}</div>

          <div className="flex flex-col gap-4 rounded-xl mt-2 p-4 flex-wrap">
            <div className="flex items-center justify-start gap-6">
              <span className="text-lg">Datos de la empresa</span>
            </div>
            <span className="text-sm">
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
              />
              <InputField
                name="address"
                placeholder="Dirección"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address}
                touched={touched.address}
                divClassName="w-3/5"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="state"
                placeholder="Estado"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.state}
                touched={touched.state}
                divClassName="w-2/6"
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
                divClassName="w-2/6"
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
                divClassName="w-2/6"
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
              <InputSelect
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.status}
                touched={touched.status}
                value={values.status}
                options={[
                  { value: 'true', label: 'Activo' },
                  { value: 'false', label: 'Inactivo' },
                ]}
                placeholder="Estatus"
                divClassName="w-2/5"
                className="w-full rounded-full border-2 border-gray-300 p-2"
                defaultPlaceholder="Selecciona un estatus"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-8 p-4">
            <div className="flex items-center justify-start gap-2">
              <img src="/images/user.png" alt="" className="w-6 h-6" />
              <span className="text-lg">Datos del representante principal</span>
            </div>
            <span className="text-sm">
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

          {!companyId && (
            <div>
              <div className="flex flex-col mt-6">
                <span className="text-lg">Credenciales de acceso</span>
                <span className="text-sm">
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
              handleDelete={handleDelete}
            />
          </div>
        </div>
        <ActionsButtons
          loading={loading}
          onClose={() => {
            onClose()
            resetForm()
          }}
        />
      </form>
    </Modal>
  )
}

export default ModalCompanies
