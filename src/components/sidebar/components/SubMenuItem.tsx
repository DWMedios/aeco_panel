import { useNavigate } from 'react-router-dom'
import { SubMenuItems } from '../../../interfaces/menu'

interface Props {
  subMenu: SubMenuItems
  currentPath: string
}

const SubMenuItem = ({ subMenu, currentPath }: Props) => {
  const navigate = useNavigate()
  const isActive = currentPath === subMenu.route

  return (
    <li
      onClick={(e) => {
        e.preventDefault() // Evita la navegación por defecto de `<a>`
        navigate(subMenu.route)
      }}
    >
      <a
        href="#"
        onClick={() => {
          navigate(subMenu.route)
        }}
        className={`flex items-center px-2 rounded-lg group ${
          isActive
            ? 'bg-orange-300 text-black-700 hover:bg-orange-400 dark:bg-blue-900 dark:text-black-300 dark:hover:bg-blue-800'
            : 'text-gray-900 dark:text-white hover:bg-[#D9D9D9] hover:rounded-full dark:hover:bg-gray-700'
        }`}
      >
        <span className="ms-3">{subMenu.title}</span>
      </a>
    </li>
  )
}

export default SubMenuItem
