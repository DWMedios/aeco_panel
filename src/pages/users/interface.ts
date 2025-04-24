import { UserRoleEnum } from '../../enums/userEnums'

export interface IUserForm {
  name: string
  email: string
  phone: string
  position: string
  isActive: boolean
  role: UserRoleEnum
  password: string
  companyId: number
}
