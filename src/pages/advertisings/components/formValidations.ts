export const initialValuesContractors = {
  name: '',
  email: '',
  phone: '',
  companyId: '',
  mediaAsset: '',
}

export const initialValuesCampaigns = {
  contractName: '',
  description: '',
  startDate: '',
  endDate: '',
  companyId: '',
  contractorId: '',
  isEnabled: true,
  mediaAsset: '',
}

export const initialValuesAdvertisings = {
  isEnabled: 'true',
  companyId: '',
  contractors: '',
  campaigns: '',
}

export const validationRulesAdvertisings = (advertising: any) => {
  return {
    companyId: {
      required: Object.keys(advertising).length === 0 ? true : false,
      errorMessages: {
        required: 'La empresa es obligatoria',
      },
    },
  }
}

export const validationRulesContractors = (contractor: any) => {
  return {
    name: {
      required: true,
      errorMessages: {
        required: 'El nombre de anunciante es obligatorio',
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
      minLength: 10,
      maxLength: 10,
      pattern: /^\d{10}$/,
      errorMessages: {
        required: 'El teléfono es obligatorio',
        pattern: 'El teléfono debe tener exactamente 10 dígitos numéricos',
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

export const validationRulesCampaigns = (campaign: any) => {
  return {
    contractName: {
      required: true,
      errorMessages: {
        required: 'El nombre de la campaña es obligatorio',
      },
    },
    description: {
      required: true,
      errorMessages: {
        required: 'La descripción de la campaña es obligatoria',
      },
    },
    companyId: {
      required: Object.keys(campaign).length === 0 ? true : false,
      errorMessages: {
        required: 'La empresa es obligatoria',
      },
    },
  }
}
