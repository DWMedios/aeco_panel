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
      minLength: 12,
      maxLength: 13,
      errorMessages: {
        required: 'El RFC es obligatorio',
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
      pattern: /\S+@\S+\.\S+/,
      errorMessages: {
        required: 'El correo electrónico es obligatorio',
        pattern: 'Por favor ingresa un correo electrónico válido',
      },
    },
    'userAdmin.password': {
      required: Object.keys(companyData).length === 0,
      minLength: 6,
      errorMessages: {
        required: 'La contraseña es obligatoria',
        minLength: 'La contraseña debe tener al menos 6 caracteres',
      },
    },
    passwordConfirmation: {
      required: Object.keys(companyData).length === 0,
      validate: (value: any, allValues: any) =>
        value !== allValues.userAdmin?.password
          ? 'Las contraseñas no coinciden'
          : undefined,
    },
    'legalRepresentative.email': {
      pattern: /\S+@\S+\.\S+/,
      errorMessages: {
        pattern: 'Por favor ingresa un correo electrónico válido',
      },
    },
  }
}
