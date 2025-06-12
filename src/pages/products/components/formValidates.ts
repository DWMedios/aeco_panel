export const initialValuesProduct = {
  name: '',
  family: '',
  code: '',
  capacityId: '',
}

export const initialValuesCapacity = {
  description: '',
  packaging: '',
  factor: '',
  weight: '',
}

export const validationRulesProduct = {
  name: {
    required: true,
    errorMessages: {
      required: 'El nombre es obligatorio',
    },
  },
  family: {
    required: true,
    errorMessages: {
      required: 'La familia obligatoria',
    },
  },
  code: {
    required: true,
    errorMessages: {
      required: 'El código de barras es obligatorio',
    },
  },
  capacityId: {
    required: true,
    errorMessages: {
      required: 'La capacidad es obligatoria',
    },
  },
}

export const validationRulesCapacity = {
  description: {
    required: true,
    errorMessages: {
      required: 'El nombre es obligatorio',
    },
  },
  factor: {
    required: true,
    errorMessages: {
      required: 'El factor es obligatorio',
    },
  },
  packaging: {
    required: true,
    errorMessages: {
      required: 'El empaque es obligatorio',
    },
  },
  weight: {
    required: true,
    errorMessages: {
      required: 'El peso es obligatorio',
    },
  },
}
