import { MenuItems } from '../../../interfaces/menu'
import SubMenuItem from './SubMenuItem'

interface Props {
  menu: MenuItems
  currentPath: string
}

const MenuItem = ({ menu, currentPath }: Props) => {
  // Verificar si algún submenú está activo
  const isActiveSection = menu.subMenu.some(
    (subItem) => subItem.route === currentPath
  )

  return (
    <li className="pb-2 ml-10">
      <a
        className={`flex items-center p-2 rounded-lg ${
          isActiveSection
            ? 'text-orange-600 dark:text-blue-400'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        <img className="w-4 h-4" src={menu.icon} alt={''} />
        <span className="ms-3 text-sm ">{menu.title}</span>
      </a>
      {menu.subMenu && (
        <ol className="space-y-2 text-sm list-inside">
          {menu.subMenu.map((item, index) => (
            <SubMenuItem key={index} subMenu={item} currentPath={currentPath} />
          ))}
        </ol>
      )}
    </li>
  )
}

export default MenuItem
