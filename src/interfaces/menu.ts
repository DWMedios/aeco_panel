export interface MenuItems {
  title: string
  icon: string
  subMenu: SubMenuItems[]
}

export interface SubMenuItems {
  title: string
  route: string
}
