import { useEffect } from 'react'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import useFormWithValidation from '../../../hooks/useForm'
import { initialValuesCapacity, validationRulesCapacity } from './formValidates'
import InputField from '../../../components/inputField'
import InputSelect from '../../../components/inputSelect'
import { useLoading } from '../../../hooks/loading'
import { Alert } from '../../../interfaces/types'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { useWebApiCapacities } from '../../../api/webApiCapacity'

interface Props {
  onClose: () => void
  onSaved: () => void
  title?: string
  capacity?: any
  setShowAlert: (alert: Alert) => void
}

const ModalCapacities = ({
  onClose,
  onSaved,
  title,
  capacity,
  setShowAlert,
}: Props) => {
  const { withLoading, loading } = useLoading()

  const { updateCapacity, createCapacity } = useWebApiCapacities()

  const mergedValues = { ...initialValuesCapacity, ...capacity }
  const validationRules = validationRulesCapacity
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
    if (capacity && Object.keys(capacity).length > 0) {
      setValues({ ...initialValuesCapacity, ...capacity })
    }
  }, [capacity, setValues])

  const onFormSubmit = async (data: any) => {
    try {
      const cleanedData: any = cleanEmptyFields(data)

      if (cleanedData.factor) {
        cleanedData.factor = Number(cleanedData.factor)
      }
      if (cleanedData.weight) {
        cleanedData.weight = Number(cleanedData.weight)
      }
      if (capacity && Object.keys(cleanedData).length > 0)
        await withLoading(() => updateCapacity(capacity.id, cleanedData))
      else await withLoading(() => createCapacity(cleanedData))
      onSaved()
      onClose()
      setShowAlert({
        message: 'La capacidad ha sido guardada correctamente',
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
    <Modal onClose={onClose} title={`${title} capacidad`}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="flex flex-col gap-4 rounded-xl p-4 flex-wrap">
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <InputField
                name="description"
                placeholder="Nombre"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                touched={touched.description}
                divClassName="w-3/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputSelect
                name="packaging"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.packaging}
                touched={touched.packaging}
                value={values.packaging}
                options={[
                  {
                    value: 'Botella',
                    label: 'Botella',
                  },
                  {
                    value: 'Lata',
                    label: 'Lata',
                  },
                ]}
                placeholder="Empaque"
                divClassName="w-2/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
                defaultPlaceholder="Selecciona un empaque"
              />
              <InputField
                name="factor"
                placeholder="Factor"
                value={values.factor}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.factor}
                touched={touched.factor}
                divClassName="w-3/6"
                className="w-full rounded-full border-2 border-gray-300 p-2"
              />
              <InputField
                name="weight"
                placeholder="Peso"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.weight}
                touched={touched.weight}
                divClassName="w-2/5"
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

export default ModalCapacities
