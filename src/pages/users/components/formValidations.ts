export const initialValues = {
  name: '',
  position: '',
  phone: '',
  email: '',
  isActive: '',
  companyId: '',
  role: {
    id: '',
    role: '',
  },
}

export const validationRulesUser = () => {
  return {
    name: {
      required: true,
      errorMessages: {
        required: 'El nombre de la empresa es obligatorio',
      },
    },
    position: {
      required: true,
      errorMessages: {
        required: 'El puesto es obligatorio',
      },
    },
    phone: {
      required: true,
      errorMessages: {
        required: 'El teléfono es obligatorio',
      },
    },
    email: {
      required: true,
      pattern: /\S+@\S+\.\S+/,
      errorMessages: {
        required: 'El correo electrónico es obligatorio',
        pattern: 'Por favor ingresa un correo electrónico válido',
      },
    },
  }
}
