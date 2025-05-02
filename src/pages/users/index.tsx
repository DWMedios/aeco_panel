import { useState } from 'react'
import MainLayout from '../../components/layout'
import Table from '../../components/table'
import Title from '../../components/title'
import ModalUsers from './components/ModalUsers'
import { User } from '../../interfaces/types'
import usePagination from '../../hooks/usePagination'
import { useWebApiUser } from '../../utils/api/webApiUser'
import Filters from '../../components/filters'

const Users = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [titleModal, setTitleModal] = useState<string>('Crear')
  const [users, setUsers] = useState<User[]>([])
  const { getUsers, deleteUser } = useWebApiUser()

  const { page, totalPages, setPage, refresh, setFilters } =
    usePagination<User>(getUsers, 10, setUsers)

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id)
      refresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <MainLayout>
      <Title title="Users" />
      <Filters
        addButton={true}
        filters={[
          { name: 'name', label: 'Nombre' },
          { name: 'email', label: 'Correo' },
          { name: 'status', label: 'Estatus' },
        ]}
        refresh={refresh}
        setFilters={setFilters}
      />
      <Table
        tableContent={{
          headers: ['Folio', 'Nombre', 'Telefono', 'Correo', 'Rol', 'Puesto'],
          data: users,
        }}
        columns={['id', 'name', 'phone', 'email', 'role.name', 'position']}
        openModal={() => setIsOpen(true)}
        setTitleModal={setTitleModal}
        pagination={{ page, totalpages: totalPages }}
        changePage={setPage}
        handleDelete={handleDelete}
      />
      {isOpen && (
        <ModalUsers
          onClose={() => setIsOpen(false)}
          title={titleModal}
          onSaved={refresh}
        />
      )}
    </MainLayout>
  )
}
export default Users
