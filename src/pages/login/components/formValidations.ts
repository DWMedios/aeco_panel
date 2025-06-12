export const initialValues = {
  email: '',
  password: '',
}

export const validationRules = {
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
    errorMessages: {
      required: 'El correo electrónico es obligatorio',
      pattern: 'Por favor ingresa un correo electrónico válido',
    },
  },
  password: {
    required: true,
    errorMessages: {
      required: 'La contraseña es obligatoria',
    },
  },
}
