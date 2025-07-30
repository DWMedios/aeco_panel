import { useEffect, useState } from 'react'
import Modal from '../../../components/modals/Form'
import { Alert, Contractor } from '../../../interfaces/types'
import {
  initialValuesContractors,
  validationRulesContractors,
} from './formValidations'
import { useWebApiContractors } from '../../../api/webApiContractor'
import useFormWithValidation from '../../../hooks/useForm'
import { useInputUpload } from '../../../components/inputUpload'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { MediaAsset } from '../../../interfaces/mediaAsset'
import InputField from '../../../components/inputField'
import InputSelect from '../../../components/inputSelect'
import { useWebApiCompany } from '../../../api/webApiCompany'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  contractorId?: number | null
  mediaKey: string | null
  setMediaKey: (key: string | null) => void
  setShowAlert: (alert: Alert) => void
}

const ModalContractors = ({
  onClose,
  title,
  onSaved,
  contractorId,
  mediaKey,
  setMediaKey,
  setShowAlert,
}: Props) => {
  const { withLoading, loading, setLoading } = useLoading()
  const [companies, setCompanies] = useState<any[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { createContractor, updateContractor, getContractor } =
    useWebApiContractors()
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
  const [contractorData, setContractor] = useState<any>({})
  const { getCompanies } = useWebApiCompany()
  const mergedValues =
    contractorData && Object.keys(contractorData).length > 0
      ? {
          ...structuredClone(initialValuesContractors),
          ...structuredClone(contractorData),
        }
      : structuredClone(initialValuesContractors)
  const validationRules = validationRulesContractors(contractorData)
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

  useEffect(() => {
    if (contractorId) getContractorData(contractorId)
  }, [contractorId])

  useEffect(() => {
    if (contractorData && Object.keys(contractorData).length > 0)
      setValues({
        ...structuredClone(initialValuesContractors),
        ...structuredClone(contractorData),
      })
    else resetForm()
  }, [contractorData, setValues])

  const getContractorData = async (id: number) => {
    try {
      const response = (await getContractor(id)) as Contractor
      setContractor(response)
      setMediaKey(response?.mediaAsset?.fileKey ?? null)
      setPreviewUrl(response?.logoUrl || null)
    } catch (error) {
      console.log('Error al obtener los datos del contratista:', error)
    }
  }

  const handleFormSubmit = async (data: any) => {
    setLoading(true)
    try {
      const cleanedData: any = cleanEmptyFields({
        ...data,
      })

      const mediaAsset = (await uploadMediaAsset()) as MediaAsset | boolean
      if (mediaAsset) cleanedData.mediaAsset = mediaAsset

      if (contractorData && Object.keys(contractorData).length > 0) {
        await withLoading(() =>
          updateContractor(contractorData.id, cleanedData)
        )
      } else {
        if ('companyId' in cleanedData)
          cleanedData.companyId = Number(data.companyId)
        await withLoading(() => createContractor(cleanedData))
      }
      if (mediaKey && mediaAsset) {
        deleteMediaAsset(mediaKey)
        setMediaKey(null)
      }
      onSaved()
      resetForm()
      onClose()
      setShowAlert({
        message: `Contratista guardado correctamente`,
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
    <Modal onClose={onClose} title={`${title} contratista`}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      >
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="mt-2">{InputUpload}</div>
          <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-2 p-4">
            <div className="flex items-center justify-start gap-6">
              <span className="text-2xl">Datos del contratista</span>
            </div>
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <InputField
                name="name"
                placeholder="Nombre del contratista"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                divClassName="w-3/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="email"
                placeholder="Correo electrónico"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                divClassName="w-3/6"
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
                divClassName="w-2/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              {contractorId == null && (
                <InputSelect
                  name="companyId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.companyId}
                  touched={touched.companyId}
                  value={values.companyId}
                  options={companies}
                  placeholder="Empresa"
                  divClassName="w-3/6"
                  className="w-full rounded-full border-2 border-gray-300 p-2"
                />
              )}
            </div>
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalContractors
