export const initialValues = {
  name: '',
  rfc: '',
  state: '',
  city: '',
  postalCode: '',
  address: '',
  phone: '',
  legalRepresentative: {
    name: '',
    position: '',
    phone: '',
    email: '',
  },
  userAdmin: {
    name: '',
    email: '',
    password: '',
  },
  passwordConfirmation: '',
  status: '',
}

export const validationRulesCompany = (companyData: any) => {
  return {
    name: {
      required: true,
      errorMessages: {
        required: 'El nombre de la empresa es obligatorio',
      },
    },
    rfc: {
      required: true,
      validate: (value: any) => {
        if (!value || value.trim() === '') return 'El RFC es obligatorio'
        if (value.length < 12) return 'El RFC debe tener al menos 12 caracteres'
        if (value.length > 13)
          return 'El RFC no puede tener más de 13 caracteres'
        return undefined
      },
    },
    phone: {
      validate: (value: any) => {
        if (!value || value.trim() === '') return undefined // Permitir campos vacíos
        if (!/^\d+$/.test(value))
          return 'El teléfono debe contener solo números'
        if (value.length !== 10)
          return 'El teléfono debe tener exactamente 10 dígitos'
        return undefined
      },
    },
    'userAdmin.name': {
      required: Object.keys(companyData).length === 0,
      errorMessages: {
        required: 'El nombre de usuario es obligatorio',
      },
    },
    'userAdmin.email': {
      required: Object.keys(companyData).length === 0,
      validate: (value: any) => {
        if (Object.keys(companyData).length === 0) {
          if (!value || value.trim() === '')
            return 'El correo electrónico es obligatorio'
        }
        if (value && value.trim() !== '' && !/\S+@\S+\.\S+/.test(value)) {
          return 'Por favor ingresa un correo electrónico válido'
        }
        return undefined
      },
    },
    'userAdmin.password': {
      required: Object.keys(companyData).length === 0,
      validate: (value: any) => {
        if (Object.keys(companyData).length === 0) {
          if (!value || value.trim() === '')
            return 'La contraseña es obligatoria'
          if (value.length < 6)
            return 'La contraseña debe tener al menos 6 caracteres'
        }
        return undefined
      },
    },
    passwordConfirmation: {
      required: Object.keys(companyData).length === 0,
      validate: (value: any, allValues: any) => {
        if (Object.keys(companyData).length === 0) {
          if (!value || value.trim() === '')
            return 'La confirmación de contraseña es obligatoria'
          const password = allValues?.userAdmin?.password || ''
          if (value !== password) return 'Las contraseñas no coinciden'
        }
        return undefined
      },
    },
    'legalRepresentative.email': {
      validate: (value: any) => {
        if (!value || value.trim() === '') return undefined // Permitir campos vacíos
        if (!/\S+@\S+\.\S+/.test(value))
          return 'Por favor ingresa un correo electrónico válido'
        return undefined
      },
    },
    'legalRepresentative.phone': {
      validate: (value: any) => {
        if (!value || value.trim() === '') return undefined // Permitir campos vacíos
        if (!/^\d+$/.test(value))
          return 'El teléfono debe contener solo números'
        if (value.length !== 10)
          return 'El teléfono debe tener exactamente 10 dígitos'
        return undefined
      },
    },
  }
}
