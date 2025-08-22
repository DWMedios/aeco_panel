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
}
