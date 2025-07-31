import { useEffect, useState } from 'react'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'
import useFormWithValidation from '../../../hooks/useForm'
import { initialValuesProduct, validationRulesProduct } from './formValidates'
import InputField from '../../../components/inputField'
import InputSelect from '../../../components/inputSelect'
import { useWebApiCapacities } from '../../../api/webApiCapacity'
import { Alert } from '../../../interfaces/types'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { useWebApiProducts } from '../../../api/webApiProduct'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  product?: any
  setShowAlert: (alert: Alert) => void
}

const ModalProducts = ({
  onClose,
  onSaved,
  title,
  product,
  setShowAlert,
}: Props) => {
  const [capacities, setCapacities] = useState<any[]>([])
  const { withLoading, loading } = useLoading()
  const { getCapacities } = useWebApiCapacities()
  const { createProduct, updateProduct } = useWebApiProducts()

  const mergedValues =
    product && Object.keys(product).length > 0
      ? { ...initialValuesProduct, ...product }
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
    if (product && Object.keys(product).length > 0) {
      setValues({ ...initialValuesProduct, ...product })
    }
  }, [product, setValues])

  useEffect(() => {
    const fetchCapacities = async () => {
      const response: any = await withLoading(() =>
        getCapacities('?perpage=50')
      )
      setCapacities(
        response.records.map((capacity: any) => ({
          value: capacity.id,
          label: `${capacity.packaging} - ${capacity.description}`,
        }))
      )
    }
    fetchCapacities()
  }, [])

  const onFormSubmit = async (data: any) => {
    try {
      const cleanedData: any = cleanEmptyFields(data)

      if (product && cleanedData.capacityId !== product.capacityId)
        cleanedData.capacityId = Number(cleanedData.capacityId)
      else cleanedData.capacityId = Number(cleanedData.capacityId)

      if (
        Object.keys(product).length > 0 &&
        Object.keys(cleanedData).length > 0
      )
        await withLoading(() => updateProduct(product.id, cleanedData))
      else await withLoading(() => createProduct(cleanedData))
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
    }
  }

  return (
    <Modal onClose={onClose} title={`${title} producto`}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      >
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
                placeholder="Código de barras"
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
