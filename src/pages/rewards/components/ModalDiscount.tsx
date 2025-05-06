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
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { useWebApiReward } from '../../../utils/api/webApiReward'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  reward?: any
}

const ModalDiscount = ({ onClose, onSaved, title, reward }: Props) => {
  const { withLoading, loading } = useLoading()
  const { getCompanies } = useWebApiCompany()
  const [companies, setCompanies] = useState<any[]>([])
  const { getAecos } = useWebApiAeco()
  const [selectedAeco, setSelectedAeco] = useState<any>([])
  const [aecoOptions, setAecoOptions] = useState<any>([])

  const { createReward, updateReward } = useWebApiReward()

  const mergedValues =
    reward && Object.keys(reward).length > 0
      ? { ...initialValues, ...reward }
      : initialValues
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
    console.log('🚀 ~ useEffect ~ rewardData:', reward)
    if (reward && Object.keys(reward).length > 0) {
      setValues({ ...initialValues, ...reward })
    }
  }, [reward, setValues])

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
      const cleanedData: any = cleanEmptyFields({
        ...data,
        type: 'discount',
        status: data.status === 'true' ? true : false,
        companyId: Number(data.companyId),
        order: Number(data.order),
        aecos: selectedAeco.map((item: any) => item.value),
      })

      if (reward && Object.keys(reward).length > 0) {
        delete cleanedData.companyId
        await withLoading(() => updateReward(reward.id, cleanedData))
      } else {
        cleanedData.companyId = Number(data.companyId)
        await withLoading(() => createReward(cleanedData))
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

  const getValue = (path: string) => {
    const keys = path.split('.')
    return keys.reduce((o, k) => (o || {})[k], values)
  }

  return (
    <Modal onClose={onClose} title={`${title} descuento`}>
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
              />
              <InputField
                name="description"
                placeholder="Descripción"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                touched={touched.description}
                divClassName="w-2/6"
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
              <div className="w-2/6">
                <div className="w-full">
                  <div className="flex rounded-full overflow-hidden shadow-md">
                    <div className="w-2/4 bg-gray-500 flex items-center justify-center">
                      <span className="text-white text-xl p-2">%</span>
                    </div>

                    <div className="w-2/4 rounded-e-full bg-gray-400 flex items-center justify-center">
                      <span className="text-white text-xl pr-4 pl-2">$</span>
                    </div>

                    <div className="flex-1 bg-white flex items-center justify-center">
                      <input
                        name="metadata.value"
                        className="h-full border-none pl-4 focus:outline-none focus:ring-0"
                        type="text"
                        placeholder="Valor"
                      />
                    </div>
                  </div>
                </div>
                {errors['metadata.value'] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors['metadata.value']}
                  </p>
                )}
              </div>
              =
              <InputField
                name="metadata.count"
                placeholder="Embases"
                value={getValue('metadata.count')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.postalCode}
                touched={touched.postalCode}
                divClassName="w-1/6"
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
              <InputField
                name="note"
                placeholder="Notas adicionales"
                value={values.note}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.note}
                touched={touched.note}
                divClassName="w-4/5"
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

export default ModalDiscount
