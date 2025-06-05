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

    case 'super_admin':
      return 'Super Administrador'

    default:
      break
  }
}
