import { useEffect, useState } from 'react'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'
import useFormWithValidation from '../../../hooks/useForm'
import { initialValuesProduct, validationRulesProduct } from './formValidates'
import InputField from '../../../components/inputField'
import InputSelect from '../../../components/inputSelect'
import { useWebApiCapacities } from '../../../utils/api/webApiCapacity'
import { Alert } from '../../../interfaces/types'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  reward?: any
  setShowAlert: (alert: Alert) => void
}

const ModalProducts = ({
  onClose,
  onSaved,
  title,
  reward,
  setShowAlert,
}: Props) => {
  const [capacities, setCapacities] = useState<any[]>([])
  const { withLoading, loading } = useLoading()
  const { getCapacities } = useWebApiCapacities()

  const mergedValues =
    reward && Object.keys(reward).length > 0
      ? { ...initialValuesProduct, ...reward }
      : initialValuesProduct
  const validationRules = validationRulesProduct
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
      setValues({ ...initialValuesProduct, ...reward })
    }
  }, [reward, setValues])

  useEffect(() => {
    const fetchCompanies = async () => {
      const response: any = await withLoading(() => getCapacities(''))
      setCapacities(
        response.records.map((capacity: any) => ({
          value: capacity.id,
          label: `${capacity.packaging} - ${capacity.description}`,
        }))
      )
    }
    fetchCompanies()
  }, [])

  const onFormSubmit = async (data: any) => {
    try {
      onSaved()
      onClose()
      setShowAlert({
        message: 'El producto ha sido guardado correctamente',
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
    <Modal onClose={onClose} title={`${title} producto`}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="flex flex-col gap-4 rounded-xl p-4 flex-wrap">
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
                name="family"
                placeholder="Familia"
                value={values.family}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.family}
                touched={touched.family}
                divClassName="w-2/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="code"
                placeholder="Codigo de barras"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.code}
                touched={touched.code}
                divClassName="w-2/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputSelect
                name="capacityId"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.capacityId}
                touched={touched.capacityId}
                value={values.capacityId}
                options={capacities}
                placeholder="Capacidad"
                divClassName="w-3/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
                defaultPlaceholder="Selecciona una capacidad"
              />
            </div>
          </div>
        </div>
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalProducts
