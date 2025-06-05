export const initialValues = {
  name: '',
  status: '',
  serialNumber: '',
  company: {
    id: '',
    name: '',
  },
  currentCoords: {
    latitude: '',
    longitude: '',
  },
}

export const validationRules = {
  name: {
    required: true,
    errorMessages: {
      required: 'El nombre es obligatorio',
    },
  },
  serialNumber: {
    required: true,
    minLength: 6,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9]+$/,
    errorMessages: {
      required: 'El serial es obligatorio',
      minLength: 'El número de serie debe tener al menos 6 caracteres',
      maxLength: 'El número de serie no puede tener más de 20 caracteres',
      pattern:
        'El número de serie no puede tener espacios ni caracteres especiales',
    },
  },
  status: {
    required: true,
    errorMessages: {
      required: 'El estatus es obligatorio',
    },
  },
  companyId: {
    required: true,
    errorMessages: {
      required: 'La empresa es obligatoria',
    },
  },
}
