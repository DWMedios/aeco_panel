export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  password?: string
  company?: string
  phone?: string
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
}

export interface Rewards {
  id: number
  name: string
  points: number
  category: string
  company: string
  status: boolean
  description: string
}
