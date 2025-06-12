import { MenuItems } from '../../../interfaces/menu'
import SubMenuItem from './SubMenuItem'

interface Props {
  menu: MenuItems
}

const MenuItem = ({ menu }: Props) => {
  return (
    <li className="pb-2 ml-10">
      <a className="flex items-center p-2 text-gray-900 rounded-lg">
        <img className="w-4 h-4" src={menu.icon} alt={''} />
        <span className="ms-3 text-sm ">{menu.title}</span>
      </a>
      {menu.subMenu && (
        <ol className="space-y-2 text-sm list-inside">
          {menu.subMenu.map((item, index) => (
            <SubMenuItem key={index} subMenu={item} />
          ))}
        </ol>
      )}
    </li>
  )
}

export default MenuItem
