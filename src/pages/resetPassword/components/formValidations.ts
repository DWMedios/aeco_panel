export const initialValues = {
  password: '',
  passwordConfirmation: '',
}

export const validationRules = {
  password: {
    required: true,
    minLength: 6,
    errorMessages: {
      required: 'La contraseña es obligatoria',
      minLength: 'La contraseña debe tener al menos 6 caracteres',
    },
  },
  passwordConfirmation: {
    required: true,
    confirm: true,
    errorMessages: {
      required: 'Las contraseñas no coinciden',
    },

    validate: (value: any, allValues: any) => {
      return value !== allValues?.password
        ? 'Las contraseñas no coinciden'
        : undefined
    },
  },
}
