import { useNavigate } from 'react-router-dom'
import { SubMenuItems } from '../../../interfaces/menu'

interface Props {
  subMenu: SubMenuItems
}

const SubMenuItem = ({ subMenu }: Props) => {
  const navigate = useNavigate()
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
        className="flex items-center px-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#D9D9D9] hover:rounded-full dark:hover:bg-gray-700 group"
      >
        <span className="ms-3">{subMenu.title}</span>
      </a>
    </li>
  )
}

export default SubMenuItem
