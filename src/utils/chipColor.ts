export const chipColor = (status: string) => {
  switch (String(status)) {
    case 'enabled':
    case 'true':
      return 'bg-green-600'
    case 'disabled':
    case 'false':
      return 'bg-red-600'
    case 'suspended':
      return 'bg-yellow-600'
    case 'deactivated':
      return 'bg-gray-600'
    case 'maintenance':
      return 'bg-blue-600'
    default:
      return ''
  }
}

export const chipText = (text: string) => {
  switch (String(text)) {
    case 'enabled':
    case 'true':
      return 'Activo'
    case 'disabled':
    case 'false':
      return 'Inactivo'
    case 'suspended':
      return 'Suspendido'
    case 'deactivated':
      return 'Desactivado'
    case 'maintenance':
      return 'Mantenimiento'
    default:
      return ''
  }
}
