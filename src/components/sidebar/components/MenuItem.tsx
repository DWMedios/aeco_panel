import { MenuItems } from '../../../interfaces/menu'
import SubMenuItem from './SubMenuItem'

interface Props {
  menu: MenuItems
}

const MenuItem = ({ menu }: Props) => {
  return (
    <li>
      <a className="flex items-center p-2 text-gray-900 rounded-lg">
        <img src={menu.icon} alt={''} />
        <span className="ms-3 text-2xl">{menu.title}</span>
      </a>
      {menu.subMenu && (
        <ol className="space-y-2 font-medium list-inside">
          {menu.subMenu.map((item, index) => (
            <SubMenuItem key={index} subMenu={item} />
          ))}
        </ol>
      )}
    </li>
  )
}

export default MenuItem
