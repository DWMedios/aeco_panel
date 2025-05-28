import { useEffect, useState } from 'react'
import InputField from '../../../components/inputField'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { Alert, Campaign } from '../../../interfaces/types'
import { useLoading } from '../../../hooks/loading'
import { useWebApiCampaings } from '../../../api/webApiCampaing'
import { useInputUpload } from '../../../components/inputUpload'
import { useWebApiCompany } from '../../../api/webApiCompany'
import useFormWithValidation from '../../../hooks/useForm'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { MediaAsset } from '../../../interfaces/mediaAsset'
import {
  initialValuesCampaigns,
  validationRulesCampaigns,
} from './formValidations'
import InputSelect from '../../../components/inputSelect'
import SearchableSelect from '../../../components/searchableSelect'
import { useWebApiAeco } from '../../../api/webApiAeco'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  campaingId?: number | null
  mediaKey: string | null
  setMediaKey: (key: string | null) => void
  setShowAlert: (alert: Alert) => void
}

const ModalCampaings = ({
  onClose,
  title,
  onSaved,
  campaingId,
  mediaKey,
  setMediaKey,
  setShowAlert,
}: Props) => {
  const { withLoading, loading } = useLoading()
  const [companies, setCompanies] = useState<any[]>([])
  const [aecoOptions, setAecoOptions] = useState<any>([])
  const [selectedAeco, setSelectedAeco] = useState<any>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [campaingData, setCampaingData] = useState<any>({})
  const { getAecos } = useWebApiAeco()

  const { createCampaing, updateCampaing, getCampaing } = useWebApiCampaings()
  const {
    component: InputUpload,
    uploadMediaAsset,
    deleteMediaAsset,
    key,
  } = useInputUpload({
    title: 'Personalizacion',
    type: 'image',
    previewUrl,
  })

  const { getCompanies } = useWebApiCompany()
  const mergedValues =
    campaingData && Object.keys(campaingData).length > 0
      ? {
          ...structuredClone(initialValuesCampaigns),
          ...structuredClone(campaingData),
        }
      : structuredClone(initialValuesCampaigns)
  const validationRules = validationRulesCampaigns(campaingData)
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

  useEffect(() => {
    if (campaingId) getcampaingData(campaingId)
  }, [campaingId])

  useEffect(() => {
    if (campaingData && Object.keys(campaingData).length > 0)
      setValues({
        ...structuredClone(initialValuesCampaigns),
        ...structuredClone(campaingData),
      })
    else resetForm()
  }, [campaingData, setValues])

  const getcampaingData = async (id: number) => {
    try {
      const response = (await getCampaing(id)) as Campaign
      setCampaingData(response)
      setMediaKey(response?.mediaAsset?.fileKey ?? null)
      // setPreviewUrl(response?.logoUrl || null)
    } catch (error) {
      console.log('Error al obtener los datos del contratista:', error)
    }
  }

  const handleFormSubmit = async (data: any) => {
    try {
      const cleanedData: any = cleanEmptyFields({
        ...data,
      })

      const mediaAsset = (await uploadMediaAsset()) as MediaAsset | boolean
      if (mediaAsset) cleanedData.mediaAsset = mediaAsset

      if (campaingData && Object.keys(campaingData).length > 0) {
        await withLoading(() => updateCampaing(campaingData.id, cleanedData))
      } else {
        if ('companyId' in cleanedData)
          cleanedData.companyId = Number(data.companyId)
        await withLoading(() => createCampaing(cleanedData))
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

  return (
    <Modal onClose={onClose} title={`${title} campaña`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="mt-2">{InputUpload}</div>
          <div className="flex flex-col gap-4 rounded-xl mt-2 p-4">
            <div className="flex items-center justify-start gap-6">
              <span>Datos de la campaña</span>
            </div>
            <span>Los siguientes campos conformarán el perfil del usuario</span>
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <InputField
                name="contractName"
                placeholder="Nombre de la campaña"
                value={values.contractName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.contractName}
                touched={touched.contractName}
                divClassName="w-3/6"
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
              <InputField
                name="description"
                placeholder="Descripcion de la campaña"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                touched={touched.description}
                divClassName="w-5/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
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
            </div>
            {campaingId == null && (
              <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] p-4">
                <div className="flex items-center justify-start gap-6">
                  <span className="text-lg">Asignacion de maquinas</span>
                </div>
                <InputSelect
                  name="companyId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.companyId}
                  touched={touched.companyId}
                  value={values.companyId}
                  options={companies}
                  placeholder="Empresa"
                  divClassName="w-2/4"
                  className="w-full rounded-full border-2 border-gray-300 p-2"
                  defaultPlaceholder="Selecciona una empresa"
                />
                {values.companyId && (
                  <div className="">
                    <SearchableSelect
                      title="Máquinas"
                      options={aecoOptions}
                      search={filterAecos}
                      className="w-2/4"
                      setSelected={setSelectedAeco}
                      selected={selectedAeco}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalCampaings
