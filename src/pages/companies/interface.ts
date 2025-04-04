export interface ICompanyForm {
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
}
