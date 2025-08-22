import { useLoading } from '../../../hooks/loading'
import { useWebApiAuth } from '../../../api/webApiAuth'
import useFormWithValidation from '../../../hooks/useForm'
import InputField from '../../../components/inputField'
import { initialValues, validationRules } from './formValidations'
import { CircleNotch, EnvelopeSimple } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

interface Props {
  setSend: (value: boolean) => void
}
const ForgotPasswordForm = ({ setSend }: Props) => {
  const navigation = useNavigate()
  const { withLoading, loading } = useLoading()
  const { forgotPassword } = useWebApiAuth()
  const mergedValues = { ...initialValues }
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormWithValidation(mergedValues, { validationRules })

  const handleFormSubmit = async (data: Partial<any>) => {
    try {
      await withLoading(() => forgotPassword(data as { email: string }))
      setSend(true)
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start w-[70%]">
        <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 800 }}>
          Recuperación de Contraseña
        </h2>
      </div>

      <form
        className="space-y-10 w-[70%]"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label> */}
          <div className="relative mt-1">
            <InputField
              name="email"
              placeholder="Correo electrónico"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <EnvelopeSimple size={20} />
            </span>
          </div>
        </div>

        <button
          type="submit"
          className=" flex justify-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading && (
            <CircleNotch
              className="size-5 mr-3 animate-spin text-gray-500"
              weight="bold"
              color="white"
            />
          )}
          Enviar
        </button>

        <div className="text-right">
          <a
            onClick={() => navigation('/')}
            className="text-blue-600 text-sm hover:underline"
          >
            Iniciar Sesión
          </a>
        </div>
      </form>
    </>
  )
}

export default ForgotPasswordForm
