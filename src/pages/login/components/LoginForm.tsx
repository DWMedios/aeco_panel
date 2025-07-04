import { ILoginForm } from '../interface'
import { useLoading } from '../../../hooks/loading'
import { useAuth } from '../../../hooks/useAuth'
import { useWebApiAuth } from '../../../api/webApiAuth'
import useFormWithValidation from '../../../hooks/useForm'
import InputField from '../../../components/inputField'
import { initialValues, validationRules } from './formValidations'
import { CircleNotch, EnvelopeSimple, LockKey } from '@phosphor-icons/react'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

const LoginForm = () => {
  const [error, setError] = useState<boolean>(false)
  const { withLoading, loading } = useLoading()
  const { login } = useAuth()
  const { login: loginApi } = useWebApiAuth()
  const mergedValues = { ...initialValues }
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormWithValidation(mergedValues, { validationRules })

  useEffect(() => {
    const timer = setTimeout(() => setError(false), 3000)
    return () => clearTimeout(timer)
  }, [error])

  const handleFormSubmit = async (data: Partial<ILoginForm>) => {
    try {
      const response: any = await withLoading(() =>
        loginApi(data as ILoginForm)
      )
      const decoded = jwtDecode(response?.access_token) as any
      if (decoded?.roleType !== 'super_admin') {
        setError(true)
        return
      }
      login(response?.access_token)
    } catch (error) {
      setError(true)
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

        {error ? (
          <div>
            <div className={`p-4 border-l-4 bg-red-200 border-red-500`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-red-400`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10A8 8 0 1110 2a8 8 0 018 8zm-9-3a1 1 0 012 0v3a1 1 0 01-2 0V7zm0 6a1 1 0 102 0 1 1 0 00-2 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className={`text-sm text-red-600`}>
                    Error al iniciar sesión. Por favor, verifica tus
                    credenciales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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
