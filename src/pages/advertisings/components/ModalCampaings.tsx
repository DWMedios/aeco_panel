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
import InputDateRangePicker from './dateRangePicker'

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
  const [dateSelected, setDateSelected] = useState<string[]>([])
  const [mediaAssetType, setMediaAssetType] = useState<'image' | 'video'>(
    'image'
  )
  const { getAecos } = useWebApiAeco()

  const { createCampaing, updateCampaing, getCampaing } = useWebApiCampaings()
  const {
    component: InputUpload,
    uploadMediaAsset,
    deleteMediaAsset,
    key,
  } = useInputUpload({
    title: 'Personalización',
    type: mediaAssetType,
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
      const response: any = await withLoading(() => getCompanies('?perpage=50'))
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
    if (campaingData && Object.keys(campaingData).length > 0) {
      setValues({
        ...structuredClone(initialValuesCampaigns),
        ...structuredClone(campaingData),
      })
      setDateSelected([campaingData.startDate, campaingData.endDate])
    } else resetForm()
  }, [campaingData, setValues])

  const getcampaingData = async (id: number) => {
    try {
      const response = (await getCampaing(id)) as Campaign
      setCampaingData(response)
      setMediaKey(response?.mediaAsset?.fileKey ?? null)
      setPreviewUrl(response?.mediaUrl || null)

      if (response?.mediaAsset?.mimeType) {
        setMediaAssetType(
          response.mediaAsset.mimeType.split('/')[0] as 'image' | 'video'
        )
      }
    } catch (error) {
      console.log('Error al obtener los datos del contratista:', error)
    }
  }

  const handleFormSubmit = async (data: any) => {
    try {
      if (dateSelected.length === 0) {
        setShowAlert({
          message: `Selecciona un rango de fechas`,
          type: 'error',
        })
        return
      }
      const cleanedData: any = cleanEmptyFields({
        ...data,
      })
      if (dateSelected.length > 0 && Object.keys(campaingData).length > 0) {
        if (campaingData.startDate !== cleanedData.startDate)
          cleanedData.startDate = dateSelected[0]
        if (campaingData.endDate !== cleanedData.endDate)
          cleanedData.endDate = dateSelected[1]
      } else {
        cleanedData.startDate = dateSelected[0]
        cleanedData.endDate = dateSelected[1]
      }

      const mediaAsset = (await uploadMediaAsset()) as MediaAsset | boolean
      if (mediaAsset) cleanedData.mediaAsset = mediaAsset

      if ('companyId' in cleanedData)
        cleanedData.companyId = Number(data.companyId)
      if (campaingData && Object.keys(campaingData).length > 0) {
        await withLoading(() => updateCampaing(campaingData.id, cleanedData))
      } else {
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

  const handleSetDates = (queryString: string[]) => {
    setDateSelected(queryString)

    // Aquí podrías hacer otra petición con los datos seleccionados
    // por ejemplo: fetch(`/api/something${queryString}`)
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
                name="isEnabled"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.isEnabled}
                touched={touched.isEnabled}
                value={values.isEnabled}
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
                placeholder="Descripción de la campaña"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                touched={touched.description}
                divClassName="w-5/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
            </div>
            {campaingId == null && (
              <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] p-4">
                <div className="flex items-center justify-start gap-6">
                  <span className="text-lg">Asignación de máquinas</span>
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
            <InputDateRangePicker
              setDates={handleSetDates}
              companyId={values.companyId}
              setShowAlert={setShowAlert}
              campaingData={campaingData}
            />
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalCampaings
