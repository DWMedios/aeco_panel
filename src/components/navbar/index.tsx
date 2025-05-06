import { Bell, User } from '@phosphor-icons/react'
import { useState } from 'react'
import CardProfile from '../cardProfile'

const Navbar = () => {
  const [open, setOpen] = useState(false)

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
          <div className="absolute right-0 mt-14 w-64 bg-gray-200 rounded-lg shadow-lg z-40 mr-4">
            <CardProfile />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
