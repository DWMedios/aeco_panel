export const userRole = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador'

    case 'operator':
      return 'Operador'

    case 'maintenance':
      return 'Mantenimiento'

    case 'recolector':
      return 'Recolector'

    default:
      break
  }
}
