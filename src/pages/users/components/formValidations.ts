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
  password: '',
  passwordConfirmation: '',
}

export const validationRulesUser = (user: any) => {
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
    password: {
      required: Object.keys(user).length === 0,
      minLength: 6,
      errorMessages: {
        required: 'La contraseña es obligatoria',
        minLength: 'La contraseña debe tener al menos 6 caracteres',
      },
    },
    passwordConfirmation: {
      required: user.password,
      confirm: true,
      errorMessages: {
        required: 'Las contraseñas no coinciden',
      },

      validate: (value: any, allValues: any) =>
        value !== allValues?.password
          ? 'Las contraseñas no coinciden'
          : undefined,
    },
  }
}
