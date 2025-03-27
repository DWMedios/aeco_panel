import { Bell } from '@phosphor-icons/react'

const Navbar = () => {
  return (
    <nav className="absolute top-0 right-0 p-10">
      <div className="flex items-center justify-end bg-slate-200 p-2 rounded-full">
        <Bell size={25} weight="fill" />
      </div>
    </nav>
  )
}

export default Navbar
