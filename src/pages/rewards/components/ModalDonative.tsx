import { useEffect, useState } from 'react'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'
import useFormWithValidation from '../../../hooks/useForm'
import { useWebApiCompany } from '../../../utils/api/webApiCompany'
import { initialValues, validationRules } from './formValidates'
import { useWebApiAeco } from '../../../utils/api/webApiAeco'
import InputField from '../../../components/inputField'
import SearchableSelect from '../../../components/searchableSelect'
import InputUpload from '../../../components/inputUpload'
import InputSelect from '../../../components/inputSelect'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  reward?: any
  type?: string
}

const ModalDonative = ({ onClose, onSaved, title, reward, type }: Props) => {
  const { withLoading, loading } = useLoading()
  const { getCompanies } = useWebApiCompany()
  const [companies, setCompanies] = useState<any[]>([])
  const { getAecos } = useWebApiAeco()
  const [selectedAeco, setSelectedAeco] = useState<any>([])
  const [aecoOptions, setAecoOptions] = useState<any>([])
  const [rewardData, setRewardData] = useState<any>({})

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
    if (rewardData && Object.keys(rewardData).length > 0) {
      setValues({ ...discountInitialValues, ...rewardData })
      setRewardData(rewardData)
    }
  }, [rewardData, setValues])

  const handleImageUpload = (file: File) => {
    console.log('Imagen subida:', file)
  }

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
      console.log('🚀 ~ onFormSubmit ~ data:', data)
      // const cleanedData: any = cleanEmptyFields({
      //   ...data,
      //   aecos: selectedAeco.map((item: any) => item.value),
      // })

      // if (rewardData && Object.keys(rewardData).length > 0) {
      //   await withLoading(() => updateCompany(rewardData.id, cleanedData))
      // } else {
      //   await withLoading(() => createCompany(cleanedData))
      // }

      onSaved()
      // onClose()
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

  const getValue = (path: string) => {
    const keys = path.split('.')
    return keys.reduce((o, k) => (o || {})[k], values)
  }

  return (
    <Modal onClose={onClose} title={`${title} donativo`}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="mt-8">
            <InputUpload title="Recompensa" onImageUpload={handleImageUpload} />
          </div>

          <div className="flex flex-col gap-4 rounded-xl mt-8 p-4 flex-wrap">
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
              />{' '}
              <InputField
                name="stablishment"
                placeholder="Establecimiento"
                value={values.stablishment}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.stablishment}
                touched={touched.stablishment}
                divClassName="w-2/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="description"
                placeholder="Descripción"
                value={values.rfc}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.rfc}
                touched={touched.rfc}
                divClassName="w-5/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="notes"
                placeholder="Notas adicionales"
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.notes}
                touched={touched.notes}
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
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-[#F8F8F8] mt-8 p-4">
            <div className="flex items-center justify-start gap-6">
              <span className="text-2xl">Asignacion de maquinas</span>
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
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalDonative
