import { ILoginForm } from '../interface'
import { useLoading } from '../../../hooks/loading'
import { useAuth } from '../../../hooks/useAuth'
import { useWebApiAuth } from '../../../api/webApiAuth'
import useFormWithValidation from '../../../hooks/useForm'
import InputField from '../../../components/inputField'
import { initialValues, validationRules } from './formValidations'
import { CircleNotch, EnvelopeSimple, LockKey } from '@phosphor-icons/react'

const LoginForm = () => {
  const { withLoading, loading } = useLoading()
  const { login } = useAuth()
  const { login: loginApi } = useWebApiAuth()
  const mergedValues = { ...initialValues }
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormWithValidation(mergedValues, { validationRules })

  const handleFormSubmit = async (data: Partial<ILoginForm>) => {
    try {
      const response: any = await withLoading(() =>
        loginApi(data as ILoginForm)
      )
      console.log('🚀 ~ handleFormSubmit ~ response:', response)
      login(response?.access_token)
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <>
      <div className="flex flex-col justify-start items-start w-[70%]">
        <h3 className="text-gray-500 text-sm">¡Empecemos!</h3>
        <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 800 }}>
          AyuntaEco | Admin
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

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-2">
            Contraseña
          </label>
          <div className="relative mt-1">
            <InputField
              name="password"
              type="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <LockKey size={20} />
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
          Iniciar Sesión
        </button>

        <div className="text-right">
          <a href="#" className="text-blue-600 text-sm hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </>
  )
}

export default LoginForm
