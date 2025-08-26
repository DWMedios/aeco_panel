import { useNavigate, useSearchParams } from 'react-router-dom'
import { useWebApiAuth } from '../../api/webApiAuth'
import { useEffect, useState } from 'react'
import { useLoading } from '../../hooks/loading'
import { SpinnerBall } from '@phosphor-icons/react'

const EmailVerified = () => {
  const navigation = useNavigate()
  const [searchParams] = useSearchParams()
  const { withLoading } = useLoading()
  const { emailVerify } = useWebApiAuth()
  const [verify, setVerify] = useState<boolean>(false)
  let first = true

  useEffect(() => {
    const token = searchParams.get('token')
    if (token && first) {
      first = false
      getEmailVerify(token)
    }
  }, [])

  const getEmailVerify = async (token: string) => {
    try {
      await withLoading(() => emailVerify(token))
      setVerify(true)
      setTimeout(() => {
        navigation('/')
      }, 3000)
    } catch (error) {
      navigation('/notFound')
    }
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white p-2">
      {!verify ? (
        <SpinnerBall />
      ) : (
        <>
          <h2
            className="text-4xl text-blue-900 mb-16"
            style={{ fontWeight: 800 }}
          >
            Correo Verificado
          </h2>
          <img
            src="/images/verified.png"
            alt="Correo verificado"
            className="w-96 mt-[-80px] "
          />
        </>
      )}
    </div>
  )
}

export default EmailVerified
