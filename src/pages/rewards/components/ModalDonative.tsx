import { useEffect, useState } from 'react'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'
import useFormWithValidation from '../../../hooks/useForm'
import { useWebApiCompany } from '../../../api/webApiCompany'
import { initialValues, validationRules } from './formValidates'
import { useWebApiAeco } from '../../../api/webApiAeco'
import InputField from '../../../components/inputField'
import SearchableSelect from '../../../components/searchableSelect'
import { useInputUpload } from '../../../components/inputUpload'
import InputSelect from '../../../components/inputSelect'
import { useWebApiReward } from '../../../api/webApiReward'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { Alert, Reward } from '../../../interfaces/types'
import { MediaAsset } from '../../../interfaces/mediaAsset'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  reward?: Reward | Record<string, any>
  mediaKey: string | null
  setMediaKey: (key: string | null) => void
  setShowAlert: (alert: Alert) => void
}

const ModalDonative = ({
  onClose,
  onSaved,
  title,
  reward,
  mediaKey,
  setMediaKey,
  setShowAlert,
}: Props) => {
  const { withLoading, loading } = useLoading()
  const { getCompanies } = useWebApiCompany()
  const [companies, setCompanies] = useState<any[]>([])
  const { getAecos } = useWebApiAeco()
  const [selectedAeco, setSelectedAeco] = useState<any>([])
  const [aecoOptions, setAecoOptions] = useState<any>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { createReward, updateReward } = useWebApiReward()
  const {
    component: InputUpload,
    uploadMediaAsset,
    deleteMediaAsset,
    key,
  } = useInputUpload({
    title: 'Recompensa',
    type: 'image',
    previewUrl,
  })

  const mergedValues = { ...initialValues, ...reward }
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
    if (reward && Object.keys(reward).length > 0) {
      setSelectedAeco(
        reward.aecos.map((item: any) => ({
          label: item.name,
          value: item.id,
          status: item.status,
        }))
      )
      setPreviewUrl(reward.imageUrl ?? null)
      setValues({ ...initialValues, ...reward })
    }
  }, [reward, setValues])

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

  const onFormSubmit = async (data: any) => {
    try {
      const cleanedData: any = cleanEmptyFields({
        ...data,
        type: 'donation',
        status: data.status === 'true' ? true : false,
        companyId: Number(data.companyId),
        order: Number(data.order),
        aecos: selectedAeco.map((item: any) => item.value),
      })
      const mediaAsset = (await uploadMediaAsset()) as MediaAsset | boolean
      if (mediaAsset) cleanedData.mediaAsset = mediaAsset

      if (reward && Object.keys(reward).length > 0) {
        delete cleanedData.companyId
        await withLoading(() => updateReward(reward.id, cleanedData))
      } else {
        cleanedData.companyId = Number(data.companyId)
        await withLoading(() => createReward(cleanedData))
      }
      if (mediaKey && mediaAsset) {
        deleteMediaAsset(mediaKey)
        setMediaKey(null)
      }
      onSaved()
      onClose()
      setShowAlert({
        message: 'Recompensa guardada correctamente',
        type: 'success',
      })
    } catch (error: any) {
      if (key) deleteMediaAsset(key)
      setShowAlert({
        message: error.message,
        type: 'error',
      })
    }
  }

  const filterAecos = async (value: string) => {
    try {
      const response = await getAecos(
        `?name=${value}&withoutCompany=false&companyId=${values.companyId}`
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

  return (
    <Modal onClose={onClose} title={`${title} donativo`}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      >
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="mt-8">{InputUpload}</div>

          <div className="flex flex-col gap-4 rounded-xl mt-4 p-4 flex-wrap">
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <InputField
                name="name"
                placeholder="Nombre"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                divClassName="w-3/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="establishment"
                placeholder="Establecimiento"
                value={values.establishment}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.establishment}
                touched={touched.establishment}
                divClassName="w-2/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="description"
                placeholder="Descripción"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                touched={touched.description}
                divClassName="w-5/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="note"
                placeholder="Notas adicionales"
                value={values.note}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.note}
                touched={touched.note}
                divClassName="w-5/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="order"
                placeholder="Orden"
                value={values.order}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.order}
                touched={touched.order}
                divClassName="w-1/5"
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

          <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-4 p-4">
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
                  handleDelete={(option: any) => {
                    setSelectedAeco(
                      selectedAeco.filter((item) => item.value !== option.value)
                    )
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalDonative
