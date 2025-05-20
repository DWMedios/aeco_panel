export const initialValuesProduct = {
  name: '',
  description: '',
  note: '',
  establishment: '',
  type: '',
  order: '',
  companyId: '',
  status: '',
}

export const validationRulesProduct = {
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
  // status: {
  //   required: true,
  //   errorMessages: {
  //     required: 'El estatus es obligatorio',
  //   },
  // },
}

export const validationRulesCapacity = {
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
  // status: {
  //   required: true,
  //   errorMessages: {
  //     required: 'El estatus es obligatorio',
  //   },
  // },
}

export const initialValuesCapacities = {
  metadata: {
    host: '',
    apiKey: '',
    user: '',
    password: '',
  },
}
