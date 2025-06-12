import { useEffect, useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import ModalUsers from './components/ModalUsers'
import { Alert, User } from '../../interfaces/types'
import usePagination from '../../hooks/usePagination'
import { useWebApiUser } from '../../api/webApiUser'
import Filters from '../../components/filters'

const Users = () => {
  const [showAlert, setShowAlert] = useState<Alert | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<User | Record<string, any>>({})

  const { getUsers, deleteUser } = useWebApiUser()

  const { page, totalPages, setPage, refresh, setFilters } =
    usePagination<User>(getUsers, 10, setUsers)

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      refresh()
      setIsOpen(false)
      setShowAlert({
        message: 'El usuario ha sido eliminado correctamente',
        type: 'success',
      })
    } catch (error: any) {
      setShowAlert({
        message: error.message,
        type: 'error',
      })
      console.error('Error deleting user:', error)
    }
  }

  useEffect(() => {
    if (formData.id) {
      setTitleModal('Editar')
    }
  }, [formData])

  return (
    <MainLayout alertProps={showAlert}>
      <Title title="Usuarios" />
      <Filters
        addButton={true}
        filters={[
          { name: 'name', label: 'Nombre' },
          { name: 'email', label: 'Correo' },
          { name: 'position', label: 'Puesto' },
          {
            name: 'role',
            label: 'Rol',
            type: 'select',
            options: [
              { value: 'admin', label: 'Administrador' },
              { value: 'operator', label: 'Operador' },
              { value: 'maintenance', label: 'Mantenimiento' },
              { value: 'recolector', label: 'Recolector' },
            ],
          },
        ]}
        setFilters={setFilters}
        openModal={() => {
          setTitleModal('Crear')
          setIsOpen(true)
          setFormData({})
        }}
      />
      <Table
        tableContent={{
          headers: [
            'Id',
            'Nombre',
            'Teléfono',
            'Correo',
            'Puesto',
            'Rol',
            'Estatus',
          ],
          data: users,
        }}
        columns={[
          'id',
          'name',
          'phone',
          'email',
          'position',
          'role.role',
          { column: 'isActive', type: 'chip' },
        ]}
        openModal={() => {
          setIsOpen(true)
          setFormData({})
        }}
        handleDelete={handleDelete}
        setTitleModal={setTitleModal}
        pagination={{ page, totalpages: totalPages }}
        changePage={setPage}
        page={page}
        setFormData={setFormData}
      />
      {isOpen && (
        <ModalUsers
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
          user={formData}
          setShowAlert={setShowAlert}
        />
      )}
    </MainLayout>
  )
}
export default Users
