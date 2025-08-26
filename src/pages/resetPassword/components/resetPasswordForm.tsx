import { useLoading } from '../../../hooks/loading'
import { useWebApiAuth } from '../../../api/webApiAuth'
import useFormWithValidation from '../../../hooks/useForm'
import InputField from '../../../components/inputField'
import { initialValues, validationRules } from './formValidations'
import { CircleNotch, LockKey } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetPasswordForm = () => {
  const navigation = useNavigate()
  const [searchParams] = useSearchParams()
  const { withLoading, loading } = useLoading()
  const { resetPassword, tokenVerify } = useWebApiAuth()
  const mergedValues = { ...initialValues }
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormWithValidation(mergedValues, { validationRules })

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      getTokenVerify(token)
    }
  }, [searchParams, navigation])

  const getTokenVerify = async (token: string) => {
    try {
      await withLoading(() => tokenVerify(token))
    } catch (error) {
      navigation('/notFound')
    }
  }

  const handleFormSubmit = async (data: Partial<any>) => {
    try {
      const token = searchParams.get('token')
      if (!token) {
        return
      }
      await withLoading(() => resetPassword({ password: data.password }, token))
      navigation('/')
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
              showPasswordToggle={true}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute inset-y-0 right-12 flex items-center text-gray-400">
              <LockKey size={20} />
            </span>
          </div>
        </div>
        <div>
          <div className="relative mt-1">
            <InputField
              name="passwordConfirmation"
              type="password"
              placeholder="Repetir Contraseña"
              value={values.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              showPasswordToggle={true}
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute inset-y-0 right-12 flex items-center text-gray-400">
              <LockKey size={20} />
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="flex justify-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
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

export default ResetPasswordForm
