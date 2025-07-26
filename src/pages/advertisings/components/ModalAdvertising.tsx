import { useEffect, useState } from 'react'
import InputSelect from '../../../components/inputSelect'
import Modal from '../../../components/modals/Form'
import { Advertising, Alert } from '../../../interfaces/types'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { useWebApiAdvertising } from '../../../api/webApiAdvertising'
import { useWebApiCompany } from '../../../api/webApiCompany'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import useFormWithValidation from '../../../hooks/useForm'
import {
  initialValuesAdvertisings,
  validationRulesAdvertisings,
} from './formValidations'
import { useLoading } from '../../../hooks/loading'
import { useWebApiCampaings } from '../../../api/webApiCampaing'
import { useWebApiContractors } from '../../../api/webApiContractor'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  adsId?: number | null
  setShowAlert: (alert: Alert) => void
}

const ModalAdvertising = ({
  onClose,
  title,
  onSaved,
  adsId,
  setShowAlert,
}: Props) => {
  const { withLoading, loading, setLoading } = useLoading()
  const [companies, setCompanies] = useState<any[]>([])
  const [campaings, setCampaings] = useState<any[]>([])
  const [contractors, setContractors] = useState<any[]>([])
  const [advertisingData, setAdvertisingData] = useState<any>({})
  const { createAdvertising, getAdvertising, updateAdvertising } =
    useWebApiAdvertising()

  const { getCompanies } = useWebApiCompany()
  const { getCampaings } = useWebApiCampaings()
  const { getContractors } = useWebApiContractors()
  const mergedValues =
    advertisingData && Object.keys(advertisingData).length > 0
      ? {
          ...structuredClone(initialValuesAdvertisings),
          ...structuredClone(advertisingData),
        }
      : structuredClone(initialValuesAdvertisings)
  const validationRules = validationRulesAdvertisings(advertisingData)
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
    fetchInitialData()
  }, [])

  const changeCompany = async (value: any) => {
    const [campaingsRes, contractorsRes] = await withLoading(() =>
      Promise.all([
        getCampaings(`?companyId=${value.target.value}&isEnabled=true`),
        getContractors(`?companyId=${value.target.value}`),
      ])
    )

    const responseCampaings = campaingsRes.records.map((camp: any) => ({
      value: camp.id,
      label: camp.contractName,
    }))

    const responseContractors = contractorsRes.records.map((camp: any) => ({
      value: camp.id,
      label: camp.name,
    }))

    setCampaings(
      responseCampaings.length > 0
        ? responseCampaings
        : [
            {
              value: '',
              label: 'No hay campañas disponibles para la empresa',
            },
          ]
    )
    setContractors(
      responseContractors.length > 0
        ? responseContractors
        : [
            {
              value: '',
              label: 'No hay anunciantes disponibles para la empresa',
            },
          ]
    )
  }

  const fetchInitialData = async () => {
    const [companiesRes] = await withLoading(() =>
      Promise.all([getCompanies('?perpage=50')])
    )

    const responseCompanies = companiesRes.records.map((company: any) => ({
      value: company.id,
      label: company.name,
    }))

    setCompanies(responseCompanies)
  }

  useEffect(() => {
    if (adsId) getAdvertisingData(adsId)
  }, [adsId])

  useEffect(() => {
    if (advertisingData && Object.keys(advertisingData).length > 0)
      setValues({
        ...structuredClone(initialValuesAdvertisings),
        ...structuredClone(advertisingData),
      })
    else resetForm()
  }, [advertisingData, setValues])

  const getAdvertisingData = async (id: number) => {
    try {
      const response = (await getAdvertising(id)) as Advertising
      changeCompany({ target: { value: response?.company?.id } })

      const { campaigns, contractors, ...data } = response
      setAdvertisingData({
        ...data,
        campaigns: campaigns.map((camp: any) => camp.id),
        contractors: contractors?.map((cont: any) => cont.id),
      })
    } catch (error) {
      console.log('Error al obtener los datos del contratista:', error)
    }
  }

  const handleFormSubmit = async (data: any) => {
    setLoading(true)
    try {
      const cleanedData: any = cleanEmptyFields({
        ...data,
        companyId: Number(data.companyId),
        campaigns: [Number(data.campaigns)],
        contractors: [Number(data.contractors)],
      })

      if (advertisingData && Object.keys(advertisingData).length > 0) {
        await withLoading(() =>
          updateAdvertising(advertisingData.id, cleanedData)
        )
      } else {
        await withLoading(() => createAdvertising(cleanedData))
      }

      onSaved()
      resetForm()
      onClose()
      setShowAlert({
        message: `Publicidad guardada correctamente`,
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
    <Modal onClose={onClose} title={`${title} publicidad`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="flex flex-col gap-4 rounded-xl mt-2 p-4">
            <div className="flex items-center justify-start gap-6">
              <span>Datos de la publicidad</span>
            </div>
            <span>Los siguientes campos conformarán el perfil del usuario</span>
            <div className="flex items-center justify-start gap-4 flex-wrap">
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
              <InputSelect
                name="companyId"
                onChange={(data: any) => {
                  handleChange(data)
                  changeCompany(data)
                }}
                onBlur={handleBlur}
                error={errors.companyId}
                touched={touched.companyId}
                value={values.companyId}
                options={companies}
                placeholder="Anunciante"
                divClassName="w-1/4"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputSelect
                name="campaigns"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.campaigns}
                touched={touched.campaigns}
                value={values.campaigns}
                options={campaings}
                placeholder="Campañas"
                divClassName="w-1/4"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputSelect
                name="contractors"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.contractors}
                touched={touched.contractors}
                value={values.contractors}
                options={contractors}
                placeholder="Anunciantes"
                divClassName="w-1/4"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
            </div>
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalAdvertising
