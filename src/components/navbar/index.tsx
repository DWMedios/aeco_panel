import { Bell, Power, User } from '@phosphor-icons/react'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const { logout } = useAuth()

  return (
    <nav className="absolute top-0 right-0 p-10">
      <div className="flex gap-4">
        <div className="flex items-center justify-end bg-slate-200 p-2 rounded-full">
          <Bell size={25} weight="fill" />
        </div>
        <div
          className="flex items-center justify-end bg-orange-200 p-2 rounded-full"
          onClick={() => setOpen(!open)}
        >
          <User size={25} weight="fill" />
        </div>
        {open && (
          <div className="absolute right-0 mt-14 w-44 bg-gray-200 rounded-lg shadow-lg z-10 mr-4">
            <button
              onClick={logout}
              className="flex justify-between w-full px-4 py-2 font-extrabold text-left text-lg text-red-600 hover:bg-red-50"
            >
              <Power size={25} weight="fill" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
