import { useEffect, useState } from 'react'
import MapView from '../../../components/mapview'
import Modal from '../../../components/modals/Form'
import ActionsButtons from '../../../components/modals/Form/components/actionsButtons'
import { useLoading } from '../../../hooks/loading'
import useFormWithValidation from '../../../hooks/useForm'
import { useWebApiAeco } from '../../../api/webApiAeco'
import InputField from '../../../components/inputField'
import { initialValues, validationRules } from './formValidations'
import { cleanEmptyFields } from '../../../utils/cleanObject'
import { useWebApiCompany } from '../../../api/webApiCompany'
import InputSelect from '../../../components/inputSelect'
import { Alert } from '../../../interfaces/types'

interface Props {
  onClose: () => void
  title?: string
  onSaved: () => void
  aeco: any
  setShowAlert: (alert: Alert) => void
}

const ModalAeco = ({ onClose, title, onSaved, aeco, setShowAlert }: Props) => {
  const aecoStatus = [
    { value: 'enabled', label: 'Activo' },
    { value: 'disabled', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' },
    { value: 'deactivated', label: 'Desactivado' },
    { value: 'maintenance', label: 'Mantenimiento' },
  ]
  const [companies, setCompanies] = useState<any[]>([])
  const [markerCoordinates, setMarkerCoordinates] = useState<{
    lat: number
    lng: number
  }>({ lat: 0, lng: 0 })
  const { withLoading, loading } = useLoading()
  const { createAeco, updateAeco } = useWebApiAeco()
  const { getCompanies } = useWebApiCompany()

  const mergedValues =
    aeco && Object.keys(aeco).length > 0
      ? { ...initialValues, ...aeco }
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
    if (aeco && Object.keys(aeco).length > 0) {
      setValues({ ...initialValues, ...aeco, companyId: aeco.company.id })
    }
  }, [aeco, setValues])

  const handleFormSubmit = async (data: any) => {
    try {
      const { lat, lng } = markerCoordinates

      data = {
        ...data,
        currentCoords: {
          ...(data.currentCoords || {}),
          latitude: String(lat),
          longitude: String(lng),
        },
      }
      if ('companyId' in data) data.companyId = Number(data.companyId)

      const cleanedData: any = cleanEmptyFields(data)

      if (aeco && Object.keys(aeco).length > 0)
        await withLoading(() => updateAeco(aeco.id, cleanedData))
      else await withLoading(() => createAeco(cleanedData))
      onSaved()
      onClose()
      setShowAlert({
        message: `Máquina guardada correctamente`,
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
    <Modal onClose={onClose} title={`${title} máquina`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="p-4 flex-1 max-h-[60vh] overflow-y-auto scrollbar-custom">
          <div className="flex items-center justify-start gap-6">
            <span className="text-2xl">Datos de la máquina</span>
          </div>
          <div className="flex items-center justify-start gap-2 flex-wrap">
            <InputField
              name="name"
              placeholder="Nombre"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              value={values.name}
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
            <InputSelect
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.status}
              touched={touched.status}
              value={values.status}
              options={aecoStatus}
              placeholder="Estatus"
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
            <InputField
              name="serialNumber"
              placeholder="Número de serie"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.serialNumber}
              touched={touched.serialNumber}
              value={values.serialNumber}
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
            <InputSelect
              name="companyId"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.companyId}
              touched={touched.companyId}
              value={values.companyId}
              options={companies}
              placeholder="Empresa"
              divClassName="w-2/5"
              className="w-full rounded-full border-2 border-gray-300 p-2"
            />
          </div>
        </div>
        <div className="flex items-center justify-start gap-2 mt-6">
          <MapView large={30} onCoordinatesChange={setMarkerCoordinates} />
        </div>
        {/* <div>
          <div className="flex flex-col mt-6">
            <span className="text-2xl">Asignar publicidad</span>
          </div>
          <div className="flex items-center justify-start gap-4 flex-wrap">
            <div className="w-2/4">
              <InputSelct placeholder="" key={1} name="" />
            </div>
            <div className="w-1/4">
              <Button action={() => {}} text="Añadir" />
            </div>
          </div>
          <Table
            columns={['id', 'status']}
            tableContent={{
              headers: ['Folio', 'Nombre de p.', 'Repeticiones', 'Estatus'],
              data: [],
            }}
          />
        </div> */}
        <ActionsButtons loading={loading} onClose={onClose} />
      </form>
    </Modal>
  )
}

export default ModalAeco
