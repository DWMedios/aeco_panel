import { Bell, User } from '@phosphor-icons/react'
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
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
            <button
              onClick={logout}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
