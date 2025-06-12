export const initialValues = {
  name: '',
  description: '',
  note: '',
  establishment: '',
  type: '',
  order: '',
  companyId: '',
  status: '',
}

export const validationRules = {
  name: {
    required: true,
    errorMessages: {
      required: 'El nombre es obligatorio',
    },
  },
  order: {
    required: true,
    errorMessages: {
      required: 'El orden es obligatorio',
    },
  },
  companyId: {
    required: true,
    errorMessages: {
      required: 'La empresa es obligatoria',
    },
  },
}

export const initialValuesService = {
  ...initialValues,
  metadata: {
    host: '',
    apiKey: '',
    user: '',
    password: '',
  },
}

export const initialValuesDiscount = {
  ...initialValues,
  metadata: {
    type: '',
    value: '',
    packagings: '',
  },
}
