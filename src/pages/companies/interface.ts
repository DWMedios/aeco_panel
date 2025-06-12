export interface ICompanyForm {
  id?: number
  name: string
  rfc: string
  state?: string
  city?: string
  address?: string
  postalCode?: string
  phone?: string
  legalRepresentative: {
    name: string
    email: string
    phone: string
    position: string
  }
  userAdmin: {
    name: string
    email: string
    password: string
  }
  aecos?: number[]
}
