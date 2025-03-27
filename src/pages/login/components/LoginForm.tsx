import { EnvelopeSimple, LockKey } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col justify-start items-start w-[70%]">
        <h3 className="text-gray-500 text-sm">¡Empecemos!</h3>
        <h2 className="text-2xl text-gray-900 mb-6" style={{ fontWeight: 800 }}>
          AyuntaEco | Admin
        </h2>
      </div>

      <form className="space-y-10 w-[70%]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <div className="relative mt-1">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe tu correo"
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
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contraseña"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <LockKey size={20} />
            </span>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => navigate('/dashboard')}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
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
