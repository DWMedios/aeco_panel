import { AecoStatusEnum } from '../enums/aecoEnums'
import { MediaAsset } from './mediaAsset'

export interface ApiResponseBase {
  page: number
  perpage?: number
  total?: number
  totalpages: number
}
export interface ApiResponseList<T> extends ApiResponseBase {
  records: T[]
}

export interface FilterOption {
  name: string
  label: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  position: string
  isActive: boolean
  company: {
    id: number
    name: string
  }
  role: {
    id: number
    role: string
  }
}

export interface Company {
  id: number
  name: string
  address: string
  city: string
  country: string
  email: string
  phone: string
  representative: string
  status: boolean
  machines: number
  rfc: string
  folio: string
  aecos: any[]
  logoUrl?: string
  mediaAsset?: MediaAsset
}

export interface Aeco {
  id: number
  folio: string
  name: string
  status: AecoStatusEnum
  isOnline: boolean
  initialSetup: boolean
  needsUpdate: boolean
  serialNumber: string
  currentCoords?: AecoCoords
  companyId?: number
  company?: Company
}

export interface AecoCoords {
  latitude: string
  longitude: string
}

export interface Reward {
  id?: number
  name: string
  establishment: string
  description: string
  note: string
  image: string
  status: boolean
  type: string
  order: number
  companyId?: number
  imageUrl?: string
  mediaAsset?: MediaAsset
  metadata: Record<string, any>
}

export interface Contractor {
  id?: number
  name: string
  email: string
  phone: string
  companyId?: number
  mediaAsset?: MediaAsset
  logoUrl?: string
}

export interface Advertising {
  id?: number
  isEnabled: boolean
  companyId: number
  contractors?: Contractor[]
  campaigns: Campaign[]
}

export interface Campaign {
  id?: number
  contractName: string
  description: string
  startDate: string
  endDate: string
  isEnabled?: boolean
  contractorId?: number
  companyId?: number
  mediaAsset?: MediaAsset
  aecos: any[]
}

export interface Alert {
  message: string
  type: 'error' | 'success'
  duration?: number
}

export interface ApiResponse {
  statusCode: number
  message: string
  error: string
}
