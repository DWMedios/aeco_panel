export const initialValuesContractors = {
  name: '',
  email: '',
  phone: '',
  companyId: '',
  mediaAsset: '',
}

export const validationRulesContractors = (contractor: any) => {
  return {
    name: {
      required: true,
      errorMessages: {
        required: 'El nombre de contratante es obligatorio',
      },
    },
    email: {
      required: Object.keys(contractor).length === 0,
      pattern: /\S+@\S+\.\S+/,
      errorMessages: {
        required: 'El correo electrónico es obligatorio',
        pattern: 'Por favor ingresa un correo electrónico válido',
      },
    },
    phone: {
      required: true,
      errorMessages: {
        required: 'El teléfono es obligatorio',
      },
    },
    companyId: {
      required: Object.keys(contractor).length === 0 ? true : false,
      errorMessages: {
        required: 'La empresa es obligatoria',
      },
    },
  }
}
