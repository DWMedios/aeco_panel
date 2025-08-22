import { useEffect, useState } from 'react'
import NavbarLogin from './components/Navbar'
import { useNavigate } from 'react-router-dom'
import ForgotPasswordForm from './components/forgotPasswordForm'

function ForgotPassword() {
  const navigation = useNavigate()
  const [send, setSend] = useState<boolean>(false)

  useEffect(() => {
    if (send) {
      console.log('Entra mailer')

      setTimeout(() => {
        navigation('/')
      }, 3000)
    }
  }, [send])

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white p-2">
      {send ? (
        <>
          <h2
            className="text-4xl text-blue-900 mb-16"
            style={{ fontWeight: 800 }}
          >
            Correo enviado
          </h2>
          <img
            src="/images/sent.png"
            alt="Correo enviado"
            className="w-96 mt-[-80px] animate-bounce"
          />
        </>
      ) : (
        <>
          <NavbarLogin title={'Recuperar contraseña'} />
          <div className="flex w-full h-[70%] max-w-7xl border border:bg-gray-100 shadow-lg rounded-lg ">
            <div className="w-1/2 hidden md:flex flex-col items-center justify-center p-8 border-r-2">
              <img
                src="/images/ayuntaeco.png"
                alt="AyuntaEco Logo"
                className="w-32 mb-4"
              />
              <h2 className="text-gray-700 text-lg font-medium">
                Máquina de Reciclaje a la Inversa
              </h2>
              <img
                src="/images/login.png"
                alt="Ilustración"
                className="w-2/4 mt-4"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2 justify-center items-center ">
              <ForgotPasswordForm setSend={setSend} />
            </div>
          </div>
          <div className="flex justify-center w-full mt-8">
            <img src="/images/dw.png" alt="DW Medios" className="h-10" />
          </div>
        </>
      )}
    </div>
  )
}

export default ForgotPassword
